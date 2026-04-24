const { supabaseAdmin } = require("../config/supabase");

exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const { data, error } = await supabaseAdmin
            .from("profiles")
            .select("*")
            .eq("id", userId)
            .single();

        if (error) throw error;

        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const updates = req.body;

        const { data, error } = await supabaseAdmin
            .from("profiles")
            .update(updates)
            .eq("id", userId)
            .select()
            .single();

        if (error) throw error;

        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};