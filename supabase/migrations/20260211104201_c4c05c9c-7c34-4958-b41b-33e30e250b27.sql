
-- Allow users to read their own roles
CREATE POLICY "Usuarios podem ver suas proprias roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);
