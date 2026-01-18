import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StatusNegociacao } from "@/types/interno";
import { startOfMonth, subMonths, format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ConsultorProfile {
  id: string;
  email: string;
  full_name?: string;
  nome_exibicao?: string;
  ativo?: boolean;
  created_at: string;
}

interface ConsultorStats {
  totalNegociacoes: number;
  negociacoesAbertas: number;
  faturadosMes: number;
  faturadosTotal: number;
  valorPipeline: number;
  valorFaturadoMes: number;
  valorFaturadoTotal: number;
  clientesAtribuidos: number;
  taxaConversao: number;
  ticketMedio: number;
}

interface NegociacaoHistorico {
  id: string;
  numero_negociacao: string;
  status: string;
  valor_estimado: number;
  created_at: string;
  data_fechamento?: string;
  cliente?: {
    nome_fantasia?: string;
    razao_social: string;
  };
}

interface ClienteAtribuido {
  id: string;
  nome_fantasia?: string;
  razao_social: string;
  cidade?: string;
  estado?: string;
  telefone?: string;
}

interface FaturamentoMensal {
  mes: string;
  mesLabel: string;
  quantidade: number;
  valor: number;
}

export function useConsultorProfile(consultorId: string | undefined) {
  // Profile data
  const profileQuery = useQuery({
    queryKey: ["consultor-profile", consultorId],
    queryFn: async () => {
      if (!consultorId) return null;

      const { data, error } = await supabase
        .from("profiles")
        .select("id, email, full_name, nome_exibicao, ativo, created_at")
        .eq("id", consultorId)
        .maybeSingle();

      if (error) throw error;
      return data as ConsultorProfile | null;
    },
    enabled: !!consultorId,
  });

  // Statistics
  const statsQuery = useQuery({
    queryKey: ["consultor-stats", consultorId],
    queryFn: async () => {
      if (!consultorId) return null;

      const inicioMes = format(startOfMonth(new Date()), "yyyy-MM-dd");

      // Get negotiations
      const { data: negociacoes, error: negError } = await supabase
        .from("negociacoes")
        .select("id, status, valor_estimado, data_fechamento")
        .eq("owner_user_id", consultorId);

      if (negError) throw negError;

      // Get assigned clients
      const { data: clientes, error: clientesError } = await supabase
        .from("clientes")
        .select("id")
        .eq("vendedor_responsavel", consultorId)
        .eq("ativo", true);

      if (clientesError) throw clientesError;

      const negs = negociacoes || [];
      const statusAbertos: StatusNegociacao[] = ["lead_novo", "proposta_enviada"];

      const abertas = negs.filter((n) =>
        statusAbertos.includes(n.status as StatusNegociacao)
      );
      const faturados = negs.filter((n) => n.status === "faturado");
      const faturadosMes = faturados.filter(
        (n) => n.data_fechamento && n.data_fechamento >= inicioMes
      );

      const valorPipeline = abertas.reduce(
        (sum, n) => sum + (Number(n.valor_estimado) || 0),
        0
      );
      const valorFaturadoMes = faturadosMes.reduce(
        (sum, n) => sum + (Number(n.valor_estimado) || 0),
        0
      );
      const valorFaturadoTotal = faturados.reduce(
        (sum, n) => sum + (Number(n.valor_estimado) || 0),
        0
      );

      const taxaConversao =
        negs.length > 0 ? (faturados.length / negs.length) * 100 : 0;
      const ticketMedio =
        faturados.length > 0 ? valorFaturadoTotal / faturados.length : 0;

      const stats: ConsultorStats = {
        totalNegociacoes: negs.length,
        negociacoesAbertas: abertas.length,
        faturadosMes: faturadosMes.length,
        faturadosTotal: faturados.length,
        valorPipeline,
        valorFaturadoMes,
        valorFaturadoTotal,
        clientesAtribuidos: clientes?.length || 0,
        taxaConversao,
        ticketMedio,
      };

      return stats;
    },
    enabled: !!consultorId,
  });

  // Negotiation history
  const historicoQuery = useQuery({
    queryKey: ["consultor-historico", consultorId],
    queryFn: async () => {
      if (!consultorId) return [];

      const { data, error } = await supabase
        .from("negociacoes")
        .select(
          `
          id,
          numero_negociacao,
          status,
          valor_estimado,
          created_at,
          data_fechamento,
          cliente:clientes(nome_fantasia, razao_social)
        `
        )
        .eq("owner_user_id", consultorId)
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) throw error;
      return (data || []) as NegociacaoHistorico[];
    },
    enabled: !!consultorId,
  });

  // Assigned clients
  const clientesQuery = useQuery({
    queryKey: ["consultor-clientes", consultorId],
    queryFn: async () => {
      if (!consultorId) return [];

      const { data, error } = await supabase
        .from("clientes")
        .select("id, nome_fantasia, razao_social, cidade, estado, telefone")
        .eq("vendedor_responsavel", consultorId)
        .eq("ativo", true)
        .order("razao_social");

      if (error) throw error;
      return (data || []) as ClienteAtribuido[];
    },
    enabled: !!consultorId,
  });

  // Monthly revenue chart (last 6 months)
  const faturamentoQuery = useQuery({
    queryKey: ["consultor-faturamento-mensal", consultorId],
    queryFn: async () => {
      if (!consultorId) return [];

      const { data, error } = await supabase
        .from("negociacoes")
        .select("valor_estimado, data_fechamento")
        .eq("owner_user_id", consultorId)
        .eq("status", "faturado")
        .not("data_fechamento", "is", null);

      if (error) throw error;

      // Group by month (last 6 months)
      const meses: FaturamentoMensal[] = [];
      for (let i = 5; i >= 0; i--) {
        const mesDate = subMonths(new Date(), i);
        const mesKey = format(mesDate, "yyyy-MM");
        const mesLabel = format(mesDate, "MMM", { locale: ptBR });

        const negsDoMes = (data || []).filter((n) => {
          if (!n.data_fechamento) return false;
          return n.data_fechamento.startsWith(mesKey);
        });

        meses.push({
          mes: mesKey,
          mesLabel: mesLabel.charAt(0).toUpperCase() + mesLabel.slice(1),
          quantidade: negsDoMes.length,
          valor: negsDoMes.reduce(
            (sum, n) => sum + (Number(n.valor_estimado) || 0),
            0
          ),
        });
      }

      return meses;
    },
    enabled: !!consultorId,
  });

  return {
    profile: profileQuery.data,
    stats: statsQuery.data,
    historico: historicoQuery.data || [],
    clientes: clientesQuery.data || [],
    faturamentoMensal: faturamentoQuery.data || [],
    isLoading:
      profileQuery.isLoading ||
      statsQuery.isLoading ||
      historicoQuery.isLoading ||
      clientesQuery.isLoading ||
      faturamentoQuery.isLoading,
  };
}
