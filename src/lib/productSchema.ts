/**
 * Builds a Schema.org Product JSON-LD object for Foton model pages.
 * Consumed by <SEO jsonLd={...}> on each /modelos/* route.
 */
export function buildProductSchema(opts: {
  name: string;
  model: string;
  category: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: opts.name,
    brand: { "@type": "Brand", name: "Foton" },
    model: opts.model,
    category: opts.category,
    description: opts.description,
    offers: {
      "@type": "Offer",
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "AutoDealer",
        name: "Lavoro Foton",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Contagem",
          addressRegion: "MG",
          addressCountry: "BR",
        },
      },
    },
  } as const;
}
