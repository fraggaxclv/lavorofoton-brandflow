-- Política para admin deletar negociações
CREATE POLICY "Admin pode deletar negociacoes" 
ON public.negociacoes 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Política para vendedor deletar suas próprias negociações
CREATE POLICY "Vendedor pode deletar suas negociacoes" 
ON public.negociacoes 
FOR DELETE 
USING (has_role(auth.uid(), 'vendedor'::app_role) AND owner_user_id = auth.uid());