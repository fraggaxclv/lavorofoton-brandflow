import { Helmet } from "react-helmet-async";

const SITE_URL = "https://lavorofoton.com.br";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-home.png`;

interface SEOProps {
  /** Page title — recommend <60 chars, will be suffixed with brand */
  title: string;
  /** Meta description — recommend <160 chars */
  description: string;
  /** Path part only, e.g. "/modelos/aumark-1217" — will be combined with SITE_URL */
  path: string;
  /** Optional og:image absolute URL. Falls back to og-home.png */
  ogImage?: string;
  /** OpenGraph type — "website" (default), "article", "product" */
  ogType?: "website" | "article" | "product";
  /** Optional JSON-LD object — will be JSON.stringify'd */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** Set to true to add noindex (use only for admin/internal pages) */
  noindex?: boolean;
}

/**
 * Per-page SEO component. Drop one at the top of each public route to
 * give crawlers (Google, ChatGPT, LinkedIn, WhatsApp) per-page title,
 * description, canonical and OpenGraph tags.
 *
 * The brand suffix " | Lavoro Foton" is added automatically — pass only
 * the unique part as `title`.
 */
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

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Lavoro Foton" />
      <meta property="og:locale" content="pt_BR" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
