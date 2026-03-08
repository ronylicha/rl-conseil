import { LegalLayout } from "@/components/legal/LegalLayout";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Politique de Confidentialité" };

export default function PolitiqueConfidentialite() {
  return (
    <LegalLayout title="Politique de Confidentialité" lastUpdated="8 mars 2026">
      <h2>1. Responsable du traitement</h2>
      <p>RL Conseil — SASU au capital de 1,00 €, SIREN 101 783 421<br />Rony Licha, Président<br />200 rue de la Croix Nivert, 75015 Paris<br />Email : rony@rlconseil.net</p>
      <h2>2. Données collectées</h2>
      <p>Via le formulaire de contact : nom, email, téléphone (optionnel), entreprise (optionnel), message. Ces données sont collectées avec votre consentement explicite.</p>
      <h2>3. Finalité</h2>
      <p>Vos données sont utilisées exclusivement pour répondre à vos demandes et vous recontacter dans le cadre de votre projet.</p>
      <h2>4. Durée de conservation</h2>
      <p>Vos données sont conservées pendant 3 ans à compter du dernier contact, puis supprimées.</p>
      <h2>5. Vos droits</h2>
      <p>Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification, de suppression et de portabilité de vos données. Contactez-nous à rony@rlconseil.net pour exercer ces droits.</p>
      <h2>6. Cookies</h2>
      <p>Ce site utilise uniquement un cookie technique pour mémoriser votre préférence de thème (clair/sombre). Aucun cookie de suivi ou publicitaire n&apos;est utilisé.</p>
      <h2>7. Hébergement</h2>
      <p>Les données sont hébergées en France par LWS (Ligne Web Services), 10 rue de Penthièvre, 75008 Paris.</p>
    </LegalLayout>
  );
}
