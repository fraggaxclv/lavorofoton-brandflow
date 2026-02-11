import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useDocumentosNegociacao(negociacaoId: string | undefined) {
  const { data: propostas = [], isLoading: isLoadingPropostas } = useQuery({
    queryKey: ["propostas-negociacao", negociacaoId],
    queryFn: async () => {
      if (!negociacaoId) return [];
      const { data, error } = await supabase
        .from("propostas_comerciais")
        .select("id, numero_proposta, data, nome_cliente, valor_total, created_at")
        .eq("negociacao_id", negociacaoId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!negociacaoId,
  });

  const { data: pedidos = [], isLoading: isLoadingPedidos } = useQuery({
    queryKey: ["pedidos-negociacao", negociacaoId],
    queryFn: async () => {
      if (!negociacaoId) return [];
      const { data, error } = await supabase
        .from("pedidos_faturamento")
        .select("id, numero_pedido, data, nome_cliente, valor_total_produtos, proposta_origem_id, created_at")
        .eq("negociacao_id", negociacaoId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!negociacaoId,
  });

  return {
    propostas,
    pedidos,
    isLoading: isLoadingPropostas || isLoadingPedidos,
  };
}
