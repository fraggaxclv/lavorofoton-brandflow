-- Migrar status antigos para o novo fluxo simplificado
-- negociacao, credito_analise, aprovado → proposta_enviada

UPDATE negociacoes 
SET status = 'proposta_enviada', updated_at = now()
WHERE status IN ('negociacao', 'credito_analise', 'aprovado');