const { supabaseAdmin } = require("../config/supabase");

exports.getHistory = async (req, res) => {
    try {
        const userId = req.user.id;

        const { data, error } = await supabaseAdmin
            .from("scan_history")
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: false });

        if (error) throw error;

        res.json({
            success: true,
            data,
        });
    } catch (err) {
        console.error("HISTORY ERROR:", err);
        res.status(500).json({ error: err.message });
    }
};