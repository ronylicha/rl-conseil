"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Globe, MapPin, Download, Share2, Linkedin, Github, Twitter, RotateCcw } from "lucide-react";
import { siteConfig } from "@/data/site-config";

export function BusinessCard() {
  const [flipped, setFlipped] = useState(false);

  const downloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${siteConfig.founder.name}
N:Licha;Rony;;;
TITLE:${siteConfig.founder.title}
ORG:${siteConfig.name}
EMAIL:${siteConfig.founder.email}
TEL;TYPE=CELL:${siteConfig.founder.phone.replace(/\s/g, '')}
URL:${siteConfig.url}
ADR;TYPE=WORK:;;${siteConfig.address}
END:VCARD`;
    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "rony-licha.vcf";
    a.click();
    URL.revokeObjectURL(url);
  };

  const share = async () => {
    if (navigator.share) {
      await navigator.share({ title: siteConfig.name, url: siteConfig.url });
    } else {
      await navigator.clipboard.writeText(siteConfig.url);
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-6 relative overflow-hidden">
      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-accent)]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[var(--color-accent)]/3 rounded-full blur-3xl" />

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-2 text-center"
      >
        Carte de <span className="text-gradient-animated">Visite</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-[var(--color-text-muted)] mb-10 text-center flex items-center gap-2"
      >
        <RotateCcw size={14} className="text-[var(--color-accent)]" />
        Cliquez pour retourner la carte
      </motion.p>

      {/* 3D Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="w-[420px] max-w-full h-[240px] cursor-pointer"
        style={{ perspective: "1200px" }}
        onClick={() => setFlipped(!flipped)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setFlipped(!flipped)}
        aria-label="Retourner la carte de visite"
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 80, damping: 15 }}
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 rounded-2xl p-7 flex gap-5 overflow-hidden shadow-2xl shadow-black/20"
            style={{ backfaceVisibility: "hidden", background: "linear-gradient(145deg, #0d1117, #1c2128)" }}
          >
            {/* Accent line on left */}
            <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full bg-gradient-to-b from-transparent via-[#be3c5a] to-transparent" />

            <div className="flex flex-col justify-between flex-1 pl-3">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <img src="/profile-photo.jpg" alt="Rony Licha" className="w-12 h-12 rounded-full border-2 border-[#be3c5a]/30 object-cover" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                      <span className="text-[9px] text-[#10b981] font-medium uppercase tracking-wider">Disponible</span>
                    </div>
                    <h2 className="text-lg font-bold text-[#f0ece4] font-[family-name:var(--font-heading)]">{siteConfig.founder.name}</h2>
                    <p className="text-[10px] text-[#f0ece4]/50 font-[family-name:var(--font-sub)] tracking-wider uppercase">{siteConfig.founder.title}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                {[
                  { icon: Mail, text: siteConfig.founder.email },
                  { icon: Phone, text: siteConfig.founder.phoneDisplay },
                  { icon: Globe, text: "rlconseil.net" },
                  { icon: MapPin, text: siteConfig.founder.location },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2.5 text-[10px] text-[#f0ece4]/70">
                    <Icon size={11} className="text-[#be3c5a]" />
                    {text}
                  </div>
                ))}
              </div>
            </div>

            {/* RL branding watermark */}
            <div className="absolute right-4 top-4 opacity-[0.04] font-[family-name:var(--font-heading)] text-7xl font-bold text-[#f0ece4]">
              RL
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 rounded-2xl p-7 flex flex-col items-center justify-center shadow-2xl shadow-black/20"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", background: "linear-gradient(145deg, #faf9f6, #f0ece4)" }}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#be3c5a] to-transparent" />
            <div className="flex items-center gap-3 mb-4">
              <span className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[#0d1117]">RL</span>
              <span className="w-px h-8 bg-[#be3c5a]" />
              <span className="font-[family-name:var(--font-sub)] text-sm tracking-widest text-[#0d1117]/60">Conseil</span>
            </div>
            <p className="text-[9px] text-[#0d1117]/40 tracking-[0.2em] uppercase font-[family-name:var(--font-body)] mb-4">
              {siteConfig.tagline}
            </p>
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`BEGIN:VCARD\nVERSION:3.0\nFN:${siteConfig.founder.name}\nN:Licha;Rony;;;\nTITLE:${siteConfig.founder.title}\nORG:${siteConfig.name}\nEMAIL:${siteConfig.founder.email}\nTEL;TYPE=CELL:${siteConfig.founder.phone.replace(/\s/g, '')}\nURL:${siteConfig.url}\nADR;TYPE=WORK:;;${siteConfig.address}\nEND:VCARD`)}&color=0d1117&bgcolor=ffffff`}
                alt="QR Code vCard"
                width={80}
                height={80}
              />
            </div>
            <p className="text-[8px] text-[#0d1117]/40 mt-2">Scannez pour enregistrer le contact</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Actions with stagger */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap justify-center gap-3 mt-10"
      >
        <button
          onClick={downloadVCard}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-white rounded-xl text-sm font-medium hover:bg-[var(--color-accent-dark)] hover:shadow-lg hover:shadow-[var(--color-accent)]/20 transition-all cursor-pointer"
        >
          <Download size={16} /> Ajouter aux contacts
        </button>
        <button
          onClick={share}
          className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-border)] text-[var(--color-text)] rounded-xl text-sm font-medium hover:bg-[var(--color-surface)] hover:border-[var(--color-accent)]/30 transition-all cursor-pointer"
        >
          <Share2 size={16} /> Partager
        </button>
      </motion.div>

      {/* Social with hover glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex gap-3 mt-6"
      >
        {[
          { icon: Linkedin, href: siteConfig.social.linkedin },
          { icon: Github, href: siteConfig.social.github },
          { icon: Twitter, href: siteConfig.social.twitter },
        ].map(({ icon: Icon, href }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)]/30 hover:shadow-md hover:shadow-[var(--color-accent)]/10 hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <Icon size={18} />
          </a>
        ))}
      </motion.div>
    </section>
  );
}
