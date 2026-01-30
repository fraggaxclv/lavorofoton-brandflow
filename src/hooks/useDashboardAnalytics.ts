import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StatusNegociacao } from "@/types/interno";
import { startOfMonth, subMonths, format, endOfMonth, eachMonthOfInterval, subDays } from "date-fns";

interface AnalyticsKPIs {
  negociacoesAtivas: number;
  valorPipeline: number;
  taxaConversao: number;
  ticketMedio: number;
  variacaoNegociacoes: number;
  variacaoPipeline: number;
  variacaoConversao: number;
  variacaoTicket: number;
}

interface TendenciaMensal {
  mes: string;
  mesLabel: string;
  faturados: number;
  valorFaturado: number;
  novosLeads: number;
}

interface RankingConsultor {
  id: string;
  nome: string;
  email: string;
  faturados: number;
  valorFaturado: number;
  taxaConversao: number;
  pipeline: number;
  meta?: number;
}

interface UseDashboardAnalyticsOptions {
  owner_user_id?: string;
}

export function useDashboardAnalytics(options: UseDashboardAnalyticsOptions = {}) {
  return useQuery({
    queryKey: ["dashboard-analytics", options],
    queryFn: async () => {
      const hoje = new Date();
      const inicioMesAtual = startOfMonth(hoje);
      const fimMesAtual = endOfMonth(hoje);
      const inicioMesAnterior = startOfMonth(subMonths(hoje, 1));
      const fimMesAnterior = endOfMonth(subMonths(hoje, 1));
      const seisAtras = subMonths(hoje, 5);

      // Buscar todas as negociações
      let query = supabase
        .from("negociacoes")
        .select("*");

      if (options.owner_user_id) {
        query = query.eq("owner_user_id", options.owner_user_id);
      }

      const { data: negociacoes, error } = await query;
      if (error) throw error;

      const negs = negociacoes || [];

      // Definir status ativos
      const statusAtivos: StatusNegociacao[] = ['lead_novo', 'proposta_enviada'];

      // KPIs do mês atual
      const ativasMesAtual = negs.filter(n => statusAtivos.includes(n.status as StatusNegociacao));
      const faturadosMesAtual = negs.filter(n => 
        n.status === 'faturado' && 
        n.data_fechamento && 
        n.data_fechamento >= format(inicioMesAtual, 'yyyy-MM-dd') &&
        n.data_fechamento <= format(fimMesAtual, 'yyyy-MM-dd')
      );
      const leadsNovosMesAtual = negs.filter(n => 
        n.created_at >= inicioMesAtual.toISOString()
      );

      // KPIs do mês anterior
      const faturadosMesAnterior = negs.filter(n => 
        n.status === 'faturado' && 
        n.data_fechamento && 
        n.data_fechamento >= format(inicioMesAnterior, 'yyyy-MM-dd') &&
        n.data_fechamento <= format(fimMesAnterior, 'yyyy-MM-dd')
      );
      const leadsNovosMesAnterior = negs.filter(n => {
        const createdAt = new Date(n.created_at);
        return createdAt >= inicioMesAnterior && createdAt <= fimMesAnterior;
      });

      // Calcular métricas
      const valorPipelineAtual = ativasMesAtual.reduce((sum, n) => sum + (Number(n.valor_estimado) || 0), 0);
      const valorFaturadoMesAtual = faturadosMesAtual.reduce((sum, n) => sum + (Number(n.valor_estimado) || 0), 0);
      const valorFaturadoMesAnterior = faturadosMesAnterior.reduce((sum, n) => sum + (Number(n.valor_estimado) || 0), 0);

      // Taxa de conversão
      const taxaConversaoAtual = leadsNovosMesAtual.length > 0 
        ? (faturadosMesAtual.length / leadsNovosMesAtual.length) * 100 
        : 0;
      const taxaConversaoAnterior = leadsNovosMesAnterior.length > 0 
        ? (faturadosMesAnterior.length / leadsNovosMesAnterior.length) * 100 
        : 0;

      // Ticket médio
      const ticketMedioAtual = faturadosMesAtual.length > 0 
        ? valorFaturadoMesAtual / faturadosMesAtual.length 
        : 0;
      const ticketMedioAnterior = faturadosMesAnterior.length > 0 
        ? valorFaturadoMesAnterior / faturadosMesAnterior.length 
        : 0;

      // Calcular variações
      const calcVariacao = (atual: number, anterior: number) => {
        if (anterior === 0) return atual > 0 ? 100 : 0;
        return ((atual - anterior) / anterior) * 100;
      };

      const kpis: AnalyticsKPIs = {
        negociacoesAtivas: ativasMesAtual.length,
        valorPipeline: valorPipelineAtual,
        taxaConversao: taxaConversaoAtual,
        ticketMedio: ticketMedioAtual,
        variacaoNegociacoes: calcVariacao(ativasMesAtual.length, leadsNovosMesAnterior.length),
        variacaoPipeline: calcVariacao(valorPipelineAtual, valorFaturadoMesAnterior),
        variacaoConversao: calcVariacao(taxaConversaoAtual, taxaConversaoAnterior),
        variacaoTicket: calcVariacao(ticketMedioAtual, ticketMedioAnterior),
      };

      // Tendência mensal (últimos 6 meses)
      const meses = eachMonthOfInterval({
        start: startOfMonth(seisAtras),
        end: fimMesAtual,
      });

      const tendencia: TendenciaMensal[] = meses.map(mes => {
        const inicioMes = startOfMonth(mes);
        const fimMes = endOfMonth(mes);
        const mesStr = format(mes, 'yyyy-MM');

        const faturadosDoMes = negs.filter(n => 
          n.status === 'faturado' && 
          n.data_fechamento && 
          n.data_fechamento >= format(inicioMes, 'yyyy-MM-dd') &&
          n.data_fechamento <= format(fimMes, 'yyyy-MM-dd')
        );

        const novosLeadsDoMes = negs.filter(n => {
          const createdAt = new Date(n.created_at);
          return createdAt >= inicioMes && createdAt <= fimMes;
        });

        return {
          mes: mesStr,
          mesLabel: format(mes, 'MMM'),
          faturados: faturadosDoMes.length,
          valorFaturado: faturadosDoMes.reduce((sum, n) => sum + (Number(n.valor_estimado) || 0), 0),
          novosLeads: novosLeadsDoMes.length,
        };
      });

      return { kpis, tendencia, faturadosMesAtual: faturadosMesAtual.length };
    },
    staleTime: 1000 * 60 * 2,
  });
}

export function useRankingConsultores() {
  return useQuery({
    queryKey: ["ranking-consultores-analytics"],
    queryFn: async () => {
      const hoje = new Date();
      const inicioMes = format(startOfMonth(hoje), 'yyyy-MM-dd');
      const fimMes = format(endOfMonth(hoje), 'yyyy-MM-dd');

      // Buscar negociações
      const { data: negociacoes, error } = await supabase
        .from("negociacoes")
        .select("*");

      if (error) throw error;

      // Buscar profiles
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, email, full_name, nome_exibicao, ativo");

      if (profilesError) throw profilesError;

      // Buscar metas
      const { data: metas } = await supabase
        .from("metas_mensais")
        .select("*")
        .eq("mes", hoje.getMonth() + 1)
        .eq("ano", hoje.getFullYear());

      const profilesMap = new Map(profiles?.map(p => [p.id, p]) || []);
      const metasMap = new Map(metas?.map(m => [m.vendedor_id, m.valor_meta]) || []);

      // Agrupar por consultor
      const consultorMap = new Map<string, RankingConsultor>();
      const statusAtivos: StatusNegociacao[] = ['lead_novo', 'proposta_enviada'];

      for (const neg of negociacoes || []) {
        const owner = profilesMap.get(neg.owner_user_id);
        if (!owner || owner.ativo === false) continue;

        const ownerId = owner.id;
        if (!consultorMap.has(ownerId)) {
          consultorMap.set(ownerId, {
            id: ownerId,
            nome: owner.nome_exibicao || owner.full_name || owner.email,
            email: owner.email,
            faturados: 0,
            valorFaturado: 0,
            taxaConversao: 0,
            pipeline: 0,
            meta: metasMap.get(ownerId),
          });
        }

        const consultor = consultorMap.get(ownerId)!;

        if (statusAtivos.includes(neg.status as StatusNegociacao)) {
          consultor.pipeline += Number(neg.valor_estimado) || 0;
        }

        if (neg.status === 'faturado' && neg.data_fechamento && 
            neg.data_fechamento >= inicioMes && neg.data_fechamento <= fimMes) {
          consultor.faturados += 1;
          consultor.valorFaturado += Number(neg.valor_estimado) || 0;
        }
      }

      // Calcular taxa de conversão para cada consultor
      const ranking = Array.from(consultorMap.values());
      
      // Ordenar por valor faturado
      return ranking.sort((a, b) => b.valorFaturado - a.valorFaturado);
    },
    staleTime: 1000 * 60 * 2,
  });
}
