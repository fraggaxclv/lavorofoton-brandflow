-- Criar tabela para armazenar diagnósticos de frota
CREATE TABLE public.diagnosticos_frota (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Bloco 1: Perfil da Empresa
  cnpj TEXT NOT NULL,
  razao_social TEXT NOT NULL,
  nome_responsavel TEXT NOT NULL,
  telefone_whatsapp TEXT NOT NULL,
  email_responsavel TEXT NOT NULL,
  telefone TEXT,
  estado TEXT NOT NULL,
  segmento TEXT NOT NULL,
  
  -- Bloco 2: Frota Atual
  qtd_veiculos TEXT,
  tipos_veiculos TEXT,
  idade_media TEXT,
  operacao TEXT,
  km_mes TEXT,
  marcas_atuais TEXT,
  
  -- Bloco 3: Indicadores Financeiros
  faturamento TEXT,
  margem TEXT,
  bancos_usados TEXT,
  financiamentos_ativos TEXT,
  
  -- Bloco 4: Intenção de Expansão
  modelos_desejados TEXT,
  qtd_desejada TEXT,
  prazo TEXT,
  uso_operacional TEXT,
  
  -- Bloco 5: Urgência
  urgencia TEXT,
  
  -- Metadados
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS (mas permitir inserção pública)
ALTER TABLE public.diagnosticos_frota ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserções públicas (sem autenticação)
CREATE POLICY "Permitir inserções públicas de diagnósticos" 
ON public.diagnosticos_frota 
FOR INSERT 
TO anon
WITH CHECK (true);

-- Política para permitir leitura apenas por usuários autenticados (futura administração)
CREATE POLICY "Permitir leitura por usuários autenticados" 
ON public.diagnosticos_frota 
FOR SELECT 
TO authenticated
USING (true);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_diagnosticos_frota_updated_at
BEFORE UPDATE ON public.diagnosticos_frota
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Criar tabela para armazenar arquivos anexados
CREATE TABLE public.diagnosticos_arquivos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  diagnostico_id UUID NOT NULL REFERENCES public.diagnosticos_frota(id) ON DELETE CASCADE,
  tipo_arquivo TEXT NOT NULL, -- 'comprovante', 'extratos', 'balanco', 'contrato', 'documentos'
  nome_arquivo TEXT NOT NULL,
  arquivo_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS para arquivos
ALTER TABLE public.diagnosticos_arquivos ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserções públicas de arquivos
CREATE POLICY "Permitir inserções públicas de arquivos" 
ON public.diagnosticos_arquivos 
FOR INSERT 
TO anon
WITH CHECK (true);

-- Política para leitura por usuários autenticados
CREATE POLICY "Permitir leitura de arquivos por usuários autenticados" 
ON public.diagnosticos_arquivos 
FOR SELECT 
TO authenticated
USING (true);

-- Criar bucket de storage para arquivos de diagnóstico
INSERT INTO storage.buckets (id, name, public) 
VALUES ('diagnosticos', 'diagnosticos', false)
ON CONFLICT DO NOTHING;

-- Políticas de storage para permitir uploads públicos
CREATE POLICY "Permitir uploads públicos de arquivos de diagnóstico" 
ON storage.objects 
FOR INSERT 
TO anon
WITH CHECK (bucket_id = 'diagnosticos');

-- Permitir leitura apenas por usuários autenticados
CREATE POLICY "Permitir leitura de arquivos por usuários autenticados" 
ON storage.objects 
FOR SELECT 
TO authenticated
USING (bucket_id = 'diagnosticos');