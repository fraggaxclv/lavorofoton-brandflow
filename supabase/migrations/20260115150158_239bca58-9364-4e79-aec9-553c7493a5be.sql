-- Add tipo_venda column to negociacoes
ALTER TABLE public.negociacoes 
ADD COLUMN tipo_venda text DEFAULT 'estoque' CHECK (tipo_venda IN ('estoque', 'fadireto'));

-- Add vendedor_responsavel to clientes (for admin assignment)
ALTER TABLE public.clientes 
ADD COLUMN vendedor_responsavel uuid REFERENCES auth.users(id);

-- Drop old vendedor RLS policy for clientes
DROP POLICY IF EXISTS "Vendedor pode ver seus clientes" ON public.clientes;

-- Create new policy: Vendedor can see clients they created OR were assigned to them
CREATE POLICY "Vendedor pode ver seus clientes" 
ON public.clientes 
FOR SELECT 
USING (
  has_role(auth.uid(), 'vendedor'::app_role) 
  AND (
    created_by = auth.uid() 
    OR vendedor_responsavel = auth.uid()
  )
);

-- Drop old vendedor update policy
DROP POLICY IF EXISTS "Vendedor pode atualizar seus clientes" ON public.clientes;

-- Create new update policy: Vendedor can update clients they created OR assigned to them
CREATE POLICY "Vendedor pode atualizar seus clientes" 
ON public.clientes 
FOR UPDATE 
USING (
  has_role(auth.uid(), 'vendedor'::app_role) 
  AND (
    created_by = auth.uid() 
    OR vendedor_responsavel = auth.uid()
  )
);