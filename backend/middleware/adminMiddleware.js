// middleware/adminMiddleware.js

const { supabase } = require("../config/supabase");

exports.adminMiddleware = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const { data, error } = await supabase
            .from("user_roles")
            .select("roles(name)")
            .eq("user_id", userId)
            .single();

        if (error || !data || data.roles.name !== "admin") {
            return res.status(403).json({ error: "Access denied (Admin only)" });
        }

        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};