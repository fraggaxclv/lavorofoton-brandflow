import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useInternoAuth } from "@/contexts/InternoAuthContext";

export interface SolicitacaoAcesso {
  id: string;
  vendedor_id: string;
  cliente_id: string | null;
  cnpj_solicitado: string;
  razao_social_encontrada: string | null;
  vendedor_atual_id: string | null;
  status: "pendente" | "aprovado" | "rejeitado";
  motivo_rejeicao: string | null;
  aprovado_por: string | null;
  created_at: string;
  updated_at: string;
}

export function useSolicitacoesAcesso() {
  const { user, isAdmin } = useInternoAuth();
  const queryClient = useQueryClient();

  const solicitacoesQuery = useQuery({
    queryKey: ["solicitacoes-acesso", isAdmin ? "all" : user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("solicitacoes_acesso_cliente" as any)
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data || []) as unknown as SolicitacaoAcesso[];
    },
    enabled: !!user,
  });

  const pendentes = (solicitacoesQuery.data || []).filter(s => s.status === "pendente");

  const solicitarAcesso = useMutation({
    mutationFn: async ({ cnpj }: { cnpj: string }) => {
      if (!user) throw new Error("Usuário não autenticado");
      
      // Buscar cliente pelo CNPJ usando função SECURITY DEFINER
      const cnpjLimpo = cnpj.replace(/\D/g, "");
      const { data: clientes, error: clienteError } = await supabase
        .rpc("buscar_cliente_por_cnpj", { p_cnpj: cnpjLimpo });

      if (clienteError) throw clienteError;
      
      const cliente = clientes?.[0];
      if (!cliente) throw new Error("Cliente não encontrado com este CNPJ");

      // Verificar se já tem solicitação pendente para este cliente
      const { data: existente } = await supabase
        .from("solicitacoes_acesso_cliente" as any)
        .select("id")
        .eq("vendedor_id", user.id)
        .eq("cliente_id", cliente.id)
        .eq("status", "pendente")
        .limit(1);

      if (existente && existente.length > 0) {
        throw new Error("Você já tem uma solicitação pendente para este cliente");
      }

      // Verificar se já é responsável
      if (cliente.vendedor_responsavel === user.id) {
        throw new Error("Você já é responsável por este cliente");
      }

      const { error } = await supabase
        .from("solicitacoes_acesso_cliente" as any)
        .insert({
          vendedor_id: user.id,
          cliente_id: cliente.id,
          cnpj_solicitado: cnpjLimpo,
          razao_social_encontrada: cliente.razao_social,
          vendedor_atual_id: cliente.vendedor_responsavel,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["solicitacoes-acesso"] });
    },
  });

  const responderSolicitacao = useMutation({
    mutationFn: async ({ 
      id, 
      aprovado, 
      motivo_rejeicao 
    }: { 
      id: string; 
      aprovado: boolean; 
      motivo_rejeicao?: string;
    }) => {
      if (!user) throw new Error("Usuário não autenticado");

      // Buscar solicitação
      const solicitacao = (solicitacoesQuery.data || []).find(s => s.id === id);
      if (!solicitacao) throw new Error("Solicitação não encontrada");

      // Atualizar status da solicitação
      const { error: updateError } = await supabase
        .from("solicitacoes_acesso_cliente" as any)
        .update({
          status: aprovado ? "aprovado" : "rejeitado",
          aprovado_por: user.id,
          motivo_rejeicao: aprovado ? null : (motivo_rejeicao || "Rejeitado pelo admin"),
        })
        .eq("id", id);

      if (updateError) throw updateError;

      // Se aprovado, atribuir vendedor_responsavel ao cliente
      if (aprovado && solicitacao.cliente_id) {
        const { error: clienteError } = await supabase
          .from("clientes")
          .update({ vendedor_responsavel: solicitacao.vendedor_id })
          .eq("id", solicitacao.cliente_id);
        
        if (clienteError) throw clienteError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["solicitacoes-acesso"] });
      queryClient.invalidateQueries({ queryKey: ["clientes"] });
    },
  });

  return {
    solicitacoes: solicitacoesQuery.data || [],
    pendentes,
    isLoading: solicitacoesQuery.isLoading,
    solicitarAcesso,
    responderSolicitacao,
  };
}
