import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { ParcourseTimeline } from "@/components/parcours/ParcourseTimeline";
import { ParcourseHero } from "@/components/parcours/ParcourseHero";
import { EducationSection } from "@/components/parcours/EducationSection";
import { CtaSection } from "@/components/home/CtaSection";

export const metadata: Metadata = {
  title: "Parcours — 15 ans de Direction Technique & Entrepreneuriat",
  description: "De la création d'une agence digitale à Jérusalem à la direction technique de 10 applications SaaS à Paris. Découvrez le parcours de Rony Licha, CTO & fondateur de RL Conseil.",
  alternates: { canonical: "https://rlconseil.net/parcours" },
};

export default function ParcoursPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://rlconseil.net" },
          { name: "Parcours", url: "https://rlconseil.net/parcours" },
        ]}
      />
      <ParcourseHero />
      <ParcourseTimeline />
      <EducationSection />
      <CtaSection />
    </>
  );
}
