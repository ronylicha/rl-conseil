import { siteConfig } from "@/data/site-config";

export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.svg`,
    image: `${siteConfig.url}/og-image.jpg`,
    description: "Direction technique externalisée, architecture SaaS, conformité réglementaire (HDS, eIDAS, RGPD, Factur-X) et développement full stack.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "200 rue de la Croix Nivert",
      addressLocality: "Paris",
      postalCode: "75015",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 48.8396,
      longitude: 2.2940,
    },
    telephone: siteConfig.founder.phone,
    email: siteConfig.founder.email,
    founder: {
      "@type": "Person",
      name: siteConfig.founder.name,
      jobTitle: siteConfig.founder.title,
      url: siteConfig.url,
    },
    sameAs: [
      siteConfig.social.linkedin,
      siteConfig.social.github,
      siteConfig.social.twitter,
    ],
    priceRange: "€€€",
    areaServed: {
      "@type": "Country",
      name: "France",
    },
    serviceType: [
      "CTO externalisé",
      "Architecture logicielle",
      "Développement d'applications SaaS",
      "Conformité HDS",
      "Signature électronique eIDAS",
      "Facturation électronique Factur-X",
    ],
    knowsAbout: [
      "Laravel", "React", "Next.js", "TypeScript", "PostgreSQL",
      "Docker", "AWS", "Google Cloud", "HDS", "eIDAS", "RGPD", "Factur-X",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function FaqJsonLd({ faqs }: { faqs: { q: string; a: string }[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
