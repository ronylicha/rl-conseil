interface LegalLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
  return (
    <section className="pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <h1 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-2">
            {title}
          </h1>
          <div className="flex items-center gap-3 mt-3">
            <div className="h-px flex-1 bg-gradient-to-r from-[var(--color-accent)]/30 to-transparent" />
            <p className="text-xs text-[var(--color-text-muted)] shrink-0">
              Mis à jour le {lastUpdated}
            </p>
          </div>
        </div>
        <div className="prose prose-sm max-w-none text-[var(--color-text-muted)] [&_h2]:font-[family-name:var(--font-heading)] [&_h2]:text-[var(--color-text)] [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:pb-2 [&_h2]:border-b [&_h2]:border-[var(--color-border)] [&_h3]:text-[var(--color-text)] [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:mb-4 [&_p]:leading-relaxed [&_ul]:space-y-2 [&_li]:text-[var(--color-text-muted)] [&_a]:text-[var(--color-accent)] [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-[var(--color-accent-dark)] [&_strong]:text-[var(--color-text)]">
          {children}
        </div>
      </div>
    </section>
  );
}
