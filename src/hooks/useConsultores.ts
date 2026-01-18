import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Consultor {
  id: string;
  email: string;
  full_name?: string;
  nome_exibicao?: string;
  ativo?: boolean;
}

export interface CreateConsultorData {
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  ativo?: boolean;
}

export function useConsultores() {
  return useQuery({
    queryKey: ["consultores"],
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

      // Get profiles for these users (include inactive ones)
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, email, full_name, nome_exibicao, ativo")
        .in("id", userIds);

      if (profilesError) throw profilesError;

      return (profiles || []) as Consultor[];
    },
  });
}

export function useCreateConsultor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateConsultorData) => {
      const { data: response, error } = await supabase.functions.invoke("criar-consultor", {
        body: data
      });

      if (error) {
        throw new Error(error.message || "Erro ao criar consultor");
      }

      if (response?.error) {
        throw new Error(response.error);
      }

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consultores"] });
      toast.success("Consultor criado com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Erro ao criar consultor");
    }
  });
}

export function useToggleConsultorAtivo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ativo }: { id: string; ativo: boolean }) => {
      const { error } = await supabase
        .from("profiles")
        .update({ ativo })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: (_, { ativo }) => {
      queryClient.invalidateQueries({ queryKey: ["consultores"] });
      toast.success(ativo ? "Consultor ativado!" : "Consultor desativado!");
    },
    onError: () => {
      toast.error("Erro ao atualizar status do consultor");
    }
  });
}
