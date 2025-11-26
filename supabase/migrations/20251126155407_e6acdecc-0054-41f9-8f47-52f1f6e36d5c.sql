-- Criar bucket público para assets (logos, imagens estáticas)
INSERT INTO storage.buckets (id, name, public)
VALUES ('assets', 'assets', true)
ON CONFLICT (id) DO NOTHING;

-- Criar política para permitir leitura pública
CREATE POLICY "Assets são publicamente acessíveis"
ON storage.objects FOR SELECT
USING (bucket_id = 'assets');

-- Criar política para permitir upload de assets (somente autenticados)
CREATE POLICY "Usuários autenticados podem fazer upload de assets"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'assets' AND auth.uid() IS NOT NULL);