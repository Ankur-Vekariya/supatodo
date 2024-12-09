import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lrvxcyfidyzbqwbddjhx.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log(supabaseKey);
// if (!supabaseKey) {
//   throw new Error("Supabase key is not defined.");
// }

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  supabaseUrl,
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxydnhjeWZpZHl6YnF3YmRkamh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1NzU5MjEsImV4cCI6MjA0OTE1MTkyMX0.2GNeT800Yg5nMPN_q7RLzm3YkUe-ekIeFJXF-4claLs"
);
