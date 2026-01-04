import { getSupabaseClient } from "../../utils/supabase.client";

export const useSupabase = () => {
  const supabase = getSupabaseClient();
  return { supabase };
};
