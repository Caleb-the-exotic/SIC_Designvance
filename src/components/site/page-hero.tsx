import type { ReactNode } from "react";

export function PageHero({
  label,
  title,
  description,
  children,
}: {
  label: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="blueprint-grid relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="mx-auto max-w-7xl px-5 py-16 md:py-24">
        <p className="tech-label rise-in">{label}</p>
        <h1 className="rise-in mt-4 max-w-3xl text-4xl font-bold leading-[1.05] md:text-6xl">
          {title}
        </h1>
        <p className="rise-in mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>
        {children}
      </div>
    </section>
  );
}