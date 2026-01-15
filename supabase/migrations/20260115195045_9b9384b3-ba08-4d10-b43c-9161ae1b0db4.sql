-- Adicionar campos de endereço à tabela clientes
ALTER TABLE public.clientes
ADD COLUMN endereco TEXT,
ADD COLUMN numero TEXT,
ADD COLUMN cep TEXT;

-- Tornar cpf_cnpj NOT NULL (nome_razao já é NOT NULL)
-- Primeiro, atualizar registros existentes que possam ter cpf_cnpj nulo
UPDATE public.clientes SET cpf_cnpj = '' WHERE cpf_cnpj IS NULL;

-- Agora alterar a coluna para NOT NULL
ALTER TABLE public.clientes ALTER COLUMN cpf_cnpj SET NOT NULL;