import type { Metadata } from "next";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Échangeons sur votre projet technique",
  description: "Planifiez un échange gratuit de 30 minutes avec RL Conseil. CTO externalisé, architecture SaaS, conformité HDS/eIDAS/Factur-X. Réponse sous 24h.",
  alternates: { canonical: "https://rlconseil.net/contact" },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://rlconseil.net" },
          { name: "Contact", url: "https://rlconseil.net/contact" },
        ]}
      />
      <FaqJsonLd
        faqs={[
          {
            q: "Quel est votre délai de réponse ?",
            a: "Nous nous engageons à répondre sous 24 heures ouvrées.",
          },
          {
            q: "Le premier échange est-il payant ?",
            a: "Non. Les 30 premières minutes sont offertes et sans engagement.",
          },
          {
            q: "Intervenez-vous uniquement à Paris ?",
            a: "Nous travaillons en 100% remote pour des clients en France et à l'international.",
          },
          {
            q: "Quelles technologies maîtrisez-vous ?",
            a: "Laravel 12, React/Next.js, TypeScript, PostgreSQL, Redis, Docker, AWS.",
          },
        ]}
      />
      <ContactHero />
      <ContactForm />
    </>
  );
}
