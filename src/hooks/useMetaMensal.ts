import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface MetaMensal {
  id: string;
  mes: number;
  ano: number;
  valor_meta: number;
  created_at: string;
  updated_at: string;
}

export function useMetaMensal() {
  const queryClient = useQueryClient();
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const { data: metaAtual, isLoading } = useQuery({
    queryKey: ["meta-mensal", currentMonth, currentYear],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("metas_mensais")
        .select("*")
        .eq("mes", currentMonth)
        .eq("ano", currentYear)
        .maybeSingle();

      if (error) throw error;
      return data as MetaMensal | null;
    },
  });

  const upsertMeta = useMutation({
    mutationFn: async (valorMeta: number) => {
      const { data: existing } = await supabase
        .from("metas_mensais")
        .select("id")
        .eq("mes", currentMonth)
        .eq("ano", currentYear)
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
        });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meta-mensal"] });
    },
  });

  return {
    metaAtual,
    valorMeta: metaAtual?.valor_meta ?? 0,
    isLoading,
    upsertMeta: upsertMeta.mutateAsync,
    isUpdating: upsertMeta.isPending,
  };
}
