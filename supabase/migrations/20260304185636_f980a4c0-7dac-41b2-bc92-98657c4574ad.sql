ALTER TABLE public.clientes ADD COLUMN origem_lead text DEFAULT 'outro';

COMMENT ON COLUMN public.clientes.origem_lead IS 'Origem do lead: contato_pessoal, lead_fornecido, indicacao, trafego_pago, visita_loja, evento, outro';