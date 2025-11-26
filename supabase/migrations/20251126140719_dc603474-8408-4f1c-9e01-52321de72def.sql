-- Corrigir função com search_path seguro
DROP FUNCTION IF EXISTS public.update_updated_at_column() CASCADE;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recriar o trigger
CREATE TRIGGER update_diagnosticos_frota_updated_at
BEFORE UPDATE ON public.diagnosticos_frota
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();