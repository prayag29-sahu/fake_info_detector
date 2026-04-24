const aiService = require("../services/aiService");
const storageService = require("../services/storageService");
const { supabaseAdmin } = require("../config/supabase");

exports.checkVideo = async (req, res) => {
    try {
        const userId = req.user.id;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: "Video file required" });
        }

        // Upload to Firebase
        const videoUrl = await storageService.uploadFile(file, "videos", userId);

        // Call AI engine
        const aiResult = await aiService.checkVideo(file);

        // Save scan history
        const { data: scan } = await supabaseAdmin
            .from("scan_history")
            .insert({
                user_id: userId,
                type: "video",
            })
            .select()
            .single();

        // Save video result
        await supabaseAdmin.from("video_checks").insert({
            user_id: userId,
            scan_id: scan.id,
            video_url: videoUrl,
            label: aiResult.label,
            confidence: aiResult.confidence,
            frames_analyzed: aiResult.frames_analyzed,
        });

        res.json({
            success: true,
            data: aiResult,
            scan_id: scan.id,
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};