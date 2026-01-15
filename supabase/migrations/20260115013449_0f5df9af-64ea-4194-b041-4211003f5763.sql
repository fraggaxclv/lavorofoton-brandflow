-- =====================================================
-- SISTEMA INTERNO LAVORO - CRM/PIPELINE DE VENDAS
-- =====================================================

-- 1. Adicionar campos extras na tabela profiles para o sistema interno
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS nome_exibicao TEXT,
ADD COLUMN IF NOT EXISTS ativo BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS telefone TEXT,
ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- 2. Criar enum para status de negociação
DO $$ BEGIN
  CREATE TYPE public.status_negociacao AS ENUM (
    'lead_novo',
    'proposta_enviada',
    'negociacao',
    'credito_analise',
    'aprovado',
    'faturado',
    'perdido'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 3. Criar enum para tipo de atividade
DO $$ BEGIN
  CREATE TYPE public.tipo_atividade AS ENUM (
    'ligacao',
    'whatsapp',
    'reuniao',
    'proposta',
    'documento',
    'email',
    'visita',
    'outro'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 4. Criar enum para origem do lead
DO $$ BEGIN
  CREATE TYPE public.origem_lead AS ENUM (
    'site',
    'whatsapp',
    'indicacao',
    'trafego_pago',
    'telefone',
    'visita_loja',
    'evento',
    'outro'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 5. Tabela CLIENTES
CREATE TABLE IF NOT EXISTS public.clientes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tipo TEXT NOT NULL CHECK (tipo IN ('PJ', 'PF')),
  nome_razao TEXT NOT NULL,
  cpf_cnpj TEXT,
  cidade TEXT,
  estado TEXT,
  telefone TEXT,
  email TEXT,
  responsavel TEXT,
  observacoes TEXT,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Índices para clientes
CREATE INDEX IF NOT EXISTS idx_clientes_nome ON public.clientes(nome_razao);
CREATE INDEX IF NOT EXISTS idx_clientes_cidade ON public.clientes(cidade);
CREATE INDEX IF NOT EXISTS idx_clientes_created_by ON public.clientes(created_by);

-- Trigger para updated_at
DROP TRIGGER IF EXISTS update_clientes_updated_at ON public.clientes;
CREATE TRIGGER update_clientes_updated_at
  BEFORE UPDATE ON public.clientes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- 6. Tabela NEGOCIACOES
CREATE TABLE IF NOT EXISTS public.negociacoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  numero_negociacao TEXT NOT NULL UNIQUE,
  cliente_id UUID NOT NULL REFERENCES public.clientes(id) ON DELETE RESTRICT,
  owner_user_id UUID NOT NULL REFERENCES auth.users(id),
  origem_lead TEXT NOT NULL DEFAULT 'outro',
  produto_principal TEXT,
  produtos JSONB DEFAULT '[]'::jsonb,
  valor_estimado NUMERIC(15,2) DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'lead_novo' CHECK (status IN ('lead_novo', 'proposta_enviada', 'negociacao', 'credito_analise', 'aprovado', 'faturado', 'perdido')),
  probabilidade INTEGER DEFAULT 50 CHECK (probabilidade >= 0 AND probabilidade <= 100),
  proximo_passo TEXT,
  data_proximo_passo DATE,
  motivo_perda TEXT,
  data_fechamento DATE,
  observacoes TEXT,
  ultima_atualizacao TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Índices para negociacoes
CREATE INDEX IF NOT EXISTS idx_negociacoes_cliente ON public.negociacoes(cliente_id);
CREATE INDEX IF NOT EXISTS idx_negociacoes_owner ON public.negociacoes(owner_user_id);
CREATE INDEX IF NOT EXISTS idx_negociacoes_status ON public.negociacoes(status);
CREATE INDEX IF NOT EXISTS idx_negociacoes_data_proximo ON public.negociacoes(data_proximo_passo);

-- Trigger para updated_at
DROP TRIGGER IF EXISTS update_negociacoes_updated_at ON public.negociacoes;
CREATE TRIGGER update_negociacoes_updated_at
  BEFORE UPDATE ON public.negociacoes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Sequence para número de negociação
CREATE SEQUENCE IF NOT EXISTS negociacoes_seq START 1;

-- Função para gerar número de negociação
CREATE OR REPLACE FUNCTION public.gerar_numero_negociacao()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  ano TEXT;
  seq TEXT;
BEGIN
  ano := EXTRACT(YEAR FROM CURRENT_DATE)::TEXT;
  seq := LPAD(nextval('negociacoes_seq')::TEXT, 5, '0');
  RETURN 'NEG-' || ano || '-' || seq;
END;
$$;

-- 7. Tabela ATIVIDADES (histórico/log)
CREATE TABLE IF NOT EXISTS public.atividades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  negociacao_id UUID NOT NULL REFERENCES public.negociacoes(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL DEFAULT 'outro' CHECK (tipo IN ('ligacao', 'whatsapp', 'reuniao', 'proposta', 'documento', 'email', 'visita', 'outro')),
  titulo TEXT,
  nota TEXT,
  data_hora TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Índices para atividades
CREATE INDEX IF NOT EXISTS idx_atividades_negociacao ON public.atividades(negociacao_id);
CREATE INDEX IF NOT EXISTS idx_atividades_data ON public.atividades(data_hora DESC);

-- =====================================================
-- ROW LEVEL SECURITY POLICIES
-- =====================================================

-- Habilitar RLS
ALTER TABLE public.clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.negociacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.atividades ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- POLÍTICAS PARA CLIENTES
-- =====================================================

-- Admin pode ver todos os clientes
CREATE POLICY "Admin pode ver todos clientes"
ON public.clientes FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Vendedor pode ver clientes que ele criou OU clientes vinculados às suas negociações
CREATE POLICY "Vendedor pode ver seus clientes"
ON public.clientes FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'vendedor') AND (
    created_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.negociacoes n 
      WHERE n.cliente_id = clientes.id 
      AND n.owner_user_id = auth.uid()
    )
  )
);

-- Usuário autenticado pode inserir clientes (vinculado ao created_by)
CREATE POLICY "Autenticado pode criar clientes"
ON public.clientes FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = created_by);

-- Admin pode atualizar qualquer cliente
CREATE POLICY "Admin pode atualizar clientes"
ON public.clientes FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Vendedor pode atualizar clientes que criou
CREATE POLICY "Vendedor pode atualizar seus clientes"
ON public.clientes FOR UPDATE
TO authenticated
USING (
  public.has_role(auth.uid(), 'vendedor') AND created_by = auth.uid()
);

-- =====================================================
-- POLÍTICAS PARA NEGOCIAÇÕES
-- =====================================================

-- Admin pode ver todas negociações
CREATE POLICY "Admin pode ver todas negociacoes"
ON public.negociacoes FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Vendedor só vê suas próprias negociações
CREATE POLICY "Vendedor pode ver suas negociacoes"
ON public.negociacoes FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'vendedor') AND owner_user_id = auth.uid()
);

-- Usuário autenticado pode inserir negociações (vinculado ao owner)
CREATE POLICY "Autenticado pode criar negociacoes"
ON public.negociacoes FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = owner_user_id);

-- Admin pode atualizar qualquer negociação
CREATE POLICY "Admin pode atualizar negociacoes"
ON public.negociacoes FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Vendedor pode atualizar suas negociações
CREATE POLICY "Vendedor pode atualizar suas negociacoes"
ON public.negociacoes FOR UPDATE
TO authenticated
USING (
  public.has_role(auth.uid(), 'vendedor') AND owner_user_id = auth.uid()
);

-- =====================================================
-- POLÍTICAS PARA ATIVIDADES
-- =====================================================

-- Admin pode ver todas atividades
CREATE POLICY "Admin pode ver todas atividades"
ON public.atividades FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Vendedor pode ver atividades das suas negociações
CREATE POLICY "Vendedor pode ver atividades suas negociacoes"
ON public.atividades FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'vendedor') AND
  EXISTS (
    SELECT 1 FROM public.negociacoes n 
    WHERE n.id = atividades.negociacao_id 
    AND n.owner_user_id = auth.uid()
  )
);

-- Usuário autenticado pode inserir atividades (vinculado ao created_by)
CREATE POLICY "Autenticado pode criar atividades"
ON public.atividades FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = created_by);

-- Admin pode atualizar atividades
CREATE POLICY "Admin pode atualizar atividades"
ON public.atividades FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admin pode deletar atividades
CREATE POLICY "Admin pode deletar atividades"
ON public.atividades FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- =====================================================
-- FUNÇÃO HELPER PARA VERIFICAR ROLE DO USUÁRIO ATUAL
-- =====================================================

CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS TEXT
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role::TEXT FROM public.user_roles WHERE user_id = auth.uid() LIMIT 1
$$;