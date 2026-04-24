const { supabaseAuth } = require("../config/supabase");
const bcrypt = require("bcryptjs");

// SIGNUP
exports.signup = async (req, res) => {
    try {
        const { email, password, full_name } = req.body;

        const { data, error } = await supabaseAuth.auth.signUp({
            email,
            password,
            options: {
                data: { full_name },
            },
        });

        if (error) throw error;

        res.json({ success: true, user: data.user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// LOGIN
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const { data, error } = await supabaseAuth.auth.signInWithPassword({
            email,
            password,
        });
        
        if (error) throw error;

        res.json({
            success: true,
            session: data.session,
            user: data.user,
        });
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};

// GET PROFILE
exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const { data, error } = await supabase
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