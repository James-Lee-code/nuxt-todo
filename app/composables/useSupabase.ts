import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jgqnbpjvpfhbflpkgdzc.supabase.co'

const SUPABASEKEY = process.env.SUPABASEKEY as string

const useSupabase = () => {
  const supabase = createClient(supabaseUrl, SUPABASEKEY);

  return {
    supabase,
  };
};

export default useSupabase;