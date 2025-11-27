-- Drop a política existente com recursão
DROP POLICY IF EXISTS "Apenas admins podem ver roles" ON public.user_roles;

-- Criar função SECURITY DEFINER para verificar roles sem recursão
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Recriar a política usando a função SECURITY DEFINER
CREATE POLICY "Apenas admins podem ver roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));