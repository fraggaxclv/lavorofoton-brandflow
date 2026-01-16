-- Adicionar coluna vendedor_id para metas individuais (null = meta geral do time)
ALTER TABLE public.metas_mensais 
ADD COLUMN vendedor_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- Criar índice para performance
CREATE INDEX idx_metas_mensais_vendedor ON public.metas_mensais(vendedor_id, mes, ano);

-- Constraint para garantir unicidade: apenas uma meta por vendedor/mês/ano (ou uma meta geral por mês/ano)
ALTER TABLE public.metas_mensais
ADD CONSTRAINT unique_meta_vendedor_mes_ano UNIQUE (vendedor_id, mes, ano);

-- Atualizar política para vendedores poderem ver suas próprias metas
CREATE POLICY "Vendedor pode ver sua meta individual"
ON public.metas_mensais
FOR SELECT
USING (
  vendedor_id = auth.uid() AND has_role(auth.uid(), 'vendedor'::app_role)
);