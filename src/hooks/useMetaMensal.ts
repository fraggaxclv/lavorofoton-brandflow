import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface MetaMensal {
  id: string;
  mes: number;
  ano: number;
  valor_meta: number;
  vendedor_id: string | null;
  created_at: string;
  updated_at: string;
}

export function useMetaMensal(vendedorId?: string | null) {
  const queryClient = useQueryClient();
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  // Meta geral do time (vendedor_id = null)
  const { data: metaGeral, isLoading: isLoadingGeral } = useQuery({
    queryKey: ["meta-mensal", "geral", currentMonth, currentYear],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("metas_mensais")
        .select("*")
        .eq("mes", currentMonth)
        .eq("ano", currentYear)
        .is("vendedor_id", null)
        .maybeSingle();

      if (error) throw error;
      return data as MetaMensal | null;
    },
  });

  // Meta individual do vendedor (se vendedorId fornecido)
  const { data: metaIndividual, isLoading: isLoadingIndividual } = useQuery({
    queryKey: ["meta-mensal", "individual", vendedorId, currentMonth, currentYear],
    queryFn: async () => {
      if (!vendedorId) return null;
      
      const { data, error } = await supabase
        .from("metas_mensais")
        .select("*")
        .eq("mes", currentMonth)
        .eq("ano", currentYear)
        .eq("vendedor_id", vendedorId)
        .maybeSingle();

      if (error) throw error;
      return data as MetaMensal | null;
    },
    enabled: !!vendedorId,
  });

  // Todas as metas individuais do mês (para admin)
  const { data: todasMetasIndividuais, isLoading: isLoadingTodas } = useQuery({
    queryKey: ["metas-mensais", "todas", currentMonth, currentYear],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("metas_mensais")
        .select("*")
        .eq("mes", currentMonth)
        .eq("ano", currentYear)
        .not("vendedor_id", "is", null);

      if (error) throw error;
      return (data || []) as MetaMensal[];
    },
  });

  // Upsert meta geral
  const upsertMetaGeral = useMutation({
    mutationFn: async (valorMeta: number) => {
      const { data: existing } = await supabase
        .from("metas_mensais")
        .select("id")
        .eq("mes", currentMonth)
        .eq("ano", currentYear)
        .is("vendedor_id", null)
        .maybeSingle();

      if (existing) {
        const { error } = await supabase
          .from("metas_mensais")
          .update({ valor_meta: valorMeta })
          .eq("id", existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("metas_mensais").insert({
          mes: currentMonth,
          ano: currentYear,
          valor_meta: valorMeta,
          vendedor_id: null,
        });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meta-mensal"] });
      queryClient.invalidateQueries({ queryKey: ["metas-mensais"] });
    },
  });

  // Upsert meta individual
  const upsertMetaIndividual = useMutation({
    mutationFn: async ({ vendedorId, valorMeta }: { vendedorId: string; valorMeta: number }) => {
      const { data: existing } = await supabase
        .from("metas_mensais")
        .select("id")
        .eq("mes", currentMonth)
        .eq("ano", currentYear)
        .eq("vendedor_id", vendedorId)
        .maybeSingle();

      if (existing) {
        const { error } = await supabase
          .from("metas_mensais")
          .update({ valor_meta: valorMeta })
          .eq("id", existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("metas_mensais").insert({
          mes: currentMonth,
          ano: currentYear,
          valor_meta: valorMeta,
          vendedor_id: vendedorId,
        });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meta-mensal"] });
      queryClient.invalidateQueries({ queryKey: ["metas-mensais"] });
    },
  });

  return {
    // Meta geral
    metaGeral,
    valorMetaGeral: metaGeral?.valor_meta ?? 0,
    isLoadingGeral,
    upsertMetaGeral: upsertMetaGeral.mutateAsync,
    isUpdatingGeral: upsertMetaGeral.isPending,
    
    // Meta individual
    metaIndividual,
    valorMetaIndividual: metaIndividual?.valor_meta ?? 0,
    isLoadingIndividual,
    upsertMetaIndividual: upsertMetaIndividual.mutateAsync,
    isUpdatingIndividual: upsertMetaIndividual.isPending,
    
    // Todas metas individuais
    todasMetasIndividuais,
    isLoadingTodas,
    
    // Atalhos para compatibilidade
    valorMeta: metaGeral?.valor_meta ?? 0,
    isLoading: isLoadingGeral,
    upsertMeta: upsertMetaGeral.mutateAsync,
    isUpdating: upsertMetaGeral.isPending,
  };
}

// Helper para obter meta de um vendedor específico
export function getMetaVendedor(metas: MetaMensal[], vendedorId: string): number {
  const meta = metas.find(m => m.vendedor_id === vendedorId);
  return meta?.valor_meta ?? 0;
}
