
-- Adicionar vínculo de propostas_comerciais com negociações e clientes
ALTER TABLE public.propostas_comerciais
ADD COLUMN negociacao_id uuid REFERENCES public.negociacoes(id) ON DELETE SET NULL,
ADD COLUMN cliente_id uuid REFERENCES public.clientes(id) ON DELETE SET NULL;

-- Adicionar vínculo de pedidos_faturamento com negociações, clientes e proposta de origem
ALTER TABLE public.pedidos_faturamento
ADD COLUMN negociacao_id uuid REFERENCES public.negociacoes(id) ON DELETE SET NULL,
ADD COLUMN cliente_id uuid REFERENCES public.clientes(id) ON DELETE SET NULL,
ADD COLUMN proposta_origem_id uuid REFERENCES public.propostas_comerciais(id) ON DELETE SET NULL;

-- Índices para consultas rápidas
CREATE INDEX idx_propostas_negociacao_id ON public.propostas_comerciais(negociacao_id);
CREATE INDEX idx_propostas_cliente_id ON public.propostas_comerciais(cliente_id);
CREATE INDEX idx_pedidos_negociacao_id ON public.pedidos_faturamento(negociacao_id);
CREATE INDEX idx_pedidos_cliente_id ON public.pedidos_faturamento(cliente_id);
CREATE INDEX idx_pedidos_proposta_origem_id ON public.pedidos_faturamento(proposta_origem_id);
