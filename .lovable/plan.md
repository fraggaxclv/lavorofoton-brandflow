
# Clipping de Mídia — Foton/Lavoro na Imprensa

## Visão geral

Página pública `/imprensa` (também linkada do footer e do menu) com cards de matérias publicadas sobre Foton e Lavoro Foton. Conteúdo alimentado por uma rotina automática que busca notícias e vídeos novos, salva no banco como "pendente", e o admin aprova no CRM antes de publicar.

```text
┌─────────────────────┐       ┌──────────────────────┐       ┌──────────────────┐
│ Cron diário (pg_cron)│  ──▶ │ Edge: buscar-clipping │ ──▶  │ clippings (DB)   │
│                     │       │ Perplexity + Firecrawl│       │ status=pendente  │
└─────────────────────┘       └──────────────────────┘       └────────┬─────────┘
                                                                       │
                              ┌────────────────────────────────────────┘
                              ▼
                    ┌─────────────────────────┐       ┌──────────────────────┐
                    │ /interno/clipping (CRM) │ ───▶ │ status=publicado     │
                    │ Admin aprova/edita      │       │ aparece em /imprensa │
                    └─────────────────────────┘       └──────────────────────┘
```

## O que será construído

### 1. Página pública `/imprensa`
- Hero curto: "Foton e Lavoro na mídia"
- Filtros por tipo (Notícia / Vídeo) e por marca (Foton / Lavoro / Ambos)
- Grid de cards (3 colunas desktop, 1 mobile) com:
  - Thumbnail da matéria
  - Logo do veículo (G1, AutoData, etc.) — auto-detectado por domínio
  - Título, veículo de imprensa, data
  - Resumo de 2-3 linhas
  - Botão "Ler matéria" abre em nova aba
- Seção separada para vídeos do YouTube (embed lazy)
- SEO: title, meta description, JSON-LD `CollectionPage`
- Link no footer e no menu Navbar

### 2. CRM `/interno/clipping` (admin)
- Tabela com 3 abas: **Pendentes** / **Publicados** / **Rejeitados**
- Cada item mostra preview do card como sairá no site
- Ações: Aprovar, Rejeitar, Editar (título/resumo/thumb), Excluir
- Botão "Buscar agora" que dispara a edge function manualmente
- Botão "Adicionar manualmente" (cola URL → Firecrawl extrai → vira pendente)

### 3. Backend — Tabela e Edge Functions
- Tabela `clippings_midia` (status: pendente/publicado/rejeitado)
- Edge function `buscar-clipping`:
  - Usa **Perplexity** (`sonar` com `search_recency_filter: week`) para descobrir menções recentes a "Foton caminhões Brasil" e "Lavoro Foton"
  - Para cada URL nova, usa **Firecrawl** scrape com formats `['markdown', 'summary']` + extração de OG image
  - Deduplica por URL, salva como `status='pendente'`
- Edge function `aprovar-clipping` (admin-only)
- Cron diário às 8h via `pg_cron + pg_net`

## Conectores necessários

| Conector | Para quê |
|---|---|
| **Perplexity** | Descobrir notícias novas com filtro temporal e fontes confiáveis |
| **Firecrawl** | Extrair título/resumo/thumbnail/OG image de cada URL |

Os dois são connectors padrão Lovable — você confirma no diálogo de conexão. Sem custo adicional além do que cada provedor cobra (Perplexity e Firecrawl têm planos free/baixo custo suficientes pra este volume).

## Detalhes técnicos

**Schema:**
```sql
CREATE TABLE public.clippings_midia (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL UNIQUE,
  titulo text NOT NULL,
  resumo text,
  thumbnail_url text,
  veiculo_nome text,        -- "G1", "AutoData"
  veiculo_dominio text,     -- "g1.globo.com"
  veiculo_logo_url text,    -- opcional, mapeado por domínio
  tipo text NOT NULL,       -- 'noticia' | 'video'
  marca text NOT NULL,      -- 'foton' | 'lavoro' | 'ambos'
  data_publicacao date,
  status text NOT NULL DEFAULT 'pendente', -- pendente|publicado|rejeitado
  fonte_descoberta text,    -- 'perplexity' | 'manual' | 'firecrawl'
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

**RLS:**
- `anon` + `authenticated` SELECT apenas WHERE `status = 'publicado'`
- INSERT/UPDATE/DELETE: somente admins (via `has_role`)
- `service_role`: full (edge functions usam pra inserir pendentes)

**Mapa de logos de veículos:** arquivo `src/data/veiculosImprensa.ts` com `{ dominio → { nome, logoUrl } }` pra G1, Estadão, Folha, AutoData, AutoEsporte, Quatro Rodas, UOL Carros, Estradão, Diário do Transporte, CanalTech, etc. Fallback: mostra o domínio em texto.

**Rotas:**
- `/imprensa` (pública) — adicionada ao `App.tsx` e ao Footer
- `/interno/clipping` (admin only)

**Stack reuso:** TanStack Query, shadcn (Card, Tabs, Badge, Dialog), padrão dark-mode do `/interno`.

## Fora de escopo (fica pra depois)
- Push/email quando notícia nova entra na fila
- Tradução automática de matérias em inglês
- Análise de sentimento
- Compartilhar matéria direto no WhatsApp do consultor

## Arquivos a criar/modificar
- `supabase/migrations/...` — tabela + RLS + cron
- `supabase/functions/buscar-clipping/index.ts`
- `supabase/functions/aprovar-clipping/index.ts`
- `src/pages/Imprensa.tsx`
- `src/pages/interno/InternoClipping.tsx`
- `src/components/imprensa/ClippingCard.tsx`
- `src/components/interno/ClippingReviewCard.tsx`
- `src/hooks/useClippings.ts`
- `src/data/veiculosImprensa.ts`
- `src/App.tsx` (rotas)
- `src/components/Footer.tsx` (link)
- `src/components/interno/InternoLayout.tsx` (menu)

## Próximo passo
Aprovando esse plano, eu conecto Perplexity e Firecrawl, crio a migration e implemento na ordem: backend → CRM → página pública.
