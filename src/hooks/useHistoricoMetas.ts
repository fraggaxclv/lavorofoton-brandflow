import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, subMonths, startOfMonth, endOfMonth } from "date-fns";
import { ptBR } from "date-fns/locale";

interface MesHistorico {
  mes: number;
  ano: number;
  label: string;
  faturados: number;
  meta: number;
  atingiu: boolean | null;
}

export function useHistoricoMetas(vendedorId?: string | null) {
  return useQuery({
    queryKey: ["historico-metas", vendedorId],
    queryFn: async () => {
      if (!vendedorId) return [];

      const hoje = new Date();
      const meses: MesHistorico[] = [];

      // Últimos 3 meses (não inclui o mês atual)
      for (let i = 1; i <= 3; i++) {
        const data = subMonths(hoje, i);
        const mes = data.getMonth() + 1;
        const ano = data.getFullYear();
        const inicioMes = format(startOfMonth(data), "yyyy-MM-dd");
        const fimMes = format(endOfMonth(data), "yyyy-MM-dd");
        const label = format(data, "MMM/yy", { locale: ptBR });

        meses.push({ mes, ano, label, faturados: 0, meta: 0, atingiu: null });
      }

      // Buscar negociações faturadas dos últimos 3 meses
      const tresMesesAtras = subMonths(hoje, 3);
      const { data: negociacoes } = await supabase
        .from("negociacoes")
        .select("data_fechamento, status")
        .eq("owner_user_id", vendedorId)
        .eq("status", "faturado")
        .gte("data_fechamento", format(startOfMonth(tresMesesAtras), "yyyy-MM-dd"))
        .lt("data_fechamento", format(startOfMonth(hoje), "yyyy-MM-dd"));

      // Contar faturados por mês
      for (const neg of negociacoes || []) {
        if (!neg.data_fechamento) continue;
        const d = new Date(neg.data_fechamento);
        const mesNeg = d.getMonth() + 1;
        const anoNeg = d.getFullYear();
        const item = meses.find((m) => m.mes === mesNeg && m.ano === anoNeg);
        if (item) item.faturados++;
      }

      // Buscar metas dos últimos 3 meses
      const mesAnoParams = meses.map((m) => ({ mes: m.mes, ano: m.ano }));
      
      const { data: metasData } = await supabase
        .from("metas_mensais")
        .select("mes, ano, valor_meta")
        .eq("vendedor_id", vendedorId);

      for (const meta of metasData || []) {
        const item = meses.find((m) => m.mes === meta.mes && m.ano === meta.ano);
        if (item) {
          item.meta = meta.valor_meta;
          item.atingiu = item.faturados >= meta.valor_meta;
        }
      }

      // Reverter para ordem cronológica (mais antigo primeiro)
      return meses.reverse();
    },
    enabled: !!vendedorId,
    staleTime: 1000 * 60 * 5,
  });
}
