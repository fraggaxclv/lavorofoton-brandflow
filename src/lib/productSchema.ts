/**
 * Schema.org helpers used by <SEO jsonLd={...}> on public pages.
 */

type PropertyTuple = [string, string];

export function buildProductSchema(opts: {
  name: string;
  model: string;
  category: string;
  description: string;
  properties?: PropertyTuple[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: opts.name,
    brand: { "@type": "Brand", name: "Foton" },
    model: opts.model,
    category: opts.category,
    description: opts.description,
    ...(opts.properties && opts.properties.length > 0
      ? {
          additionalProperty: opts.properties.map(([name, value]) => ({
            "@type": "PropertyValue",
            name,
            value,
          })),
        }
      : {}),
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
  } as Record<string, unknown>;
}

export function buildFaqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.answer,
      },
    })),
  } as Record<string, unknown>;
}

export const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  speakable: {
    "@type": "SpeakableSpecification",
    xpath: [
      "/html/head/title",
      "/html/head/meta[@name='description']/@content",
    ],
  },
} as Record<string, unknown>;
