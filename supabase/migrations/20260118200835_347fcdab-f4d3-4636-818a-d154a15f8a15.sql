-- Allow vendedores/consultores to see profiles of owners of negotiations they can access
-- This is needed for the join to work when fetching negotiation data
CREATE POLICY "Consultores podem ver perfis de owners de suas negociacoes" 
ON public.profiles 
FOR SELECT 
USING (
  has_role(auth.uid(), 'vendedor'::app_role) 
  AND (
    id = auth.uid() -- Can see own profile
    OR EXISTS (
      SELECT 1 FROM negociacoes n 
      WHERE n.owner_user_id = profiles.id 
      AND n.owner_user_id = auth.uid()
    )
  )
);