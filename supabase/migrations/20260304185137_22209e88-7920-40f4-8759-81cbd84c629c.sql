-- =====================================================
-- FIX 1: solicitacoes_acesso_cliente - "Require auth" targets {public} instead of {anon}
-- This blocks ALL access including authenticated users
-- =====================================================
DROP POLICY IF EXISTS "Require auth for solicitacoes_acesso_cliente" ON public.solicitacoes_acesso_cliente;
CREATE POLICY "Require auth for solicitacoes_acesso_cliente"
  ON public.solicitacoes_acesso_cliente
  FOR SELECT TO anon
  USING (false);

-- =====================================================
-- FIX 2: clientes - normalize role targets to {authenticated}
-- =====================================================
DROP POLICY IF EXISTS "Vendedor e admin podem criar clientes" ON public.clientes;
CREATE POLICY "Vendedor e admin podem criar clientes"
  ON public.clientes
  FOR INSERT TO authenticated
  WITH CHECK ((auth.uid() = created_by) AND (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'vendedor'::app_role)));

DROP POLICY IF EXISTS "Vendedor pode ver seus clientes" ON public.clientes;
CREATE POLICY "Vendedor pode ver seus clientes"
  ON public.clientes
  FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'vendedor'::app_role) AND ((created_by = auth.uid()) OR (vendedor_responsavel = auth.uid())));

DROP POLICY IF EXISTS "Vendedor pode atualizar seus clientes" ON public.clientes;
CREATE POLICY "Vendedor pode atualizar seus clientes"
  ON public.clientes
  FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'vendedor'::app_role) AND ((created_by = auth.uid()) OR (vendedor_responsavel = auth.uid())));

-- =====================================================
-- FIX 3: negociacoes - normalize role targets
-- =====================================================
DROP POLICY IF EXISTS "Autenticado pode criar negociacoes" ON public.negociacoes;
CREATE POLICY "Autenticado pode criar negociacoes"
  ON public.negociacoes
  FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role) OR (auth.uid() = owner_user_id));

DROP POLICY IF EXISTS "Admin pode deletar negociacoes" ON public.negociacoes;
CREATE POLICY "Admin pode deletar negociacoes"
  ON public.negociacoes
  FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Vendedor pode deletar suas negociacoes" ON public.negociacoes;
CREATE POLICY "Vendedor pode deletar suas negociacoes"
  ON public.negociacoes
  FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'vendedor'::app_role) AND (owner_user_id = auth.uid()));

-- =====================================================
-- FIX 4: profiles - normalize role targets
-- =====================================================
DROP POLICY IF EXISTS "Admins podem ver todos perfis" ON public.profiles;
CREATE POLICY "Admins podem ver todos perfis"
  ON public.profiles
  FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Consultores podem ver perfis de owners de suas negociacoes" ON public.profiles;
CREATE POLICY "Consultores podem ver perfis de owners de suas negociacoes"
  ON public.profiles
  FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'vendedor'::app_role) AND ((id = auth.uid()) OR (EXISTS ( SELECT 1 FROM negociacoes n WHERE ((n.owner_user_id = profiles.id) AND (n.owner_user_id = auth.uid()))))));

DROP POLICY IF EXISTS "Usuários podem ver seu próprio perfil" ON public.profiles;
CREATE POLICY "Usuários podem ver seu próprio perfil"
  ON public.profiles
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Usuários podem atualizar seu próprio perfil" ON public.profiles;
CREATE POLICY "Usuários podem atualizar seu próprio perfil"
  ON public.profiles
  FOR UPDATE TO authenticated
  USING (auth.uid() = id);

-- =====================================================
-- FIX 5: metas_mensais - remove redundant vendedor SELECT (already covered by "Authenticated users can view")
-- =====================================================
DROP POLICY IF EXISTS "Vendedor pode ver sua meta individual" ON public.metas_mensais;

-- =====================================================
-- FIX 6: diagnosticos_arquivos / diagnosticos_frota - normalize role targets
-- =====================================================
DROP POLICY IF EXISTS "Apenas admins podem ler arquivos" ON public.diagnosticos_arquivos;
CREATE POLICY "Apenas admins podem ler arquivos"
  ON public.diagnosticos_arquivos
  FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Apenas admins podem ler diagnósticos" ON public.diagnosticos_frota;
CREATE POLICY "Apenas admins podem ler diagnósticos"
  ON public.diagnosticos_frota
  FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- =====================================================
-- FIX 7: pedidos_faturamento - normalize role targets
-- =====================================================
DROP POLICY IF EXISTS "Apenas admins podem ler pedidos" ON public.pedidos_faturamento;
CREATE POLICY "Apenas admins podem ler pedidos"
  ON public.pedidos_faturamento
  FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Authenticated insert pedidos" ON public.pedidos_faturamento;
CREATE POLICY "Authenticated insert pedidos"
  ON public.pedidos_faturamento
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

-- =====================================================
-- FIX 8: propostas_comerciais - normalize role targets
-- =====================================================
DROP POLICY IF EXISTS "Apenas admins podem ler propostas" ON public.propostas_comerciais;
CREATE POLICY "Apenas admins podem ler propostas"
  ON public.propostas_comerciais
  FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Authenticated insert propostas" ON public.propostas_comerciais;
CREATE POLICY "Authenticated insert propostas"
  ON public.propostas_comerciais
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Admin pode atualizar propostas importado" ON public.propostas_comerciais;
CREATE POLICY "Admin pode atualizar propostas importado"
  ON public.propostas_comerciais
  FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Apenas admins podem atualizar propostas" ON public.propostas_comerciais;
CREATE POLICY "Apenas admins podem atualizar propostas"
  ON public.propostas_comerciais
  FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- =====================================================
-- FIX 9: solicitacoes_acesso_cliente - normalize remaining policies
-- =====================================================
DROP POLICY IF EXISTS "Admin pode ver todas solicitacoes" ON public.solicitacoes_acesso_cliente;
CREATE POLICY "Admin pode ver todas solicitacoes"
  ON public.solicitacoes_acesso_cliente
  FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Vendedor pode ver suas solicitacoes" ON public.solicitacoes_acesso_cliente;
CREATE POLICY "Vendedor pode ver suas solicitacoes"
  ON public.solicitacoes_acesso_cliente
  FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'vendedor'::app_role) AND (vendedor_id = auth.uid()));

DROP POLICY IF EXISTS "Vendedor pode criar solicitacoes" ON public.solicitacoes_acesso_cliente;
CREATE POLICY "Vendedor pode criar solicitacoes"
  ON public.solicitacoes_acesso_cliente
  FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'vendedor'::app_role) AND (vendedor_id = auth.uid()));

DROP POLICY IF EXISTS "Admin pode atualizar solicitacoes" ON public.solicitacoes_acesso_cliente;
CREATE POLICY "Admin pode atualizar solicitacoes"
  ON public.solicitacoes_acesso_cliente
  FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- =====================================================
-- FIX 10: audit_log - normalize role targets
-- =====================================================
DROP POLICY IF EXISTS "Admin pode ver audit log" ON public.audit_log;
CREATE POLICY "Admin pode ver audit log"
  ON public.audit_log
  FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));