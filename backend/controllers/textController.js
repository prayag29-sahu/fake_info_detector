
const aiService = require("../services/aiService");
const { supabaseAdmin } = require("../config/supabase");
exports.checkText = async (req, res) => {
    try {
        const { text } = req.body;
        const userId = req.user.id;

        const { data: scan, error } = await supabaseAdmin
            .from("scan_history")
            .insert({
                user_id: userId,
                scan_type: "text",
                input_summary: text.slice(0, 100),
                status: "processing",
            })
            .select()
            .single();

        if (error || !scan) {
            throw new Error("Scan insert failed");
        }

        console.log("SCAN:", scan);

        const aiResult = await aiService.checkText(text);

        if (!aiResult || !aiResult.label) {
            throw new Error("AI failed");
        }

        console.log("AI RESULT:", aiResult);

        await supabaseAdmin
            .from("scan_history")
            .update({
                overall_verdict: aiResult.label,
                confidence: aiResult.confidence,
                status: "completed",
            })
            .eq("id", scan.id);

        return res.json({
            success: true,
            data: aiResult,
            scan_id: scan.id,
        });

    } catch (err) {
        console.error("TEXT ERROR:", err);
        return res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};