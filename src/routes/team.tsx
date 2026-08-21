import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/page-hero";
import { team } from "@/data/site";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Our Team — INTEGRIS Design Wing" },
      {
        name: "description",
        content:
          "Meet the designers, analysts and makers behind INTEGRIS, the Design Wing of the Student Innovation Club.",
      },
      { property: "og:title", content: "Our Team — INTEGRIS" },
      {
        property: "og:description",
        content: "The engineers leading structural design, FEA and prototyping at INTEGRIS.",
      },
    ],
  }),
  component: Team,
});

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
}

function Team() {
  return (
    <>
      <PageHero
        label="Our Team"
        title="The people behind the analysis"
        description="A compact team of student engineers covering design, simulation, materials testing and prototyping."
      />

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <article
              key={m.name}
              className="hover-lift group relative overflow-hidden rounded-sm border border-border bg-card p-6"
            >
              <span className="absolute right-0 top-0 h-16 w-16 border-b border-l border-border/70 [clip-path:polygon(100%_0,100%_100%,0_0)] bg-primary/10" />
              {m.photo ? (
                <img
                  src={m.photo}
                  alt={m.name}
                  width={96}
                  height={96}
                  loading="lazy"
                  className="h-24 w-24 rounded-sm object-cover"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-sm border border-primary/40 bg-secondary font-display text-2xl font-bold text-primary">
                  {initials(m.name)}
                </div>
              )}
              <h2 className="mt-6 text-lg font-semibold">{m.name}</h2>
              <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-primary">
                {m.role}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.bio}</p>
            </article>
          ))}
        </div>

        <p className="mt-10 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
          Roster grows each semester — new members are added to this grid.
        </p>
      </section>
    </>
  );
}