
-- Add importado column to pedidos_faturamento
ALTER TABLE public.pedidos_faturamento 
ADD COLUMN IF NOT EXISTS importado BOOLEAN DEFAULT FALSE;

-- Add importado column to propostas_comerciais
ALTER TABLE public.propostas_comerciais 
ADD COLUMN IF NOT EXISTS importado BOOLEAN DEFAULT FALSE;

-- Allow vendedor to read pedidos_faturamento
CREATE POLICY "Vendedor pode ver pedidos"
ON public.pedidos_faturamento
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'vendedor'::app_role));

-- Allow admin to update importado field on pedidos
CREATE POLICY "Admin pode atualizar pedidos"
ON public.pedidos_faturamento
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow vendedor to read propostas
CREATE POLICY "Vendedor pode ver propostas"
ON public.propostas_comerciais
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'vendedor'::app_role));

-- Allow admin to update importado field on propostas  
CREATE POLICY "Admin pode atualizar propostas importado"
ON public.propostas_comerciais
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));
