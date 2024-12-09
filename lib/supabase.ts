import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lrvxcyfidyzbqwbddjhx.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseKey);
