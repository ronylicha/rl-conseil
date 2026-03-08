import { LegalLayout } from "@/components/legal/LegalLayout";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Conditions Générales de Vente" };

export default function CGV() {
  return (
    <LegalLayout title="Conditions Générales de Vente" lastUpdated="8 mars 2026">
      <h2>1. Champ d&apos;application</h2>
      <p>Les présentes CGV régissent les prestations de services proposées par RL Conseil, SASU de conseil en direction technique et ingénierie digitale.</p>
      <h2>2. Prestations</h2>
      <p>RL Conseil propose des prestations de direction technique externalisée, développement d&apos;applications, architecture logicielle et conseil en conformité réglementaire (HDS, eIDAS, RGPD, Factur-X).</p>
      <h2>3. Tarification</h2>
      <p>Les tarifs sont communiqués sur devis personnalisé. TVA applicable au taux en vigueur. N° TVA intracommunautaire : FR95101783421</p>
      <h2>4. Modalités de paiement</h2>
      <p>Paiement par virement bancaire à 30 jours date de facture, sauf mention contraire sur le devis.</p>
      <h2>5. Propriété intellectuelle</h2>
      <p>Sauf disposition contraire, le code source développé dans le cadre des prestations est cédé au client après paiement intégral.</p>
      <h2>6. Confidentialité</h2>
      <p>RL Conseil s&apos;engage à la confidentialité des informations communiquées dans le cadre des prestations.</p>
    </LegalLayout>
  );
}
