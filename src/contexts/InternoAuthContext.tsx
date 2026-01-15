import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { UserRole } from "@/types/interno";

interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  nome_exibicao?: string;
  ativo?: boolean;
}

interface InternoAuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  userRole: UserRole | null;
  isAdmin: boolean;
  isVendedor: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const InternoAuthContext = createContext<InternoAuthContextType>({
  user: null,
  session: null,
  profile: null,
  userRole: null,
  isAdmin: false,
  isVendedor: false,
  loading: true,
  signIn: async () => ({ error: null }),
  signOut: async () => {},
  refreshProfile: async () => {},
});

export const useInternoAuth = () => {
  const context = useContext(InternoAuthContext);
  if (!context) {
    throw new Error("useInternoAuth deve ser usado dentro de um InternoAuthProvider");
  }
  return context;
};

export const InternoAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUserRole = useCallback(async (userId: string): Promise<UserRole | null> => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .maybeSingle();

      if (error) {
        console.error("Erro ao buscar role:", error);
        return null;
      }

      return data?.role as UserRole || null;
    } catch (error) {
      console.error("Erro ao buscar role:", error);
      return null;
    }
  }, []);

  const fetchProfile = useCallback(async (userId: string): Promise<UserProfile | null> => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, email, full_name, nome_exibicao, ativo")
        .eq("id", userId)
        .maybeSingle();

      if (error) {
        console.error("Erro ao buscar profile:", error);
        return null;
      }

      return data;
    } catch (error) {
      console.error("Erro ao buscar profile:", error);
      return null;
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user) {
      const [newProfile, newRole] = await Promise.all([
        fetchProfile(user.id),
        fetchUserRole(user.id)
      ]);
      setProfile(newProfile);
      setUserRole(newRole);
    }
  }, [user, fetchProfile, fetchUserRole]);

  useEffect(() => {
    // Configurar listener de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        if (currentSession?.user) {
          // Usar setTimeout para evitar deadlock
          setTimeout(async () => {
            const [userProfile, role] = await Promise.all([
              fetchProfile(currentSession.user.id),
              fetchUserRole(currentSession.user.id)
            ]);
            setProfile(userProfile);
            setUserRole(role);
            setLoading(false);
          }, 0);
        } else {
          setProfile(null);
          setUserRole(null);
          setLoading(false);
        }
      }
    );

    // Verificar sessão existente
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      if (currentSession?.user) {
        setTimeout(async () => {
          const [userProfile, role] = await Promise.all([
            fetchProfile(currentSession.user.id),
            fetchUserRole(currentSession.user.id)
          ]);
          setProfile(userProfile);
          setUserRole(role);
          setLoading(false);
        }, 0);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile, fetchUserRole]);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
    setUserRole(null);
    navigate("/interno/login");
  };

  const isAdmin = userRole === 'admin';
  const isVendedor = userRole === 'vendedor';

  return (
    <InternoAuthContext.Provider
      value={{
        user,
        session,
        profile,
        userRole,
        isAdmin,
        isVendedor,
        loading,
        signIn,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </InternoAuthContext.Provider>
  );
};
