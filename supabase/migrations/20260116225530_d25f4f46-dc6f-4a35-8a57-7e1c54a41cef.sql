-- Atualizar a política de INSERT para clientes para permitir vendedores
DROP POLICY IF EXISTS "Autenticado pode criar clientes" ON public.clientes;

CREATE POLICY "Vendedor e admin podem criar clientes" 
ON public.clientes 
FOR INSERT 
WITH CHECK (
  auth.uid() = created_by 
  AND (
    has_role(auth.uid(), 'admin'::app_role) 
    OR has_role(auth.uid(), 'vendedor'::app_role)
  )
);