import type { Metadata } from "next";
import { ParcourseTimeline } from "@/components/parcours/ParcourseTimeline";
import { ParcourseHero } from "@/components/parcours/ParcourseHero";
import { EducationSection } from "@/components/parcours/EducationSection";
import { CtaSection } from "@/components/home/CtaSection";

export const metadata: Metadata = {
  title: "Parcours",
  description: "15 ans de direction technique, d'entrepreneuriat et de projets livrés en production.",
};

export default function ParcoursPage() {
  return (
    <>
      <ParcourseHero />
      <ParcourseTimeline />
      <EducationSection />
      <CtaSection />
    </>
  );
}
