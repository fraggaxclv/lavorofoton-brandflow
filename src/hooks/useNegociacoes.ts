import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Negociacao, StatusNegociacao, ProdutoNegociacao, TipoVenda } from "@/types/interno";
import { useToast } from "@/hooks/use-toast";

interface CreateNegociacaoData {
  cliente_id: string;
  origem_lead: string;
  owner_user_id?: string; // Admin can assign to another consultant
  tipo_venda?: TipoVenda;
  produto_principal?: string;
  produtos?: ProdutoNegociacao[];
  valor_estimado?: number;
  status?: StatusNegociacao;
  probabilidade?: number;
  proximo_passo?: string;
  data_proximo_passo?: string;
  observacoes?: string;
}

interface UpdateNegociacaoData extends Partial<CreateNegociacaoData> {
  id: string;
  motivo_perda?: string;
  data_fechamento?: string;
  tipo_venda?: TipoVenda;
  owner_user_id?: string; // Allow reassigning the owner
}

interface UseNegociacoesOptions {
  status?: StatusNegociacao;
  owner_user_id?: string;
  cliente_id?: string;
  search?: string;
  dataInicio?: string;
  dataFim?: string;
}

export function useNegociacoes(options: UseNegociacoesOptions = {}) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["negociacoes", options],
    queryFn: async () => {
      let query = supabase
        .from("negociacoes")
        .select(`
          *,
          cliente:clientes(id, nome_razao, cidade, estado, telefone),
          owner:profiles!negociacoes_owner_user_id_fkey(id, email, full_name, nome_exibicao)
        `)
        .order("ultima_atualizacao", { ascending: false });

      if (options.status) {
        query = query.eq("status", options.status);
      }

      if (options.owner_user_id) {
        query = query.eq("owner_user_id", options.owner_user_id);
      }

      if (options.cliente_id) {
        query = query.eq("cliente_id", options.cliente_id);
      }

      if (options.dataInicio) {
        query = query.gte("created_at", options.dataInicio);
      }

      if (options.dataFim) {
        query = query.lte("created_at", options.dataFim);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Parse produtos JSON e mapear para tipo correto
      return (data || []).map(neg => {
        let produtos: ProdutoNegociacao[] = [];
        try {
          if (typeof neg.produtos === 'string') {
            produtos = JSON.parse(neg.produtos);
          } else if (Array.isArray(neg.produtos)) {
            produtos = neg.produtos as unknown as ProdutoNegociacao[];
          }
        } catch {
          produtos = [];
        }

        return {
          ...neg,
          produtos,
          origem_lead: neg.origem_lead as Negociacao['origem_lead'],
          status: neg.status as StatusNegociacao,
          tipo_venda: (neg.tipo_venda || 'estoque') as TipoVenda,
        } as unknown as Negociacao;
      });
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: CreateNegociacaoData) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      // Gerar número da negociação via RPC
      const { data: numeroNegociacao, error: rpcError } = await supabase
        .rpc('gerar_numero_negociacao');

      if (rpcError) throw rpcError;

      // Use provided owner_user_id or default to current user
      const ownerUserId = data.owner_user_id || user.id;

      const { data: negociacao, error } = await supabase
        .from("negociacoes")
        .insert({
          ...data,
          numero_negociacao: numeroNegociacao,
          owner_user_id: ownerUserId,
          created_by: user.id,
          produtos: JSON.stringify(data.produtos || []),
        })
        .select()
        .single();

      if (error) throw error;
      return negociacao;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["negociacoes"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      toast({
        title: "Negociação criada",
        description: "A negociação foi registrada com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao criar negociação",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...data }: UpdateNegociacaoData) => {
      const updateData: Record<string, unknown> = {
        ...data,
        ultima_atualizacao: new Date().toISOString(),
      };

      if (data.produtos) {
        updateData.produtos = JSON.stringify(data.produtos);
      }

      // Se status mudou para faturado, definir data de fechamento
      if (data.status === 'faturado' && !data.data_fechamento) {
        updateData.data_fechamento = new Date().toISOString().split('T')[0];
      }

      const { data: negociacao, error } = await supabase
        .from("negociacoes")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return negociacao;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["negociacoes"] });
      queryClient.invalidateQueries({ queryKey: ["negociacao"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      toast({
        title: "Negociação atualizada",
        description: "Os dados foram salvos com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao atualizar",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("negociacoes")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["negociacoes"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      toast({
        title: "Negociação excluída",
        description: "A negociação foi removida com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao excluir",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    negociacoes: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
    createNegociacao: createMutation.mutateAsync,
    updateNegociacao: updateMutation.mutateAsync,
    deleteNegociacao: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}

export function useNegociacao(id: string | undefined) {
  return useQuery({
    queryKey: ["negociacao", id],
    queryFn: async () => {
      if (!id) return null;

      const { data, error } = await supabase
        .from("negociacoes")
        .select(`
          *,
          cliente:clientes(id, nome_razao, cidade, estado, telefone, email, cpf_cnpj, tipo, responsavel)
        `)
        .eq("id", id)
        .single();

      if (error) throw error;

      let produtos: ProdutoNegociacao[] = [];
      try {
        if (typeof data.produtos === 'string') {
          produtos = JSON.parse(data.produtos);
        } else if (Array.isArray(data.produtos)) {
          produtos = data.produtos as unknown as ProdutoNegociacao[];
        }
      } catch {
        produtos = [];
      }

      return {
        ...data,
        produtos,
        origem_lead: data.origem_lead as Negociacao['origem_lead'],
        status: data.status as StatusNegociacao,
      } as unknown as Negociacao;
    },
    enabled: !!id,
  });
}
