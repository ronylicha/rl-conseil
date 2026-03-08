import type { Metadata } from "next";
import { CvView } from "@/components/cv/CvView";

export const metadata: Metadata = {
  title: "CV Rony Licha — CTO & Full Stack Developer",
  description: "CV de Rony Licha, CTO externalisé et fondateur de RL Conseil. 15+ ans d'expérience, expert Laravel/React/TypeScript, conformité HDS, eIDAS, Factur-X.",
  alternates: { canonical: "https://rlconseil.net/cv" },
  robots: { index: false, follow: true },
};

export default function CvPage() {
  return <CvView />;
}
