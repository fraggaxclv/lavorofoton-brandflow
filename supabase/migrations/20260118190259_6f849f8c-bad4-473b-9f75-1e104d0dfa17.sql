-- Adicionar campos complemento e bairro na tabela clientes
ALTER TABLE public.clientes 
ADD COLUMN complemento TEXT,
ADD COLUMN bairro TEXT;