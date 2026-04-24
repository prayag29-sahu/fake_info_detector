// config/supabase.js

const { createClient } = require("@supabase/supabase-js");

const supabaseAdmin = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

//  THIS IS FOR AUTH
const supabaseAuth = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);
console.log("🔍 SUPABASE DEBUG:");
console.log("URL:", process.env.SUPABASE_URL);
console.log("ANON:", process.env.SUPABASE_ANON_KEY?.slice(0, 10));
console.log("SERVICE:", process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(0, 10));
module.exports = {
    supabaseAdmin,
    supabaseAuth,
};