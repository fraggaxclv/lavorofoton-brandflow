import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Atividade, TipoAtividade } from "@/types/interno";
import { useToast } from "@/hooks/use-toast";

interface CreateAtividadeData {
  negociacao_id: string;
  tipo: TipoAtividade;
  titulo?: string;
  nota?: string;
  data_hora?: string;
}

export function useAtividades(negociacao_id: string | undefined) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["atividades", negociacao_id],
    queryFn: async () => {
      if (!negociacao_id) return [];

      const { data, error } = await supabase
        .from("atividades")
        .select("*")
        .eq("negociacao_id", negociacao_id)
        .order("data_hora", { ascending: false });

      if (error) throw error;
      
      return (data || []).map(item => ({
        ...item,
        tipo: item.tipo as TipoAtividade,
      })) as Atividade[];
    },
    enabled: !!negociacao_id,
  });

  const createMutation = useMutation({
    mutationFn: async (data: CreateAtividadeData) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const { data: atividade, error } = await supabase
        .from("atividades")
        .insert({
          ...data,
          data_hora: data.data_hora || new Date().toISOString(),
          created_by: user.id,
        })
        .select()
        .single();

      if (error) throw error;

      // Atualizar ultima_atualizacao da negociação
      await supabase
        .from("negociacoes")
        .update({ ultima_atualizacao: new Date().toISOString() })
        .eq("id", data.negociacao_id);

      return atividade as unknown as Atividade;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["atividades", negociacao_id] });
      queryClient.invalidateQueries({ queryKey: ["negociacao", negociacao_id] });
      queryClient.invalidateQueries({ queryKey: ["negociacoes"] });
      toast({
        title: "Atividade registrada",
        description: "A atividade foi adicionada ao histórico.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao registrar atividade",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("atividades")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["atividades", negociacao_id] });
      toast({
        title: "Atividade removida",
        description: "A atividade foi removida do histórico.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao remover",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    atividades: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
    createAtividade: createMutation.mutateAsync,
    deleteAtividade: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
