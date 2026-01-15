import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Vendedor {
  id: string;
  email: string;
  full_name?: string;
  nome_exibicao?: string;
}

export function useVendedores() {
  return useQuery({
    queryKey: ["vendedores"],
    queryFn: async () => {
      // First get all user_ids with 'vendedor' or 'admin' role
      const { data: roles, error: rolesError } = await supabase
        .from("user_roles")
        .select("user_id, role")
        .in("role", ["vendedor", "admin"]);

      if (rolesError) throw rolesError;

      if (!roles || roles.length === 0) {
        return [];
      }

      const userIds = roles.map(r => r.user_id);

      // Get profiles for these users
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, email, full_name, nome_exibicao")
        .in("id", userIds)
        .eq("ativo", true);

      if (profilesError) throw profilesError;

      return (profiles || []) as Vendedor[];
    },
  });
}
