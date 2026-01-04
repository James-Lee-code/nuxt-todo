import { createClient } from "@supabase/supabase-js";

let supabase: ReturnType<typeof createClient>;

export const getSupabaseClient = () => {
  if (!supabase) {
    const config = useRuntimeConfig();

    supabase = createClient(
      config.public.supabaseUrl,
      config.public.supabaseAnonKey
    );
  }

  return supabase;
};
