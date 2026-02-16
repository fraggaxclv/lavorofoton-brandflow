
-- Function to search client by CNPJ for access requests (bypasses RLS)
CREATE OR REPLACE FUNCTION public.buscar_cliente_por_cnpj(p_cnpj TEXT)
RETURNS TABLE(id UUID, razao_social TEXT, vendedor_responsavel UUID)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT c.id, c.razao_social, c.vendedor_responsavel
  FROM public.clientes c
  WHERE c.cpf_cnpj = p_cnpj
  LIMIT 1;
$$;
