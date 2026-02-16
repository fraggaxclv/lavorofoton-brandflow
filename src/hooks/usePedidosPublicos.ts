import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface PedidoPublico {
  id: string;
  tipo: 'pedido' | 'proposta';
  cliente_nome: string;
  cliente_cnpj: string;
  cliente_email: string;
  cliente_telefone: string;
  modelo_veiculo: string;
  valor_total: number;
  created_at: string;
  importado: boolean;
}

function extrairModeloProdutos(produtos: unknown): string {
  try {
    const arr = typeof produtos === 'string' ? JSON.parse(produtos) : produtos;
    if (Array.isArray(arr) && arr.length > 0) {
      return arr.map((p: any) => p.modelo || p.nome || p.descricao || 'Veículo').join(', ');
    }
  } catch {}
  return 'Não informado';
}

export function usePedidosPublicos(options?: { status?: 'todos' | 'pendentes' | 'importados'; tipo?: 'todos' | 'pedido' | 'proposta' }) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["pedidos-publicos", options],
    queryFn: async () => {
      const results: PedidoPublico[] = [];

      // Fetch pedidos_faturamento
      if (!options?.tipo || options.tipo === 'todos' || options.tipo === 'pedido') {
        let q = supabase.from("pedidos_faturamento").select("*").order("created_at", { ascending: false });
        if (options?.status === 'pendentes') q = q.eq("importado", false);
        if (options?.status === 'importados') q = q.eq("importado", true);
        const { data } = await q;
        (data || []).forEach((p: any) => {
          results.push({
            id: p.id,
            tipo: 'pedido',
            cliente_nome: p.nome_cliente,
            cliente_cnpj: p.cnpj,
            cliente_email: p.email_responsavel || '',
            cliente_telefone: p.telefone_cliente || '',
            modelo_veiculo: extrairModeloProdutos(p.produtos),
            valor_total: p.valor_total_produtos || 0,
            created_at: p.created_at,
            importado: p.importado ?? false,
          });
        });
      }

      // Fetch propostas_comerciais
      if (!options?.tipo || options.tipo === 'todos' || options.tipo === 'proposta') {
        let q = supabase.from("propostas_comerciais").select("*").order("created_at", { ascending: false });
        if (options?.status === 'pendentes') q = q.eq("importado", false);
        if (options?.status === 'importados') q = q.eq("importado", true);
        const { data } = await q;
        (data || []).forEach((p: any) => {
          results.push({
            id: p.id,
            tipo: 'proposta',
            cliente_nome: p.nome_cliente,
            cliente_cnpj: p.cnpj,
            cliente_email: '',
            cliente_telefone: '',
            modelo_veiculo: extrairModeloProdutos(p.produtos),
            valor_total: p.valor_total || 0,
            created_at: p.created_at,
            importado: p.importado ?? false,
          });
        });
      }

      // Sort by date descending
      results.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      return results;
    },
  });

  const pendentes = (query.data || []).filter(p => !p.importado);

  const importarMutation = useMutation({
    mutationFn: async (pedido: PedidoPublico) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      // 1. Check if client exists by CNPJ
      let clienteId: string;
      const { data: clienteExistente } = await supabase
        .from("clientes")
        .select("id")
        .eq("cpf_cnpj", pedido.cliente_cnpj)
        .maybeSingle();

      if (clienteExistente) {
        clienteId = clienteExistente.id;
      } else {
        // Create new client
        const { data: novoCliente, error: clienteError } = await supabase
          .from("clientes")
          .insert({
            razao_social: pedido.cliente_nome,
            cpf_cnpj: pedido.cliente_cnpj,
            tipo: pedido.cliente_cnpj.length > 14 ? 'PJ' : 'PF',
            email: pedido.cliente_email || undefined,
            telefone: pedido.cliente_telefone || undefined,
            created_by: user.id,
            vendedor_responsavel: user.id,
          })
          .select("id")
          .single();

        if (clienteError) throw clienteError;
        clienteId = novoCliente.id;
      }

      // 2. Generate negotiation number
      const { data: numeroNeg, error: rpcError } = await supabase.rpc('gerar_numero_negociacao');
      if (rpcError) throw rpcError;

      // 3. Create negotiation
      const { data: negociacao, error: negError } = await supabase
        .from("negociacoes")
        .insert({
          numero_negociacao: numeroNeg,
          cliente_id: clienteId,
          owner_user_id: user.id,
          created_by: user.id,
          origem_lead: 'site',
          produto_principal: pedido.modelo_veiculo,
          produtos: JSON.stringify([{ nome: pedido.modelo_veiculo, quantidade: 1 }]),
          valor_estimado: pedido.valor_total,
          status: 'lead_novo',
          observacoes: `Importado de ${pedido.tipo === 'pedido' ? 'Pedido de Faturamento' : 'Proposta Comercial'} do site`,
        })
        .select("id")
        .single();

      if (negError) throw negError;

      // 4. Create activity
      await supabase.from("atividades").insert({
        negociacao_id: negociacao.id,
        tipo: 'outro',
        titulo: 'Importação do Site',
        nota: `Cliente enviou ${pedido.tipo === 'pedido' ? 'pedido de faturamento' : 'proposta comercial'} pelo site em ${new Date(pedido.created_at).toLocaleDateString('pt-BR')}.`,
        created_by: user.id,
      });

      // 5. Mark as imported
      const table = pedido.tipo === 'pedido' ? 'pedidos_faturamento' : 'propostas_comerciais';
      await supabase.from(table).update({ importado: true } as any).eq("id", pedido.id);

      return negociacao;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pedidos-publicos"] });
      queryClient.invalidateQueries({ queryKey: ["negociacoes"] });
      queryClient.invalidateQueries({ queryKey: ["clientes"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("Pedido importado para o pipeline com sucesso!");
    },
    onError: (error) => {
      toast.error(`Erro ao importar: ${error.message}`);
    },
  });

  return {
    pedidos: query.data || [],
    pendentes,
    countPendentes: pendentes.length,
    isLoading: query.isLoading,
    importar: importarMutation.mutateAsync,
    isImporting: importarMutation.isPending,
  };
}
