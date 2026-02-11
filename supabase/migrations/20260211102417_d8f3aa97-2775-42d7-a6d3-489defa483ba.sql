
-- Remove public INSERT policies from diagnosticos_frota and diagnosticos_arquivos
DROP POLICY IF EXISTS "Permitir inserções públicas de diagnósticos" ON public.diagnosticos_frota;
DROP POLICY IF EXISTS "Permitir inserções públicas de arquivos" ON public.diagnosticos_arquivos;
