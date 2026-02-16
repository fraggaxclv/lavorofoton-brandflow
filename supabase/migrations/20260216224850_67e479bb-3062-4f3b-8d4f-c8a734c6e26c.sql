
-- Tabela de log de alterações (auditoria)
CREATE TABLE public.audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tabela text NOT NULL,
  registro_id uuid NOT NULL,
  acao text NOT NULL, -- 'INSERT', 'UPDATE', 'DELETE'
  dados_anteriores jsonb,
  dados_novos jsonb,
  user_id uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Índices para consultas rápidas
CREATE INDEX idx_audit_log_tabela ON public.audit_log(tabela);
CREATE INDEX idx_audit_log_registro ON public.audit_log(registro_id);
CREATE INDEX idx_audit_log_user ON public.audit_log(user_id);
CREATE INDEX idx_audit_log_created ON public.audit_log(created_at DESC);

-- RLS
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- Apenas admins podem ler logs de auditoria
CREATE POLICY "Admin pode ver audit log"
  ON public.audit_log FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Bloquear acesso anônimo
CREATE POLICY "Block anon audit_log"
  ON public.audit_log FOR SELECT TO anon
  USING (false);

-- Trigger function para auditar clientes
CREATE OR REPLACE FUNCTION public.audit_clientes()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'UPDATE' THEN
    INSERT INTO public.audit_log (tabela, registro_id, acao, dados_anteriores, dados_novos, user_id)
    VALUES ('clientes', OLD.id, 'UPDATE', to_jsonb(OLD), to_jsonb(NEW), auth.uid());
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO public.audit_log (tabela, registro_id, acao, dados_anteriores, user_id)
    VALUES ('clientes', OLD.id, 'DELETE', to_jsonb(OLD), auth.uid());
    RETURN OLD;
  ELSIF TG_OP = 'INSERT' THEN
    INSERT INTO public.audit_log (tabela, registro_id, acao, dados_novos, user_id)
    VALUES ('clientes', NEW.id, 'INSERT', to_jsonb(NEW), auth.uid());
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$;

-- Trigger function para auditar negociacoes
CREATE OR REPLACE FUNCTION public.audit_negociacoes()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'UPDATE' THEN
    INSERT INTO public.audit_log (tabela, registro_id, acao, dados_anteriores, dados_novos, user_id)
    VALUES ('negociacoes', OLD.id, 'UPDATE', to_jsonb(OLD), to_jsonb(NEW), auth.uid());
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO public.audit_log (tabela, registro_id, acao, dados_anteriores, user_id)
    VALUES ('negociacoes', OLD.id, 'DELETE', to_jsonb(OLD), auth.uid());
    RETURN OLD;
  ELSIF TG_OP = 'INSERT' THEN
    INSERT INTO public.audit_log (tabela, registro_id, acao, dados_novos, user_id)
    VALUES ('negociacoes', NEW.id, 'INSERT', to_jsonb(NEW), auth.uid());
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$;

-- Aplicar triggers
CREATE TRIGGER audit_clientes_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.clientes
  FOR EACH ROW EXECUTE FUNCTION public.audit_clientes();

CREATE TRIGGER audit_negociacoes_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.negociacoes
  FOR EACH ROW EXECUTE FUNCTION public.audit_negociacoes();
