const { supabaseAdmin } = require("../config/supabase");

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
    try {
        const { data, error } = await supabaseAdmin
            .from("profiles")
            .select("*");

        if (error) throw error;

        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// BLOCK USER
exports.blockUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const { error } = await supabaseAdmin
            .from("profiles")
            .update({
                is_blocked: true,
                blocked_at: new Date().toISOString(),
                blocked_by: req.user.id,
            })
            .eq("id", userId);

        if (error) throw error;

        res.json({ success: true, message: "User blocked" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// UNBLOCK USER
exports.unblockUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const { error } = await supabaseAdmin
            .from("profiles")
            .update({
                is_blocked: false,
                blocked_at: null,
                blocked_by: null,
            })
            .eq("id", userId);

        if (error) throw error;

        res.json({ success: true, message: "User unblocked" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// GET ALL SCANS
exports.getAllScans = async (req, res) => {
    try {
        const { data, error } = await supabaseAdmin
            .from("scan_history")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) throw error;

        res.json({ success: true, data });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};