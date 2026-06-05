# Open Sim, Gated Asset — Calculadora TCO

Mantém a simulação 100% livre (preserva SEO). Gate aparece só ao **exportar/salvar/enviar por email**, com modal de captura, validação de email/telefone, persistência no Supabase, PDF identificado com código, página de verificação pública e compliance LGPD.

## 1. Backend (Supabase)

**Migration — nova tabela `simulacoes_tco`:**
- `id` (uuid PK), `simulation_code` (text único, ex: `LVF-A1217-7K3F9`)
- `nome`, `email`, `telefone`, `empresa`
- `aceite_consultoria` (bool), `aceite_privacidade` (bool)
- `inputs_simulacao` (jsonb), `resultados_simulacao` (jsonb)
- `ip_address` (inet), `user_agent` (text), `created_at`
- GRANTs: `INSERT` para `anon`+`authenticated`; `SELECT` só `service_role` (admin lê via edge function)
- RLS: policy INSERT aberta; SELECT bloqueado para anon (`USING false`)
- Função pública `verificar_simulacao(code)` SECURITY DEFINER que retorna só nome mascarado + data + modelos (sem dados sensíveis)

## 2. Edge Functions

- **`salvar-simulacao-tco`**: recebe payload validado, valida MX do domínio (DNS over HTTPS via Cloudflare `1.1.1.1`), bloqueia ~200 domínios descartáveis, gera `simulation_code`, insere no DB, retorna `{ code, id }`
- **`enviar-pdf-tco`**: recebe `{ simulation_id, pdf_base64 }`, envia via Resend para o email do lead com PDF anexado

## 3. Frontend

**Componentes novos:**
- `src/components/tco/GatedExportModal.tsx` — modal com form (nome, email corp, telefone, empresa, 2 checkboxes), validações Zod (regex email, telefone BR 10/11 dígitos, rejeita dígitos repetidos/sequências). Após submit OK → mostra "Baixar PDF" + "Receber por WhatsApp"
- `src/lib/disposableEmails.ts` — set com lista de ~200 domínios descartáveis
- `src/lib/validations/leadForm.ts` — schemas Zod
- `src/lib/pdf/tcoReport.ts` — geração do PDF usando jsPDF+html2canvas (já no projeto), com header (logo + título) e footer identificado em todas páginas (nome, data, código, URL verificação, disclaimer + telefone consultivo)

**Páginas:**
- `src/pages/VerificarSimulacao.tsx` na rota `/verificar/:code` — faz fetch via RPC `verificar_simulacao`, mostra estados encontrado/não encontrado
- `src/pages/Privacidade.tsx` em `/privacidade` — texto LGPD padrão (dados coletados, finalidade, retenção, contato@lavorofoton.com.br para exclusão)

**Integração nas calculadoras existentes** (`CalculadoraTCO.tsx`, `CalculadoraTCO2.tsx`, `CalculadoraTCOEletrico.tsx`):
- Substituir handlers atuais de "Exportar PDF" / "Salvar" / "Enviar email" para abrirem `GatedExportModal` ao invés de gerar direto
- Após gate aprovado, gerar PDF com `tcoReport.ts` e chamar edge functions

**Rotas no `App.tsx`:** adicionar `/verificar/:code` e `/privacidade`

## 4. Secrets necessários

`RESEND_API_KEY` (já existe ✓). Usaremos domínio de email já configurado.

## Detalhes técnicos

- Validação MX: `https://cloudflare-dns.com/dns-query?name={dominio}&type=MX` com header `Accept: application/dns-json` dentro da edge function (sem dependências)
- `simulation_code`: prefixo `LVF-` + abreviação do modelo Foton (slug 4 chars) + 5 chars random base32. Unicidade garantida por constraint + retry
- WhatsApp pós-gate: usa número padrão `+55 31 99697-0656` (per project knowledge) com mensagem `Olá, acabei de fazer a simulação ID {CODE} e gostaria de falar com um consultor`
- Mascaramento na verificação: primeiro nome + inicial do sobrenome (ex: `Matheus F.`)
- Nenhum captcha; nenhum double opt-in; nenhum bloqueio antes da simulação
- IP capturado server-side via `x-forwarded-for` na edge function

Confirma para eu seguir? Posso começar pela migration + edge functions e depois o frontend.