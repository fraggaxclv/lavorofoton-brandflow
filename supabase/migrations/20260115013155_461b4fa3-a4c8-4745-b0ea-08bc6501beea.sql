-- =====================================================
-- MIGRAÇÃO 1: ADICIONAR NOVOS VALORES AO ENUM app_role
-- =====================================================

-- Adicionar vendedor e financeiro ao enum
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'vendedor';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'financeiro';