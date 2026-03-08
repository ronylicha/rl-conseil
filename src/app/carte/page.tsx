import type { Metadata } from "next";
import { BusinessCard } from "@/components/carte/BusinessCard";

export const metadata: Metadata = {
  title: "Carte de Visite",
  description: "Carte de visite digitale de Rony Licha, CTO & Fondateur RL Conseil.",
};

export default function CartePage() {
  return <BusinessCard />;
}
