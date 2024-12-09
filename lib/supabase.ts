import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lrvxcyfidyzbqwbddjhx.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseKey) {
  throw new Error("Supabase key is not defined.");
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseKey);
