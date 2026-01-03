import useSupabase from "./useSupabase";

const useAuth = () => {
  const user = useState<any | null>("user", () => null);
  const initialized = useState<boolean>("auth:init", () => false);
  const isGuest = useCookie<boolean>("isGuest", { default: () => false });

  const { supabase } = useSupabase();
  const router = useRouter();

  const initAuth = async () => {
    if (initialized.value) return;

    const { data } = await supabase.auth.getSession();
    user.value = data.session?.user ?? null;
    initialized.value = true;
  };

  supabase.auth.onAuthStateChange((_event, session) => {
    user.value = session?.user ?? null;
  });

  const signUp = async ({ email, password, ...metadata }: any) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
        emailRedirectTo: `${window.location.origin}/?source=email`,
      },
    });
    if (error) throw error;
    return data.user;
  };

  const signIn = async ({ email, password }: any) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data.user;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    user.value = null;
    isGuest.value = false;
    router.push("/auth");
  };

  const setGuest = () => {
    isGuest.value = true;
  };

  const isLoggedIn = () => !!user.value || isGuest.value;

  return {
    user,
    initAuth,
    signUp,
    signIn,
    signOut,
    setGuest,
    isLoggedIn,
  };
};

export default useAuth;
