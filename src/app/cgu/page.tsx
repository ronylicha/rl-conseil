import { LegalLayout } from "@/components/legal/LegalLayout";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Conditions Générales d'Utilisation" };

export default function CGU() {
  return (
    <LegalLayout title="Conditions Générales d'Utilisation" lastUpdated="8 mars 2026">
      <h2>1. Objet</h2>
      <p>Les présentes CGU définissent les conditions d&apos;accès et d&apos;utilisation du site rlconseil.net.</p>
      <h2>2. Accès au site</h2>
      <p>Le site est accessible gratuitement à tout utilisateur disposant d&apos;un accès Internet. Les frais liés à l&apos;accès au site sont à la charge de l&apos;utilisateur.</p>
      <h2>3. Propriété intellectuelle</h2>
      <p>Tous les éléments du site sont protégés par le droit de la propriété intellectuelle. Toute utilisation non autorisée est constitutive de contrefaçon.</p>
      <h2>4. Données personnelles</h2>
      <p>Le traitement des données personnelles est décrit dans notre politique de confidentialité.</p>
      <h2>5. Droit applicable</h2>
      <p>Les présentes CGU sont soumises au droit français. Tout litige sera porté devant les tribunaux compétents de Paris.</p>
    </LegalLayout>
  );
}
