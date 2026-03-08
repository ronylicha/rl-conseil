import { LegalLayout } from "@/components/legal/LegalLayout";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Mentions légales" };

export default function MentionsLegales() {
  return (
    <LegalLayout title="Mentions Légales" lastUpdated="8 mars 2026">
      <h2>Éditeur du site</h2>
      <p>
        <strong>RL Conseil</strong> — SASU au capital de 1,00 €<br />
        SIREN : 101 783 421<br />
        SIRET : 101 783 421 00015<br />
        RCS Paris : 101 783 421<br />
        N° TVA : FR95101783421<br />
        Code NAF : 62.02A — Conseil en systèmes et logiciels informatiques<br />
        <br />
        Siège social : 200 rue de la Croix Nivert, 75015 Paris<br />
        Dirigeant : Rony Licha, Président<br />
        Email : rony@rlconseil.net<br />
        Téléphone : +33 7 67 98 71 76
      </p>
      <h2>Hébergement</h2>
      <p>Ce site est hébergé par LWS (Ligne Web Services)<br />10 rue de Penthièvre, 75008 Paris, France</p>
      <h2>Propriété intellectuelle</h2>
      <p>L&apos;ensemble du contenu de ce site (textes, images, logos, graphismes) est la propriété exclusive de RL Conseil, sauf mention contraire. Toute reproduction, même partielle, est interdite sans autorisation préalable.</p>
      <h2>Responsabilité</h2>
      <p>RL Conseil s&apos;efforce d&apos;assurer l&apos;exactitude des informations diffusées sur ce site. Toutefois, RL Conseil ne peut garantir l&apos;exactitude, la complétude ou l&apos;actualité de ces informations.</p>
    </LegalLayout>
  );
}
