const dotenv = require("dotenv");
const supabase = require("@supabase/supabase-js");
const path = require("path");

dotenv.config({
    path: path.join(__dirname, "../../.env")
});

const SUPABASE_URL = process.env._PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env._PUBLIC_SUPABASE_PUBLISHABLE_KEY;


const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const db = {
    Insert: async query => {
        const {data, error} = await client
            .from(query.table)
            .insert(query.data)

        return data || error;
    },
    Select: async query => {
        const {data, error} = await client 
            .from(query.table)
            .select(query.select)
            .eq(query.condition.column, query.condition.value)

        return data || error;
    }
}

 
module.exports = db;
