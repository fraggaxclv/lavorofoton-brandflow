import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Cliente, TipoCliente } from "@/types/interno";
import { useToast } from "@/hooks/use-toast";

interface CreateClienteData {
  tipo: TipoCliente;
  nome_razao: string;
  cpf_cnpj?: string;
  cidade?: string;
  estado?: string;
  telefone?: string;
  email?: string;
  responsavel?: string;
  observacoes?: string;
  vendedor_responsavel?: string;
}

interface UpdateClienteData extends Partial<CreateClienteData> {
  id: string;
  ativo?: boolean;
}

interface UseClientesOptions {
  search?: string;
  estado?: string;
  ativo?: boolean;
}

export function useClientes(options: UseClientesOptions = {}) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["clientes", options],
    queryFn: async () => {
      let query = supabase
        .from("clientes")
        .select("*")
        .order("nome_razao", { ascending: true });

      if (options.search) {
        query = query.or(`nome_razao.ilike.%${options.search}%,cpf_cnpj.ilike.%${options.search}%,cidade.ilike.%${options.search}%`);
      }

      if (options.estado) {
        query = query.eq("estado", options.estado);
      }

      if (options.ativo !== undefined) {
        query = query.eq("ativo", options.ativo);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Cliente[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: CreateClienteData) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const { data: cliente, error } = await supabase
        .from("clientes")
        .insert({
          ...data,
          created_by: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return cliente as Cliente;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientes"] });
      toast({
        title: "Cliente cadastrado",
        description: "O cliente foi cadastrado com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao cadastrar cliente",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...data }: UpdateClienteData) => {
      const { data: cliente, error } = await supabase
        .from("clientes")
        .update(data)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return cliente as Cliente;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clientes"] });
      toast({
        title: "Cliente atualizado",
        description: "Os dados do cliente foram atualizados.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao atualizar cliente",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    clientes: query.data || [],
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
    createCliente: createMutation.mutateAsync,
    updateCliente: updateMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
  };
}

export function useCliente(id: string | undefined) {
  return useQuery({
    queryKey: ["cliente", id],
    queryFn: async () => {
      if (!id) return null;

      const { data, error } = await supabase
        .from("clientes")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Cliente;
    },
    enabled: !!id,
  });
}
