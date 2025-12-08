-- Criar tabela para propostas comerciais
CREATE TABLE public.propostas_comerciais (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  numero_proposta TEXT NOT NULL UNIQUE,
  local TEXT,
  data DATE NOT NULL DEFAULT CURRENT_DATE,
  nome_vendedor TEXT NOT NULL,
  
  -- Dados do cliente
  nome_cliente TEXT NOT NULL,
  cnpj TEXT NOT NULL,
  cidade TEXT,
  estado TEXT,
  
  -- Produtos (JSON array)
  produtos JSONB NOT NULL DEFAULT '[]'::jsonb,
  
  -- Condições comerciais
  faturamento_tipo TEXT NOT NULL,
  pagamento_tipo TEXT NOT NULL,
  pagamento_outros TEXT,
  valor_total NUMERIC NOT NULL DEFAULT 0,
  valor_entrada NUMERIC DEFAULT 0,
  valor_frete NUMERIC DEFAULT 0,
  prazo_entrega INTEGER,
  tributacao TEXT,
  
  -- Observações
  observacoes TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.propostas_comerciais ENABLE ROW LEVEL SECURITY;

-- Policy para inserção pública (acesso via link interno)
CREATE POLICY "Permitir inserção de propostas" 
ON public.propostas_comerciais 
FOR INSERT 
WITH CHECK (true);

-- Policy para leitura apenas por admins
CREATE POLICY "Apenas admins podem ler propostas" 
ON public.propostas_comerciais 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Policy para atualização apenas por admins
CREATE POLICY "Apenas admins podem atualizar propostas" 
ON public.propostas_comerciais 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Criar sequência para numeração automática
CREATE SEQUENCE propostas_seq START 1;

-- Função para gerar número da proposta
CREATE OR REPLACE FUNCTION public.gerar_numero_proposta()
RETURNS TEXT AS $$
DECLARE
  ano TEXT;
  seq TEXT;
BEGIN
  ano := EXTRACT(YEAR FROM CURRENT_DATE)::TEXT;
  seq := LPAD(nextval('propostas_seq')::TEXT, 6, '0');
  RETURN 'LAV-' || ano || '-' || seq;
END;
$$ LANGUAGE plpgsql;

-- Trigger para updated_at
CREATE TRIGGER update_propostas_comerciais_updated_at
BEFORE UPDATE ON public.propostas_comerciais
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();