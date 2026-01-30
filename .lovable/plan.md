
# Plano: Recuperação de Senha - Sistema Interno

## Resumo
Implementar um fluxo completo de recuperação de senha para o sistema interno (`/interno`), utilizando o Supabase Auth nativo junto com envio de emails personalizados via Resend.

## O que será criado

### 1. Modificações na Tela de Login
**Arquivo:** `src/pages/interno/InternoLogin.tsx`
- Adicionar link "Esqueci minha senha" abaixo do botão de login
- Link direciona para `/interno/recuperar-senha`
- Design consistente com a página atual

### 2. Nova Página: Solicitar Recuperação de Senha
**Arquivo:** `src/pages/interno/RecuperarSenha.tsx`
- Formulário simples com campo de email
- Validação com Zod
- Feedback visual de sucesso/erro
- Link para voltar ao login
- Estados: inicial, enviando, sucesso, erro

### 3. Nova Página: Redefinir Senha
**Arquivo:** `src/pages/interno/RedefinirSenha.tsx`
- Formulário com campos: nova senha e confirmar senha
- Validação de token via URL (Supabase gera automaticamente)
- Requisitos de senha (mínimo 6 caracteres)
- Redirecionamento para login após sucesso

### 4. Nova Edge Function: Envio de Email de Reset
**Arquivo:** `supabase/functions/enviar-email-reset-senha/index.ts`
- Recebe requisição do cliente
- Usa Supabase Auth para gerar token de reset
- Envia email personalizado via Resend (API key já configurada)
- Template de email em português com branding Foton Lavoro

### 5. Novas Rotas no App
**Arquivo:** `src/App.tsx`
- `/interno/recuperar-senha` - Página de solicitação
- `/interno/redefinir-senha` - Página de redefinição (recebe token via URL)

## Fluxo do Usuário

```text
┌─────────────────────────────────────────────────────────────┐
│                    FLUXO DE RECUPERAÇÃO                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. Login ──> Clica "Esqueci minha senha"                   │
│                    │                                         │
│                    ▼                                         │
│  2. /recuperar-senha ──> Digita email ──> Clica "Enviar"    │
│                    │                                         │
│                    ▼                                         │
│  3. Edge Function ──> Supabase gera token ──> Resend envia  │
│                    │                                         │
│                    ▼                                         │
│  4. Usuário recebe email ──> Clica no link                  │
│                    │                                         │
│                    ▼                                         │
│  5. /redefinir-senha?token=xxx ──> Digite nova senha        │
│                    │                                         │
│                    ▼                                         │
│  6. Senha atualizada ──> Redireciona para /interno/login    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Detalhes Técnicos

### Edge Function - Enviar Email Reset
- Usa `supabase.auth.resetPasswordForEmail()` com redirect customizado
- Template HTML responsivo para email
- Tratamento de erros (email não encontrado, rate limiting)
- CORS headers configurados

### Página de Redefinição
- Detecta token via `supabase.auth.onAuthStateChange` evento `PASSWORD_RECOVERY`
- Usa `supabase.auth.updateUser({ password })` para atualizar
- Validação client-side antes de enviar

### Segurança
- Validação de email com Zod
- Tokens expiram automaticamente (configuração padrão Supabase: 1 hora)
- Rate limiting nativo do Supabase Auth
- Mensagens genéricas para não expor se email existe ou não

## Arquivos a Serem Modificados/Criados

| Arquivo | Ação |
|---------|------|
| `src/pages/interno/InternoLogin.tsx` | Modificar |
| `src/pages/interno/RecuperarSenha.tsx` | Criar |
| `src/pages/interno/RedefinirSenha.tsx` | Criar |
| `supabase/functions/enviar-email-reset-senha/index.ts` | Criar |
| `supabase/config.toml` | Modificar (adicionar nova function) |
| `src/App.tsx` | Modificar (adicionar rotas) |

## Dependências
- Resend API Key (já configurada como `RESEND_API_KEY`)
- Supabase Auth (já configurado)
- Nenhuma nova dependência NPM necessária

## Observações Importantes
1. O email será enviado do domínio configurado no Resend
2. O link de redefinição redirecionará para a URL publicada do app
3. Mobile-first: formulários otimizados para toque com alvos de 44px mínimo
