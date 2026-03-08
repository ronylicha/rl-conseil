import type { Metadata } from "next";
import { BusinessCard } from "@/components/carte/BusinessCard";

export const metadata: Metadata = {
  title: "Carte de Visite — Rony Licha, CTO & Fondateur",
  description: "Carte de visite digitale de Rony Licha, CTO & fondateur de RL Conseil. Téléchargez le contact ou scannez le QR code.",
  alternates: { canonical: "https://rlconseil.net/carte" },
  robots: { index: false, follow: true },
};

export default function CartePage() {
  return <BusinessCard />;
}
