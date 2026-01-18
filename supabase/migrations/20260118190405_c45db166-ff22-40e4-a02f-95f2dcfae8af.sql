-- Renomear nome_razao para razao_social e adicionar nome_fantasia
ALTER TABLE public.clientes 
RENAME COLUMN nome_razao TO razao_social;

ALTER TABLE public.clientes 
ADD COLUMN nome_fantasia TEXT;