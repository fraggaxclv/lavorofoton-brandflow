
CREATE TABLE public.leads_contato (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT NOT NULL,
  empresa TEXT,
  mensagem TEXT,
  origem TEXT,
  status TEXT NOT NULL DEFAULT 'novo',
  user_agent TEXT,
  ip_hash TEXT
);

ALTER TABLE public.leads_contato ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can insert leads"
ON public.leads_contato
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Block anon select leads"
ON public.leads_contato
FOR SELECT
TO anon
USING (false);

CREATE POLICY "Admin can view leads"
ON public.leads_contato
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admin can update leads"
ON public.leads_contato
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admin can delete leads"
ON public.leads_contato
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX idx_leads_contato_created_at ON public.leads_contato(created_at DESC);
CREATE INDEX idx_leads_contato_status ON public.leads_contato(status);
