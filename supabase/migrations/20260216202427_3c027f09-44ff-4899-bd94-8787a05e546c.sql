
-- Tabela de solicitações de acesso a clientes
CREATE TABLE public.solicitacoes_acesso_cliente (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  vendedor_id UUID NOT NULL,
  cliente_id UUID REFERENCES public.clientes(id),
  cnpj_solicitado TEXT NOT NULL,
  razao_social_encontrada TEXT,
  vendedor_atual_id UUID,
  status TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'aprovado', 'rejeitado')),
  motivo_rejeicao TEXT,
  aprovado_por UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.solicitacoes_acesso_cliente ENABLE ROW LEVEL SECURITY;

-- Vendedor pode ver suas próprias solicitações
CREATE POLICY "Vendedor pode ver suas solicitacoes"
  ON public.solicitacoes_acesso_cliente
  FOR SELECT
  USING (has_role(auth.uid(), 'vendedor'::app_role) AND vendedor_id = auth.uid());

-- Admin pode ver todas solicitações
CREATE POLICY "Admin pode ver todas solicitacoes"
  ON public.solicitacoes_acesso_cliente
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Vendedor pode criar solicitações
CREATE POLICY "Vendedor pode criar solicitacoes"
  ON public.solicitacoes_acesso_cliente
  FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'vendedor'::app_role) AND vendedor_id = auth.uid());

-- Admin pode atualizar (aprovar/rejeitar)
CREATE POLICY "Admin pode atualizar solicitacoes"
  ON public.solicitacoes_acesso_cliente
  FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Bloqueio anônimo
CREATE POLICY "Require auth for solicitacoes_acesso_cliente"
  ON public.solicitacoes_acesso_cliente
  FOR SELECT
  USING (false);

-- Trigger para updated_at
CREATE TRIGGER update_solicitacoes_acesso_updated_at
  BEFORE UPDATE ON public.solicitacoes_acesso_cliente
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
