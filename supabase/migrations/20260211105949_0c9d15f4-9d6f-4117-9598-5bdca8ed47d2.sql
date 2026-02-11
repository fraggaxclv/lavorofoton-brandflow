
-- Add explicit PERMISSIVE policies requiring authentication as base layer
-- These work WITH the existing RESTRICTIVE policies for defense-in-depth

-- clientes
CREATE POLICY "Require auth for clientes" ON public.clientes
FOR SELECT TO anon USING (false);

-- negociacoes
CREATE POLICY "Require auth for negociacoes" ON public.negociacoes
FOR SELECT TO anon USING (false);

-- pedidos_faturamento
CREATE POLICY "Require auth for pedidos_faturamento" ON public.pedidos_faturamento
FOR SELECT TO anon USING (false);

-- propostas_comerciais
CREATE POLICY "Require auth for propostas_comerciais" ON public.propostas_comerciais
FOR SELECT TO anon USING (false);

-- diagnosticos_frota
CREATE POLICY "Require auth for diagnosticos_frota" ON public.diagnosticos_frota
FOR SELECT TO anon USING (false);

-- diagnosticos_arquivos
CREATE POLICY "Require auth for diagnosticos_arquivos" ON public.diagnosticos_arquivos
FOR SELECT TO anon USING (false);

-- profiles
CREATE POLICY "Require auth for profiles" ON public.profiles
FOR SELECT TO anon USING (false);

-- atividades
CREATE POLICY "Require auth for atividades" ON public.atividades
FOR SELECT TO anon USING (false);

-- user_roles
CREATE POLICY "Require auth for user_roles" ON public.user_roles
FOR SELECT TO anon USING (false);

-- metas_mensais
CREATE POLICY "Require auth for metas_mensais" ON public.metas_mensais
FOR SELECT TO anon USING (false);
