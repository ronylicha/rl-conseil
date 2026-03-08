interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <section className="pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-2">
          {title}
        </h1>
        <p className="text-sm text-[var(--color-text-muted)] mb-12">
          Dernière mise à jour : {lastUpdated}
        </p>
        <div className="prose prose-sm max-w-none text-[var(--color-text-muted)] [&_h2]:font-[family-name:var(--font-heading)] [&_h2]:text-[var(--color-text)] [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-[var(--color-text)] [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:mb-4 [&_p]:leading-relaxed [&_ul]:space-y-2 [&_li]:text-[var(--color-text-muted)] [&_a]:text-[var(--color-accent)] [&_a]:underline">
          {children}
        </div>
      </div>
    </section>
  );
}
