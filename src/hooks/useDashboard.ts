import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DashboardMetrics, RankingVendedor, StatusNegociacao } from "@/types/interno";
import { startOfMonth, subDays, format } from "date-fns";

interface UseDashboardOptions {
  owner_user_id?: string; // Para filtrar por vendedor
}

interface NegociacaoRaw {
  id: string;
  numero_negociacao: string;
  cliente_id: string;
  owner_user_id: string;
  origem_lead: string;
  produto_principal: string | null;
  produtos: unknown;
  valor_estimado: number;
  status: string;
  probabilidade: number;
  proximo_passo: string | null;
  data_proximo_passo: string | null;
  motivo_perda: string | null;
  data_fechamento: string | null;
  observacoes: string | null;
  ultima_atualizacao: string;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  cliente?: {
    nome_razao: string;
    cidade: string | null;
  };
}

export function useDashboard(options: UseDashboardOptions = {}) {
  return useQuery({
    queryKey: ["dashboard", options],
    queryFn: async () => {
      const inicioMes = format(startOfMonth(new Date()), 'yyyy-MM-dd');
      const hoje = format(new Date(), 'yyyy-MM-dd');
      const seteDiasAtras = format(subDays(new Date(), 7), 'yyyy-MM-dd');

      // Buscar todas as negociações (com filtro por owner se necessário)
      let query = supabase
        .from("negociacoes")
        .select(`
          *,
          cliente:clientes(nome_razao, cidade)
        `);

      if (options.owner_user_id) {
        query = query.eq("owner_user_id", options.owner_user_id);
      }

      const { data: negociacoes, error } = await query;

      if (error) throw error;

      const negs = (negociacoes || []) as NegociacaoRaw[];

      // Calcular métricas
      const statusAbertos: StatusNegociacao[] = ['lead_novo', 'proposta_enviada'];
      const abertas = negs.filter(n => statusAbertos.includes(n.status as StatusNegociacao));
      const propostasEnviadas = negs.filter(n => n.status === 'proposta_enviada');
      
      // Faturados no mês
      const faturadosMes = negs.filter(n => 
        n.status === 'faturado' && 
        n.data_fechamento && 
        n.data_fechamento >= inicioMes
      );

      // Valor do pipeline (negociações abertas)
      const valorPipeline = abertas.reduce((sum, n) => sum + (Number(n.valor_estimado) || 0), 0);
      
      // Valor faturado no mês
      const valorFaturadoMes = faturadosMes.reduce((sum, n) => sum + (Number(n.valor_estimado) || 0), 0);

      // Negociações sem atualização há 7+ dias
      const semAtualizacao = abertas.filter(n => {
        const ultimaAtt = n.ultima_atualizacao?.split('T')[0];
        return ultimaAtt && ultimaAtt < seteDiasAtras;
      });

      // Próximos passos vencidos
      const passosVencidos = abertas.filter(n => {
        return n.data_proximo_passo && n.data_proximo_passo < hoje;
      });

      const metrics: DashboardMetrics = {
        totalNegociacoes: negs.length,
        negociacoesAbertas: abertas.length,
        propostasEnviadas: propostasEnviadas.length,
        creditoAnalise: 0,
        aprovados: 0,
        faturadosMes: faturadosMes.length,
        valorPipeline,
        valorFaturadoMes,
        negociacoesSemAtualizacao: semAtualizacao.length,
        proximosPassosVencidos: passosVencidos.length,
      };

      return {
        metrics,
        negociacoesSemAtualizacao: semAtualizacao,
        negociacoesPassosVencidos: passosVencidos,
        todasNegociacoes: negs,
      };
    },
  });
}

interface NegociacaoWithOwner extends NegociacaoRaw {
  owner?: {
    id: string;
    email: string;
    full_name: string | null;
    nome_exibicao: string | null;
  };
}

export function useRankingVendedores() {
  return useQuery({
    queryKey: ["ranking-vendedores"],
    queryFn: async () => {
      const inicioMes = format(startOfMonth(new Date()), 'yyyy-MM-dd');

      // Buscar negociações
      const { data: negociacoes, error } = await supabase
        .from("negociacoes")
        .select("*");

      if (error) throw error;

      // Buscar profiles separadamente
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, email, full_name, nome_exibicao");

      if (profilesError) throw profilesError;

      const profilesMap = new Map(profiles?.map(p => [p.id, p]) || []);

      // Agrupar por vendedor
      const vendedorMap = new Map<string, RankingVendedor>();
      const statusAbertos: StatusNegociacao[] = ['lead_novo', 'proposta_enviada'];

      for (const neg of negociacoes || []) {
        const owner = profilesMap.get(neg.owner_user_id);
        if (!owner) continue;

        const ownerId = owner.id;
        if (!vendedorMap.has(ownerId)) {
          vendedorMap.set(ownerId, {
            id: ownerId,
            nome: owner.nome_exibicao || owner.full_name || owner.email,
            email: owner.email,
            totalPipeline: 0,
            totalFaturado: 0,
            negociacoesAbertas: 0,
          });
        }

        const vendedor = vendedorMap.get(ownerId)!;

        if (statusAbertos.includes(neg.status as StatusNegociacao)) {
          vendedor.totalPipeline += Number(neg.valor_estimado) || 0;
          vendedor.negociacoesAbertas += 1;
        }

        if (neg.status === 'faturado' && neg.data_fechamento && neg.data_fechamento >= inicioMes) {
          vendedor.totalFaturado += Number(neg.valor_estimado) || 0;
        }
      }

      // Converter para array e ordenar por pipeline
      return Array.from(vendedorMap.values())
        .sort((a, b) => b.totalPipeline - a.totalPipeline);
    },
  });
}

export function useVendedores() {
  return useQuery({
    queryKey: ["vendedores"],
    queryFn: async () => {
      // Buscar usuários que têm role de admin ou vendedor
      const { data: roles, error: rolesError } = await supabase
        .from("user_roles")
        .select("user_id, role")
        .in("role", ["admin", "vendedor"]);

      if (rolesError) throw rolesError;

      if (!roles || roles.length === 0) return [];

      const userIds = roles.map(r => r.user_id);

      // Buscar profiles
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, email, full_name, nome_exibicao, ativo")
        .in("id", userIds)
        .eq("ativo", true);

      if (profilesError) throw profilesError;

      return (profiles || []).map(p => ({
        id: p.id,
        nome: p.nome_exibicao || p.full_name || p.email,
        email: p.email,
      }));
    },
  });
}
