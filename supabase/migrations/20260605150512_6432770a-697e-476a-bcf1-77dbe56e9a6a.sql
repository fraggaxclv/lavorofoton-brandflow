
-- 1) Tabela
CREATE TABLE public.simulacoes_tco (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  simulation_code text NOT NULL UNIQUE,
  nome text NOT NULL,
  email text NOT NULL,
  telefone text NOT NULL,
  empresa text,
  aceite_consultoria boolean NOT NULL DEFAULT false,
  aceite_privacidade boolean NOT NULL DEFAULT false,
  inputs_simulacao jsonb NOT NULL DEFAULT '{}'::jsonb,
  resultados_simulacao jsonb NOT NULL DEFAULT '{}'::jsonb,
  modelo_foton text,
  modelo_concorrente text,
  ip_address inet,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 2) Grants
GRANT INSERT ON public.simulacoes_tco TO anon;
GRANT INSERT ON public.simulacoes_tco TO authenticated;
GRANT ALL ON public.simulacoes_tco TO service_role;

-- 3) RLS
ALTER TABLE public.simulacoes_tco ENABLE ROW LEVEL SECURITY;

-- Anônimos podem inserir (gate de captura público)
CREATE POLICY "anon_insert_simulacoes_tco"
  ON public.simulacoes_tco FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "auth_insert_simulacoes_tco"
  ON public.simulacoes_tco FOR INSERT TO authenticated
  WITH CHECK (true);

-- Apenas admins podem ler
CREATE POLICY "admin_select_simulacoes_tco"
  ON public.simulacoes_tco FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Bloqueio explícito a anônimos para SELECT
CREATE POLICY "anon_no_select_simulacoes_tco"
  ON public.simulacoes_tco FOR SELECT TO anon
  USING (false);

CREATE INDEX idx_simulacoes_tco_code ON public.simulacoes_tco(simulation_code);
CREATE INDEX idx_simulacoes_tco_created ON public.simulacoes_tco(created_at DESC);

-- 4) Função pública de verificação (mascarada)
CREATE OR REPLACE FUNCTION public.verificar_simulacao(p_code text)
RETURNS TABLE(
  simulation_code text,
  nome_mascarado text,
  modelo_foton text,
  modelo_concorrente text,
  created_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    s.simulation_code,
    -- Primeiro nome + inicial do sobrenome (ex: "Matheus F.")
    CASE
      WHEN position(' ' in trim(s.nome)) > 0 THEN
        split_part(trim(s.nome), ' ', 1) || ' ' ||
        upper(left(split_part(trim(s.nome), ' ', array_length(string_to_array(trim(s.nome), ' '), 1)), 1)) || '.'
      ELSE split_part(trim(s.nome), ' ', 1)
    END AS nome_mascarado,
    s.modelo_foton,
    s.modelo_concorrente,
    s.created_at
  FROM public.simulacoes_tco s
  WHERE s.simulation_code = upper(trim(p_code))
  LIMIT 1;
$$;

GRANT EXECUTE ON FUNCTION public.verificar_simulacao(text) TO anon, authenticated;
