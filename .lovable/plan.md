
# Pré-render estático das páginas públicas Lavoro Foton

## Objetivo

Fazer com que o site Lavoro entregue HTML pronto (com todo o texto, títulos e meta tags já dentro) para Google, ChatGPT, Perplexity, LinkedIn, WhatsApp e scrapers de inteligência de mercado — sem mudar nada do que o visitante humano vê e sem mexer no CRM `/interno`.

## O que muda na prática

- **Para o visitante humano:** nada. O site continua igual, mesma navegação, mesmas animações.
- **Para robôs e IAs:** ao pedir qualquer página pública, recebem o HTML completo com textos dos caminhões, calculadoras, comparativos, FAQ, etc. — sem precisar executar JavaScript.
- **Para SEO:** Google indexa mais rápido e dá mais peso. Links colados em WhatsApp/LinkedIn mostram preview rico. IAs conseguem citar a Lavoro quando alguém perguntar sobre Foton em BH.
- **Para o CRM `/interno`:** zero impacto. Continua sendo SPA dinâmico autenticado, como hoje.

## Como funciona (em linguagem simples)

Hoje, quando o Lovable publica o site, ele gera **um único** `index.html` vazio que serve para todas as rotas. O conteúdo só aparece quando o JavaScript roda no navegador.

Com pré-render, no momento do build (publicação), uma ferramenta abre cada página pública num navegador invisível, espera o conteúdo aparecer, e salva um arquivo HTML completo para cada rota:

```
dist/
├── index.html                              (home com todo conteúdo dentro)
├── modelos/aumark-1217/index.html          (página completa do 1217)
├── calculadora/index.html                  (calculadora TCO)
├── imprensa/index.html                     (clipping)
└── ... uma pasta por rota pública
```

Quando um robô pede `lavorofoton.com.br/modelos/aumark-1217`, o servidor entrega o HTML pronto. Quando um humano clica, o React assume o controle normalmente.

## Escopo das rotas pré-renderizadas

**Incluir (públicas, institucionais, conversão):**

- `/` (HomeV2)
- `/quem-somos`, `/sobre-foton`, `/servicos`, `/contato`
- `/modelos` e todas as 16 páginas de modelos (`/modelos/aumark-s315`, `/modelos/aumark-1217`, `/modelos/ewonder`, etc.)
- `/calculadora`, `/calculadora-tco`, `/calculadora-2`, `/calculadora-roi`
- `/comparativo-aumark-1217`, `/comparativo-ewonder`
- `/imprensa`
- `/eletricos-beneficios`, `/eletricos-beneficios-2`

**Excluir (não devem ser indexadas):**

- `/interno/*` — CRM autenticado
- `/pedido-faturamento-lavoro`, `/proposta-comercial-lavoro` — formulários internos
- `/admin/*` — área administrativa
- `/home-trafego` e variantes `-trafego` — páginas de anúncio pago, já tem rastreio próprio

## Implementação técnica

**Stack:** `vite-plugin-prerender-spa` (mantido, compatível com Vite 5, usa Puppeteer headless).

**Mudanças:**

1. `bun add -D vite-plugin-prerender-spa puppeteer`
2. Editar `vite.config.ts` adicionando o plugin com lista explícita de rotas a pré-renderizar (lista acima).
3. Adicionar `react-helmet-async` (caso ainda não esteja instalado) e envelopar cada página pública com `<Helmet>` definindo `<title>`, `<meta description>`, `<meta og:*>` e `<link rel="canonical">` específicos. Hoje todas as páginas herdam o mesmo head do `index.html` — esse é o passo que dá ganho real de SEO por página.
4. Atualizar `public/robots.txt` mantendo `Disallow: /interno/`, `Disallow: /admin/`, `Disallow: /pedido-faturamento-lavoro`, etc.
5. Gerar `public/sitemap.xml` listando só as rotas pré-renderizadas.

**Riscos e mitigações:**

- **Build mais lento:** publicar pode levar ~1-2 min a mais (Puppeteer renderiza cada rota). Aceitável.
- **Páginas que dependem de dados do Supabase em tempo de carregamento** (ex: `/imprensa` puxa clippings): pré-renderizamos o "esqueleto" com SEO básico; os dados continuam carregando dinamicamente após hidratar. O Google ainda vê o título e descrição corretos.
- **Calculadoras com estado:** mesma coisa, estado interativo continua client-side; SEO pega só o conteúdo institucional da página.

## Entrega

Em um único loop de build:

1. Instalar dependências
2. Configurar `vite.config.ts` com pré-render apenas das rotas públicas
3. Adicionar `<Helmet>` com title/description/canonical/og em cada uma das ~25 páginas públicas (a maior parte do trabalho)
4. Atualizar `robots.txt` e criar `sitemap.xml`
5. Publicar e validar com `curl` em 3-4 rotas que o HTML retornado já contém o conteúdo

## O que NÃO está incluído neste plano

- Migração para TanStack Start (caminho B que recusamos)
- Internacionalização ou novos idiomas
- Alteração de design ou conteúdo das páginas
- Mudanças no CRM `/interno`
- Conexão das fontes reais do dashboard Central de Tráfego (segue paralelo, fase posterior)

## Pós-implementação — como você valida

1. Abrir terminal e rodar `curl https://lavorofoton.com.br/modelos/aumark-1217` — deve ver texto do caminhão no HTML, não só `<div id="root">`.
2. Colar o link no WhatsApp ou LinkedIn — preview deve mostrar título e descrição corretos da página específica (não o título genérico da home).
3. Em 1-2 semanas, repetir o relatório Semrush — esperar mais keywords ranqueadas das páginas de modelos.
