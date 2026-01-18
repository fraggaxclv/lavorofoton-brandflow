-- Add foreign key constraint from negociacoes.owner_user_id to profiles.id
ALTER TABLE public.negociacoes 
ADD CONSTRAINT negociacoes_owner_user_id_profiles_fkey 
FOREIGN KEY (owner_user_id) 
REFERENCES public.profiles(id) 
ON DELETE SET NULL;