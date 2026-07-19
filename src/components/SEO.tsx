import { useEffect } from "react";

const SITE_URL = "https://www.lavorofoton.com.br";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-home.png`;

interface SEOProps {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
}

// Aplica os metadados direto no <head> via efeito (sem react-helmet-async: o
// Helmet silenciosamente não aplicava em runtime, então todas as rotas — e o
// prerender inteiro — saíam com o título/descrição da home).
const MARKER = "data-seo-managed";

function upsertMeta(selector: string, create: () => HTMLElement, content: string) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    el.setAttribute(MARKER, "true");
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function metaByName(name: string, content: string) {
  upsertMeta(`meta[name="${name}"]`, () => {
    const m = document.createElement("meta");
    m.setAttribute("name", name);
    return m;
  }, content);
}

function metaByProp(property: string, content: string) {
  upsertMeta(`meta[property="${property}"]`, () => {
    const m = document.createElement("meta");
    m.setAttribute("property", property);
    return m;
  }, content);
}

const SEO = ({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  jsonLd,
  noindex = false,
}: SEOProps) => {
  const fullTitle = title.includes("Lavoro") ? title : `${title} | Lavoro Foton`;
  const canonical = `${SITE_URL}${path}`;
  const jsonLdString = jsonLd ? JSON.stringify(jsonLd) : "";

  useEffect(() => {
    document.title = fullTitle;
    metaByName("description", description);

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      link.setAttribute(MARKER, "true");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonical);

    let robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"][data-seo-managed]');
    if (noindex) {
      if (!robots) {
        robots = document.createElement("meta");
        robots.setAttribute("name", "robots");
        robots.setAttribute(MARKER, "true");
        document.head.appendChild(robots);
      }
      robots.setAttribute("content", "noindex, nofollow");
    } else if (robots) {
      robots.remove();
    }

    metaByProp("og:type", ogType);
    metaByProp("og:title", fullTitle);
    metaByProp("og:description", description);
    metaByProp("og:url", canonical);
    metaByProp("og:image", ogImage);
    metaByProp("og:site_name", "Lavoro Foton");
    metaByProp("og:locale", "pt_BR");

    metaByName("twitter:card", "summary_large_image");
    metaByName("twitter:title", fullTitle);
    metaByName("twitter:description", description);
    metaByName("twitter:image", ogImage);

    // JSON-LD desta rota (remove o da rota anterior antes de inserir)
    document.head
      .querySelectorAll('script[type="application/ld+json"][data-seo-managed]')
      .forEach((s) => s.remove());
    if (jsonLdString) {
      const arr = JSON.parse(jsonLdString);
      (Array.isArray(arr) ? arr : [arr]).forEach((obj: unknown) => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute(MARKER, "true");
        script.textContent = JSON.stringify(obj);
        document.head.appendChild(script);
      });
    }
  }, [fullTitle, description, canonical, ogImage, ogType, jsonLdString, noindex]);

  return null;
};

export default SEO;
