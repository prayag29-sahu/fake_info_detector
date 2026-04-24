const aiService = require("../services/aiService");
const storageService = require("../services/storageService");
const { supabaseAdmin } = require("../config/supabase");

exports.checkDocument = async (req, res) => {
    try {
        const file = req.file;
        const userId = req.user.id;

        if (!file) return res.status(400).json({ error: "No file uploaded" });

        // 1. scan_history
        const { data: scan } = await supabaseAdmin
            .from("scan_history")
            .insert({
                user_id: userId,
                scan_type: "document",
                status: "processing",
            })
            .select()
            .single();

        // 2. upload to firebase
        const upload = await storageService.uploadFile(
            file,
            userId,
            scan.id,
            "documents"
        );

        // 3. media_files
        const { data: media } = await supabaseAdmin
            .from("media_files")
            .insert({
                scan_history_id: scan.id,
                uploaded_by: userId,
                media_type: "document",
                original_filename: file.originalname,
                storage_path: upload.path,
                storage_url: upload.url,
            })
            .select()
            .single();

        // 4. AI call
        const aiResult = await aiService.checkDocument(file.buffer);

        // 5. document_checks
        await supabaseAdmin.from("document_checks").insert({
            scan_history_id: scan.id,
            media_file_id: media.id,
            final_label: aiResult.label,
            confidence_score: aiResult.confidence,
            extractions: aiResult.extractions || {},
        });

        // 6. scan_results
        await supabaseAdmin.from("scan_results").insert({
            scan_history_id: scan.id,
            raw_ai_response: aiResult,
            verdict: aiResult.label,
            confidence: aiResult.confidence,
        });

        // 7. update history
        await supabaseAdmin
            .from("scan_history")
            .update({
                overall_verdict: aiResult.label,
                confidence: aiResult.confidence,
                status: "completed",
            })
            .eq("id", scan.id);

        res.json({
            success: true,
            data: aiResult,
            file_url: upload.url,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};