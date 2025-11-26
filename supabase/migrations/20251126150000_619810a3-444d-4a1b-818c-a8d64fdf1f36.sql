-- Criar tabela de pedidos de faturamento
CREATE TABLE IF NOT EXISTS public.pedidos_faturamento (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  numero_pedido TEXT NOT NULL UNIQUE,
  local TEXT,
  data DATE NOT NULL,
  nome_vendedor TEXT NOT NULL,
  
  -- Dados do cliente
  nome_cliente TEXT NOT NULL,
  cnpj TEXT NOT NULL,
  ie_rg TEXT,
  rua TEXT,
  numero TEXT,
  bairro TEXT,
  cep TEXT,
  cidade TEXT,
  estado TEXT,
  telefone_cliente TEXT,
  responsavel_frota TEXT,
  email_responsavel TEXT,
  
  -- Financeiro
  faturamento_tipo TEXT NOT NULL,
  nome_instituicao TEXT,
  financiamento_forma TEXT NOT NULL,
  financiamento_forma_outros TEXT,
  valor_total_produtos DECIMAL(15,2) NOT NULL,
  entrada DECIMAL(15,2),
  
  -- Observações
  observacoes TEXT,
  
  -- Produtos (JSON)
  produtos JSONB NOT NULL,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar índices para busca
CREATE INDEX idx_pedidos_numero ON public.pedidos_faturamento(numero_pedido);
CREATE INDEX idx_pedidos_data ON public.pedidos_faturamento(data);
CREATE INDEX idx_pedidos_vendedor ON public.pedidos_faturamento(nome_vendedor);
CREATE INDEX idx_pedidos_cliente ON public.pedidos_faturamento(nome_cliente);

-- Habilitar RLS
ALTER TABLE public.pedidos_faturamento ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura pública (página interna)
CREATE POLICY "Permitir leitura de pedidos" 
ON public.pedidos_faturamento 
FOR SELECT 
USING (true);

-- Política para permitir inserção pública
CREATE POLICY "Permitir inserção de pedidos" 
ON public.pedidos_faturamento 
FOR INSERT 
WITH CHECK (true);

-- Trigger para atualizar updated_at
CREATE TRIGGER update_pedidos_faturamento_updated_at
BEFORE UPDATE ON public.pedidos_faturamento
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();