## Objetivo

Remover os accordions (clique-pra-abrir) da seção "Ficha Técnica Completa" nas páginas de modelos e substituir por um **grid sempre aberto** em 2 colunas, estilo datasheet de montadora premium (Tesla / Mercedes-Benz). Zero cliques, máxima leitura, visual limpo.

## Padrão visual da nova ficha

```text
┌──────────────────────────────────────────────────────────────┐
│  FICHA TÉCNICA COMPLETA                                      │
│  Todas as especificações técnicas do Foton Aumark 1217       │
└──────────────────────────────────────────────────────────────┘

┌─ 🔧 MOTOR E DESEMPENHO ──────────────────────────────────────┐
│  Fabricante/Modelo ················ Cummins ISF 3.8          │
│  Cilindros/Cilindrada ············· 4 / 3.760 cm³            │
│  Potência Máxima ·················· 170 cv @ 2.600 rpm       │
│  Torque Máximo ···················· 600 Nm @ 1.200-1.900 rpm │
│  (...)                                                       │
└──────────────────────────────────────────────────────────────┘

┌─ ⭐ DIFERENCIAIS TÉCNICOS ───────────────────────────────────┐
│  (renderizado aberto, idem)                                  │
└──────────────────────────────────────────────────────────────┘

(... todas as 7 seções renderizadas abertas, uma abaixo da outra)
```

### Especificação visual
- Cada seção vira um **card branco** (`bg-white`, `border`, `rounded-xl`, `shadow-sm`).
- Cabeçalho da seção: ícone + título em uppercase tracking-wide, barra horizontal sutil abaixo.
- Conteúdo: grid `md:grid-cols-2 gap-x-8 gap-y-2`, linhas com label à esquerda (muted) e valor à direita em medium/semibold, divisor `border-b border-border/40` entre linhas.
- Sem `<Accordion>`, sem `<AccordionTrigger>`, sem chevron.
- Espaçamento entre cards: `space-y-6`.
- Largura: mantém `max-w-4xl mx-auto` (igual hoje).

### Mobile
- Em mobile (<768px) grid colapsa pra 1 coluna automaticamente — labels ficam acima dos valores ou empilhados (`flex justify-between` continua funcionando, igual hoje).

## Escopo de arquivos

10 páginas de modelos que hoje usam `<Accordion>` na ficha técnica:

- `src/pages/models/Foton1217.tsx`
- `src/pages/models/Foton7T.tsx`
- `src/pages/models/Foton9T.tsx`
- `src/pages/models/Foton17T.tsx`
- `src/pages/models/S315.tsx`
- `src/pages/models/AumanD1830.tsx`
- `src/pages/models/AumanD2632.tsx`
- `src/pages/models/EWonder.tsx`
- `src/pages/models/EToano.tsx`
- `src/pages/models/EView.tsx` (verificar — outras EView/EAumark se aplicável)

Em cada arquivo: substituir o bloco `<Accordion type="single" collapsible>...</Accordion>` por uma lista de cards `<section>` sempre abertos. Remover imports `Accordion*` não utilizados.

**Conteúdo (textos, labels, valores) permanece idêntico.** Mudança é puramente apresentacional.

## Não-escopo

- Não alterar textos, ordem de seções, nem dados técnicos.
- Não mexer em outras seções da página (hero, comparativos, CTA, SEO/JSON-LD).
- Não tocar em landing pages de tráfego (`/trafego/*`) — só `/modelos/*`.
- Não criar componente compartilhado novo (mudança inline em cada página, mantém padrão atual do projeto).

## Resultado esperado

Comprador técnico abre a página, rola até "Ficha Técnica" e **vê tudo de uma vez** — comparável a um datasheet PDF. Zero fricção, percepção de transparência e profissionalismo.
