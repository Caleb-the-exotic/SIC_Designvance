import { createFileRoute } from "@tanstack/react-router";
import { Crown } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { leadership, members, mentor } from "@/data/site";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Our Team — Designvance Design Wing" },
      {
        name: "description",
        content:
          "Meet the designers, analysts and makers behind Designvance, the Design Wing of the Student Innovation Club.",
      },
      { property: "og:title", content: "Our Team — Designvance" },
      {
        property: "og:description",
        content: "The engineers leading structural design, FEA and prototyping at Designvance.",
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
        description="A dedicated team of student engineers covering design, simulation, materials testing and prototyping."
      />

      <div className="mx-auto max-w-7xl px-5 py-16 md:py-20 space-y-20">
        {/* Tier 1: Leadership (Dharineesh & Anish Kumar in a single line) */}
        <section>
          <div className="mb-10 text-center">
            <h2 className="font-yellowtail text-3xl sm:text-4xl md:text-5xl text-foreground" style={{ wordSpacing: "0.3em" }}>
              Team Leadership
            </h2>
          </div>

          <div className="grid gap-12 sm:grid-cols-2 max-w-3xl mx-auto">
            {leadership.map((m) => {
              const imageNode = (
                <div className="rounded-full p-1.5 bg-gradient-to-tr from-primary/80 via-border to-primary/40 shadow-xl transition-transform duration-300 group-hover:scale-105">
                  {m.photo ? (
                    <img
                      src={m.photo}
                      alt={m.name}
                      width={180}
                      height={180}
                      loading="lazy"
                      className="h-40 w-40 sm:h-48 sm:w-48 rounded-full object-cover object-top shadow-inner"
                    />
                  ) : (
                    <div className="flex h-40 w-40 sm:h-48 sm:w-48 items-center justify-center rounded-full bg-secondary font-display text-4xl font-bold text-primary">
                      {initials(m.name)}
                    </div>
                  )}
                </div>
              );

              return (
                <div
                  key={m.name}
                  className="group flex flex-col items-center text-center"
                >
                  {m.linkedin ? (
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative block cursor-pointer transition-opacity hover:opacity-90"
                      title={`View ${m.name}'s LinkedIn`}
                    >
                      {imageNode}
                    </a>
                  ) : (
                    <div className="relative">{imageNode}</div>
                  )}

                  <h3 className="mt-6 text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{m.name}</h3>
                  <p className="mt-1.5 font-mono text-sm sm:text-base font-semibold uppercase tracking-[0.16em] text-primary">
                    {m.role}
                  </p>
                  <p className="mt-2 font-mono text-sm sm:text-base text-muted-foreground">
                    {m.department}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Tier 2: Team Members (4 members) */}
        <section>
          <div className="mb-12 text-center">
            <h2 className="font-yellowtail text-3xl sm:text-4xl md:text-5xl text-foreground" style={{ wordSpacing: "0.3em" }}>
              Team Members
            </h2>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
            {members.map((m) => {
              const imageNode = (
                <div className="rounded-full p-1.5 border-2 border-border/80 group-hover:border-primary/60 transition-all duration-300 shadow-lg group-hover:scale-105">
                  {m.photo ? (
                    <img
                      src={m.photo}
                      alt={m.name}
                      width={180}
                      height={180}
                      loading="lazy"
                      className="h-40 w-40 sm:h-48 sm:w-48 rounded-full object-cover object-top shadow-inner"
                    />
                  ) : (
                    <div className="flex h-40 w-40 sm:h-48 sm:w-48 items-center justify-center rounded-full bg-secondary font-display text-4xl font-bold text-primary">
                      {initials(m.name)}
                    </div>
                  )}
                </div>
              );

              return (
                <div
                  key={m.name}
                  className="group flex flex-col items-center text-center"
                >
                  {m.linkedin ? (
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block cursor-pointer transition-opacity hover:opacity-90"
                      title={`View ${m.name}'s LinkedIn`}
                    >
                      {imageNode}
                    </a>
                  ) : (
                    <div>{imageNode}</div>
                  )}

                  <h3 className="mt-6 text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{m.name}</h3>
                  <p className="mt-1.5 font-mono text-sm sm:text-base font-semibold uppercase tracking-[0.16em] text-primary">
                    {m.role}
                  </p>
                  <p className="mt-2 font-mono text-sm sm:text-base text-muted-foreground">
                    {m.department}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Tier 3: Mentor / The hero behind it all */}
        <section className="relative border-t border-border/60 pt-16">
          <div className="relative mx-auto flex max-w-xl flex-col items-center text-center">
            <h2 className="font-yellowtail text-4xl sm:text-5xl md:text-6xl text-foreground">
              The hero behind it all
            </h2>

            {/* Crown positioned above image */}
            <div className="relative mt-8 flex flex-col items-center">
              <div className="mb-2 flex items-center justify-center">
                <Crown
                  className="h-10 w-10 text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.85)] animate-bounce"
                  strokeWidth={2.2}
                />
              </div>

              {/* PTS Circular Image Container */}
              {mentor.linkedin ? (
                <a
                  href={mentor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block cursor-pointer transition-transform duration-300 hover:scale-105"
                  title={`View ${mentor.name}'s LinkedIn`}
                >
                  <div className="rounded-full p-1.5 border-2 border-border/80">
                    {mentor.photo ? (
                      <img
                        src={mentor.photo}
                        alt={mentor.name}
                        width={200}
                        height={200}
                        loading="lazy"
                        className="h-44 w-44 sm:h-48 sm:w-48 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-44 w-44 sm:h-48 sm:w-48 items-center justify-center rounded-full bg-secondary font-display text-4xl font-bold text-primary">
                        {initials(mentor.name)}
                      </div>
                    )}
                  </div>
                </a>
              ) : (
                <div className="rounded-full p-1.5 border-2 border-border/80">
                  {mentor.photo ? (
                    <img
                      src={mentor.photo}
                      alt={mentor.name}
                      width={200}
                      height={200}
                      loading="lazy"
                      className="h-44 w-44 sm:h-48 sm:w-48 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-44 w-44 sm:h-48 sm:w-48 items-center justify-center rounded-full bg-secondary font-display text-4xl font-bold text-primary">
                      {initials(mentor.name)}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Details below PTS */}
            <div className="mt-6 space-y-2">
              <h3 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                {mentor.name}
              </h3>

              <div className="inline-block rounded-full border border-primary/40 bg-primary/15 px-4 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-primary">
                {mentor.role}
              </div>

              <p className="pt-2 text-sm font-medium text-muted-foreground md:text-base">
                {mentor.department}
              </p>

              <p className="font-mono text-xs uppercase tracking-wider text-foreground/80">
                {mentor.institution}
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}