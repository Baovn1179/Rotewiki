const dotenv = require("dotenv");
const supabase = require("@supabase/supabase-js");
const path = require("path");

dotenv.config({
    path: path.join(__dirname, "../../.env")
});

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;


const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const db = {
    Insert: async query => {
        const {data, error} = await client
            .from(query.table)
            .insert(query.data)

        return data || error;
    },
    Select: async query => {
        var querycond = client 
            .from(query.table)
            .select(query.select)
            
        if (query.conditions) {
            query.conditions.forEach(condition => {
                querycond = querycond.eq(condition.column, condition.value);
            });
        }

        const {data, error} = await querycond;

        return data || error;
    },
    Update: async query => {
        const {data, error} = await client
            .from(query.table)
            .update(query.data)
            .match(query.match || {});

        return data || error;
    }
}

 
module.exports = db;
