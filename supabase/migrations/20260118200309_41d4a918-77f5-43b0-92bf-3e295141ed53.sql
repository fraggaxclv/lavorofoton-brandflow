-- Update INSERT policy to allow admins to create negotiations for any user
DROP POLICY IF EXISTS "Autenticado pode criar negociacoes" ON public.negociacoes;

CREATE POLICY "Autenticado pode criar negociacoes" 
ON public.negociacoes 
FOR INSERT 
WITH CHECK (
  -- Admin can create for anyone
  has_role(auth.uid(), 'admin'::app_role) 
  OR 
  -- Others can only create for themselves
  (auth.uid() = owner_user_id)
);