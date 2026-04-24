// services/dbService.js

const { supabase } = require("../config/supabase");

exports.insert = async (table, data) => {
    const { data: result, error } = await supabase
        .from(table)
        .insert(data)
        .select()
        .single();

    if (error) throw error;
    return result;
};

exports.update = async (table, match, updates) => {
    const { data, error } = await supabase
        .from(table)
        .update(updates)
        .match(match);

    if (error) throw error;
    return data;
};

exports.find = async (table, match) => {
    const { data, error } = await supabase
        .from(table)
        .select("*")
        .match(match);

    if (error) throw error;
    return data;
};