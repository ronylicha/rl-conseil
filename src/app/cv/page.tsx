import type { Metadata } from "next";
import { CvView } from "@/components/cv/CvView";

export const metadata: Metadata = {
  title: "CV",
  description: "CV de Rony Licha - CTO & Full Stack Developer, 15+ ans d'expérience.",
};

export default function CvPage() {
  return <CvView />;
}
