## Clipping de Mídia — Versão sem custo + Filtro de Concorrentes MG

### Estratégia: Custo Zero
Trocar Firecrawl/Perplexity por **Google News RSS** (gratuito, sem API key, sem limite prático).

**Como funciona:**
- Google News expõe feeds RSS por busca: `https://news.google.com/rss/search?q=<query>&hl=pt-BR&gl=BR&ceid=BR:pt-419`
- Retorna: título, link, data de publicação, fonte (veículo), snippet
- Edge Function `buscar-clipping` faz fetch do RSS, parseia XML e insere no banco
- Cron diário (1x/dia) — zero custo de API
- Thumbnail: extraída do Open Graph da página de destino via fetch direto do HTML (sem Firecrawl). Fallback: logo do veículo.

**Para YouTube:** RSS de busca também existe via `https://www.youtube.com/feeds/videos.xml?search_query=...` (alternativa) ou consultas adicionais ao Google News filtradas por `site:youtube.com`.

**Trade-off aceito:** Sem resumo gerado por IA. Usaremos o snippet do próprio RSS (~150 caracteres) como resumo. Se quiser resumo melhor depois, podemos passar pelo Lovable AI (Gemini Flash Lite, já incluso no Lovable Cloud, sem custo adicional para o usuário).

### Filtro de Concorrentes (Minas Gerais)

Lista negra de concessionárias concorrentes Foton em MG:
```
- Contauto / Contauto Foton
- Diamantina / Diamantina Foton
- Triama Norte / Triama Norte Foton
- (extensível via tabela no banco)
```

**Regra aplicada no servidor (Edge Function):**
1. Se a notícia menciona MG / Belo Horizonte / Minas Gerais **E** menciona qualquer termo da blacklist → **descartada antes de inserir no banco**
2. Notícias nacionais (sem menção a MG) com esses nomes → mantidas (raras, mas possíveis)
3. Notícias de MG mencionando Lavoro ou Foton sem concorrente → mantidas normalmente

**Implementação:** array `CONCORRENTES_MG` + array `TERMOS_MG` no código da Edge Function. Função `deveDescartar(titulo, snippet)` aplica regex case-insensitive.

**Tabela `clipping_blacklist` (opcional, recomendado):** para o admin gerenciar pelo CRM sem precisar editar código. Campos: `id`, `termo`, `escopo_geografico` ('mg' | 'nacional'), `ativo`.

### Queries de Busca
```
1. "Foton caminhões Brasil"
2. "Lavoro Foton"  
3. "Foton Aumark"
4. "Foton Auman"
5. "Foton Tunland"
```
Cada query roda 1x/dia. Resultados deduplicados por URL antes de inserir.

### Schema (sem mudanças vs plano anterior)
Mesmo `clippings_midia` com `status` (pendente|publicado|rejeitado) + nova tabela `clipping_blacklist`.

### Páginas (sem mudanças)
- `/imprensa` — pública
- `/interno/clipping` — admin (aprovar/rejeitar + gerenciar blacklist)

### Custo Total: R$ 0
- Google News RSS: grátis
- Cron Supabase: incluso no Lovable Cloud
- Edge Functions: incluso no Lovable Cloud
- Storage de thumbnails: usar URL externa direto (sem rehospedar) → grátis

### Próximo passo
Se aprovar, eu: (1) crio migration `clippings_midia` + `clipping_blacklist` populada com os 3 concorrentes, (2) crio Edge Function `buscar-clipping` com parser RSS + filtro, (3) crio cron diário, (4) crio `/imprensa` e `/interno/clipping`.
