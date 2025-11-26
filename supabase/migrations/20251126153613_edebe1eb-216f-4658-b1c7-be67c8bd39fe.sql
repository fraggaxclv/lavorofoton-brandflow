-- Criar enum para roles de usuários
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Criar tabela de perfis de usuários
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS na tabela profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Política: Usuários podem ver seu próprio perfil
CREATE POLICY "Usuários podem ver seu próprio perfil"
ON public.profiles
FOR SELECT
USING (auth.uid() = id);

-- Política: Usuários podem atualizar seu próprio perfil
CREATE POLICY "Usuários podem atualizar seu próprio perfil"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id);

-- Criar tabela de roles de usuários
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Habilitar RLS na tabela user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Política: Apenas admins podem ver roles
CREATE POLICY "Apenas admins podem ver roles"
ON public.user_roles
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
  )
);

-- Criar função SECURITY DEFINER para verificar roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Criar função para criar perfil automaticamente após signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$;

-- Trigger para criar perfil após signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Atualizar trigger de updated_at para profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ATUALIZAR POLÍTICAS RLS DAS TABELAS EXISTENTES

-- Remover políticas antigas de diagnosticos_frota
DROP POLICY IF EXISTS "Permitir leitura por usuários autenticados" ON public.diagnosticos_frota;
DROP POLICY IF EXISTS "Permitir inserções públicas de diagnósticos" ON public.diagnosticos_frota;

-- Nova política: INSERT público (formulário acessível a todos)
CREATE POLICY "Permitir inserções públicas de diagnósticos"
ON public.diagnosticos_frota
FOR INSERT
WITH CHECK (true);

-- Nova política: SELECT apenas para admins autenticados
CREATE POLICY "Apenas admins podem ler diagnósticos"
ON public.diagnosticos_frota
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Remover políticas antigas de diagnosticos_arquivos
DROP POLICY IF EXISTS "Permitir leitura de arquivos por usuários autenticados" ON public.diagnosticos_arquivos;
DROP POLICY IF EXISTS "Permitir inserções públicas de arquivos" ON public.diagnosticos_arquivos;

-- Nova política: INSERT público
CREATE POLICY "Permitir inserções públicas de arquivos"
ON public.diagnosticos_arquivos
FOR INSERT
WITH CHECK (true);

-- Nova política: SELECT apenas para admins
CREATE POLICY "Apenas admins podem ler arquivos"
ON public.diagnosticos_arquivos
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Atualizar políticas de pedidos_faturamento
DROP POLICY IF EXISTS "Permitir leitura de pedidos" ON public.pedidos_faturamento;
DROP POLICY IF EXISTS "Permitir inserção de pedidos" ON public.pedidos_faturamento;

-- Nova política: INSERT público
CREATE POLICY "Permitir inserção de pedidos"
ON public.pedidos_faturamento
FOR INSERT
WITH CHECK (true);

-- Nova política: SELECT apenas para admins
CREATE POLICY "Apenas admins podem ler pedidos"
ON public.pedidos_faturamento
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));