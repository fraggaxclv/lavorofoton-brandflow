-- Allow admins to view all profiles (needed for joining owner data in negotiations)
CREATE POLICY "Admins podem ver todos perfis" 
ON public.profiles 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));