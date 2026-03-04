ALTER TABLE public.clientes DROP CONSTRAINT clientes_tipo_check;
UPDATE public.clientes SET tipo = LOWER(tipo) WHERE tipo != LOWER(tipo);
ALTER TABLE public.clientes ADD CONSTRAINT clientes_tipo_check CHECK (tipo = ANY (ARRAY['pj'::text, 'pf'::text]));