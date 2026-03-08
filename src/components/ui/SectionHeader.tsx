import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  badge,
  title,
  highlight,
  subtitle,
  className,
  align = "center",
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {badge && (
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase border border-[var(--color-border)] text-[var(--color-accent)] mb-4 font-[family-name:var(--font-sub)]">
          {badge}
        </span>
      )}
      <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold text-[var(--color-text)] leading-tight">
        {title}
        {highlight && <span className="text-gradient"> {highlight}</span>}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
