-- Adicionar campo consultor_responsavel na tabela clientes
ALTER TABLE public.clientes 
ADD COLUMN consultor_responsavel TEXT;