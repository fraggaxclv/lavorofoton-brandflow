-- Tabela para metas mensais configuradas pelo admin
CREATE TABLE public.metas_mensais (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mes INTEGER NOT NULL CHECK (mes >= 1 AND mes <= 12),
  ano INTEGER NOT NULL,
  valor_meta NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id),
  UNIQUE(mes, ano)
);

-- Enable RLS
ALTER TABLE public.metas_mensais ENABLE ROW LEVEL SECURITY;

-- Todos autenticados podem ver metas
CREATE POLICY "Authenticated users can view metas"
ON public.metas_mensais
FOR SELECT
TO authenticated
USING (true);

-- Apenas admins podem inserir/atualizar/deletar
CREATE POLICY "Admins can insert metas"
ON public.metas_mensais
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update metas"
ON public.metas_mensais
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete metas"
ON public.metas_mensais
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Trigger para updated_at
CREATE TRIGGER update_metas_mensais_updated_at
BEFORE UPDATE ON public.metas_mensais
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();