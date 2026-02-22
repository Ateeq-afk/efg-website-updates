import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Public client for reading data on the frontend
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Check if we're on the server
const isServer = typeof window === "undefined";

// Admin client for the admin panel (server-side only)
export function getSupabaseAdmin() {
  if (!isServer) {
    throw new Error("supabaseAdmin can only be used on the server");
  }

  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
