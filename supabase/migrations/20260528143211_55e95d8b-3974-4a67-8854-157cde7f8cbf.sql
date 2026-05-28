
-- Tabela de clippings de mídia
CREATE TABLE public.clippings_midia (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL UNIQUE,
  titulo TEXT NOT NULL,
  resumo TEXT,
  thumbnail_url TEXT,
  veiculo_nome TEXT,
  veiculo_dominio TEXT,
  veiculo_logo_url TEXT,
  tipo TEXT NOT NULL DEFAULT 'noticia',
  marca TEXT,
  data_publicacao TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'pendente',
  fonte_descoberta TEXT,
  query_busca TEXT,
  aprovado_por UUID,
  aprovado_em TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_clippings_status ON public.clippings_midia(status);
CREATE INDEX idx_clippings_data_pub ON public.clippings_midia(data_publicacao DESC);

GRANT SELECT ON public.clippings_midia TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.clippings_midia TO authenticated;
GRANT ALL ON public.clippings_midia TO service_role;

ALTER TABLE public.clippings_midia ENABLE ROW LEVEL SECURITY;

-- Público vê apenas publicados
CREATE POLICY "Public ve clippings publicados"
ON public.clippings_midia FOR SELECT TO anon, authenticated
USING (status = 'publicado');

-- Admin vê tudo
CREATE POLICY "Admin ve todos clippings"
ON public.clippings_midia FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admin gerencia clippings update"
ON public.clippings_midia FOR UPDATE TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admin deleta clippings"
ON public.clippings_midia FOR DELETE TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admin insere clippings manual"
ON public.clippings_midia FOR INSERT TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER trg_clippings_updated_at
BEFORE UPDATE ON public.clippings_midia
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Tabela de blacklist (concorrentes / termos a filtrar)
CREATE TABLE public.clipping_blacklist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  termo TEXT NOT NULL,
  escopo_geografico TEXT NOT NULL DEFAULT 'mg',
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.clipping_blacklist TO authenticated;
GRANT ALL ON public.clipping_blacklist TO service_role;

ALTER TABLE public.clipping_blacklist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin gerencia blacklist"
ON public.clipping_blacklist FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Seed concorrentes MG
INSERT INTO public.clipping_blacklist (termo, escopo_geografico) VALUES
  ('Contauto', 'mg'),
  ('Diamantina Foton', 'mg'),
  ('Foton Diamantina', 'mg'),
  ('Triama Norte', 'mg');
