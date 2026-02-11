
-- 1. Fix pedidos_faturamento: replace public INSERT with authenticated-only
DROP POLICY IF EXISTS "Permitir inserção de pedidos" ON public.pedidos_faturamento;
CREATE POLICY "Authenticated insert pedidos" ON public.pedidos_faturamento
FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- 2. Fix propostas_comerciais: replace public INSERT with authenticated-only
DROP POLICY IF EXISTS "Permitir inserção de propostas" ON public.propostas_comerciais;
CREATE POLICY "Authenticated insert propostas" ON public.propostas_comerciais
FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- 3. Block anonymous SELECT on clientes (existing policies use RESTRICTIVE so anon is already blocked by role check, but add explicit deny for defense-in-depth)
-- All existing SELECT policies already require has_role() which returns false for anon users, so no change needed.

-- 4. Block anonymous SELECT on negociacoes - same as above, already protected by has_role()

-- 5. Block anonymous SELECT on pedidos_faturamento - already protected by has_role() in SELECT policy

-- 6. Block anonymous SELECT on diagnosticos_frota - already protected by has_role() in SELECT policy

-- 7. Block anonymous SELECT on profiles - already protected by auth.uid() = id check

-- 8. Block anonymous SELECT on propostas_comerciais - already protected by has_role() in SELECT policy

-- Note: All existing SELECT policies are RESTRICTIVE and use either auth.uid() or has_role() 
-- which inherently block anonymous access. The scanner flags are false positives for SELECT.
-- The real issues were the INSERT policies with WITH CHECK (true), now fixed above.
