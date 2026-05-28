// Edge function: buscar-clipping
// Busca notícias da Foton/Lavoro via Google News RSS (gratuito),
// aplica filtro de concorrentes em MG e insere em clippings_midia.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const QUERIES: { q: string; marca: string }[] = [
  { q: "Foton caminhões Brasil", marca: "foton" },
  { q: "Lavoro Foton", marca: "lavoro" },
  { q: "Foton Aumark", marca: "foton" },
  { q: "Foton Auman", marca: "foton" },
  { q: "Foton Tunland", marca: "foton" },
  { q: "Foton eletrico Brasil", marca: "foton" },
];

const TERMOS_MG = [
  "minas gerais",
  " mg ",
  " mg.",
  ",mg",
  "belo horizonte",
  "contagem",
  "uberlandia",
  "uberlândia",
  "juiz de fora",
  "betim",
  "montes claros",
];

function mencionaMG(texto: string): boolean {
  const t = ` ${texto.toLowerCase()} `;
  return TERMOS_MG.some((m) => t.includes(m));
}

function mencionaTermos(texto: string, termos: string[]): boolean {
  const t = texto.toLowerCase();
  return termos.some((termo) => t.includes(termo.toLowerCase()));
}

// Decodifica entidades HTML básicas
function decodeHtml(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}

function stripTags(html: string): string {
  return decodeHtml(html.replace(/<[^>]+>/g, "")).trim();
}

interface RssItem {
  title: string;
  link: string;
  pubDate?: string;
  description?: string;
  source?: string;
}

function parseRss(xml: string): RssItem[] {
  const items: RssItem[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let m: RegExpExecArray | null;
  while ((m = itemRegex.exec(xml)) !== null) {
    const block = m[1];
    const pick = (tag: string) => {
      const r = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i").exec(
        block,
      );
      if (!r) return undefined;
      return decodeHtml(r[1].replace(/<!\[CDATA\[|\]\]>/g, "")).trim();
    };
    const title = pick("title") ?? "";
    const link = pick("link") ?? "";
    if (!title || !link) continue;
    items.push({
      title,
      link,
      pubDate: pick("pubDate"),
      description: pick("description"),
      source: pick("source"),
    });
  }
  return items;
}

// Resolve URL real do Google News (que redireciona) — vamos fazer um HEAD
async function resolveUrl(url: string): Promise<string> {
  try {
    const r = await fetch(url, {
      method: "GET",
      redirect: "follow",
      headers: { "User-Agent": "Mozilla/5.0 (compatible; LavoroBot/1.0)" },
    });
    return r.url || url;
  } catch {
    return url;
  }
}

// Extrai OG image + dominio
async function extractOg(
  url: string,
): Promise<{ image?: string; domain?: string; description?: string }> {
  try {
    const u = new URL(url);
    const domain = u.hostname.replace(/^www\./, "");
    const r = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; LavoroBot/1.0)" },
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) return { domain };
    const html = await r.text();
    const head = html.slice(0, 50_000);
    const ogImg =
      /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i.exec(
        head,
      )?.[1] ??
      /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i.exec(
        head,
      )?.[1];
    const ogDesc =
      /<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i.exec(
        head,
      )?.[1] ??
      /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i.exec(
        head,
      )?.[1];
    return {
      image: ogImg ? new URL(ogImg, url).toString() : undefined,
      domain,
      description: ogDesc ? decodeHtml(ogDesc) : undefined,
    };
  } catch {
    try {
      return { domain: new URL(url).hostname.replace(/^www\./, "") };
    } catch {
      return {};
    }
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, serviceKey);

  try {
    // Carrega blacklist
    const { data: blacklist } = await supabase
      .from("clipping_blacklist")
      .select("termo, escopo_geografico")
      .eq("ativo", true);

    const termosMG: string[] = (blacklist ?? [])
      .filter((b: any) => b.escopo_geografico === "mg")
      .map((b: any) => b.termo);
    const termosNacionais: string[] = (blacklist ?? [])
      .filter((b: any) => b.escopo_geografico === "nacional")
      .map((b: any) => b.termo);

    let totalFound = 0;
    let totalInserted = 0;
    let totalFiltered = 0;
    let totalDuplicates = 0;

    for (const { q, marca } of QUERIES) {
      const rssUrl =
        `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=pt-BR&gl=BR&ceid=BR:pt-419`;
      const res = await fetch(rssUrl);
      if (!res.ok) continue;
      const xml = await res.text();
      const items = parseRss(xml);
      totalFound += items.length;

      for (const item of items.slice(0, 15)) {
        const tituloLimpo = stripTags(item.title);
        const descLimpa = item.description ? stripTags(item.description) : "";
        const textoCompleto = `${tituloLimpo} ${descLimpa}`;

        // Filtro: nacional sempre
        if (mencionaTermos(textoCompleto, termosNacionais)) {
          totalFiltered++;
          continue;
        }

        // Filtro: MG + concorrente
        if (mencionaMG(textoCompleto) && mencionaTermos(textoCompleto, termosMG)) {
          totalFiltered++;
          continue;
        }

        // Resolve URL real (Google News redireciona)
        const realUrl = await resolveUrl(item.link);

        // Re-check após resolver (URL às vezes traz domínio de concorrente)
        const urlLower = realUrl.toLowerCase();
        if (termosMG.some((t) => urlLower.includes(t.toLowerCase().replace(/\s/g, "")))) {
          totalFiltered++;
          continue;
        }

        // Dedup
        const { data: exists } = await supabase
          .from("clippings_midia")
          .select("id")
          .eq("url", realUrl)
          .maybeSingle();
        if (exists) {
          totalDuplicates++;
          continue;
        }

        const og = await extractOg(realUrl);
        const ehVideo = /youtube\.com|youtu\.be/.test(realUrl);

        const { error: insErr } = await supabase
          .from("clippings_midia")
          .insert({
            url: realUrl,
            titulo: tituloLimpo,
            resumo: og.description || descLimpa || null,
            thumbnail_url: og.image || null,
            veiculo_nome: item.source || og.domain || null,
            veiculo_dominio: og.domain || null,
            tipo: ehVideo ? "video" : "noticia",
            marca,
            data_publicacao: item.pubDate
              ? new Date(item.pubDate).toISOString()
              : null,
            status: "pendente",
            fonte_descoberta: "google_news_rss",
            query_busca: q,
          });

        if (!insErr) totalInserted++;
      }
    }

    return new Response(
      JSON.stringify({
        ok: true,
        found: totalFound,
        inserted: totalInserted,
        filtered: totalFiltered,
        duplicates: totalDuplicates,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("buscar-clipping error", e);
    return new Response(
      JSON.stringify({ ok: false, error: (e as Error).message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
