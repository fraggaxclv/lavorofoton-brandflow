-- Corrigir função para definir search_path
CREATE OR REPLACE FUNCTION public.gerar_numero_proposta()
RETURNS TEXT AS $$
DECLARE
  ano TEXT;
  seq TEXT;
BEGIN
  ano := EXTRACT(YEAR FROM CURRENT_DATE)::TEXT;
  seq := LPAD(nextval('propostas_seq')::TEXT, 6, '0');
  RETURN 'LAV-' || ano || '-' || seq;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;