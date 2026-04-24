const aiService = require("../services/aiService");
const storageService = require("../services/storageService");
const { supabaseAdmin } = require("../config/supabase");

exports.checkImage = async (req, res) => {
    try {
        const file = req.file;
        const userId = req.user.id;

        if (!file) return res.status(400).json({ error: "No file uploaded" });

        // 1. Create scan_history
        const { data: scan } = await supabaseAdmin  
            .from("scan_history")
            .insert({
                user_id: userId,
                scan_type: "image",
                status: "processing",
            })
            .select()
            .single();

        // 2. Upload to Firebase
        const upload = await storageService.uploadFile(
            file,
            userId,
            scan.id,
            "images"
        );
        console.log("Uploading to Firebase...");
        // 3. Save media_files
        const { data: media } = await supabaseAdmin
            .from("media_files")
            .insert({
                scan_history_id: scan.id,
                uploaded_by: userId,
                media_type: "image",
                original_filename: file.originalname,
                storage_path: upload.path,
                storage_url: upload.url,
            })
            .select()
            .single();

        // 4. Call AI
        const aiResult = await aiService.checkImage(file.buffer);

        // 5. Save results
        await supabaseAdmin.from("scan_results").insert({
            scan_history_id: scan.id,
            raw_ai_response: aiResult,
            verdict: aiResult.label,
            confidence: aiResult.confidence,
        });

        // 6. Update scan_history
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
        console.error("IMAGE ERROR:", err);
        res.status(500).json({ error: err.message });
    }
};