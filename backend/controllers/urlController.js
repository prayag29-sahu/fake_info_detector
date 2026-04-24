const aiService = require("../services/aiService");
const { supabaseAdmin } = require("../config/supabase");

exports.checkURL = async (req, res) => {
    try {
        const { url } = req.body;
        const userId = req.user.id;

        // 1. Create scan_history
        const { data: scan } = await supabaseAdmin
            .from("scan_history")
            .insert({
                user_id: userId,
                scan_type: "url",
                input_summary: url,
                status: "processing",
            })
            .select()
            .single();

        // 2. Call AI
        const aiResult = await aiService.checkURL(url);

        // 3. Save url_checks
        await supabaseAdmin.from("url_checks").insert({
            scan_history_id: scan.id,
            url_input: url,
            final_label: aiResult.label,
            confidence_score: aiResult.confidence,
            threat_type: aiResult.threat_type || null,
        });

        // 4. Save scan_results
        await supabaseAdmin.from("scan_results").insert({
            scan_history_id: scan.id,
            raw_ai_response: aiResult,
            verdict: aiResult.label,
            confidence: aiResult.confidence,
        });

        // 5. Update scan_history
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
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};