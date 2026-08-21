import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/page-hero";
import { projectCategories, projects } from "@/data/site";
import { UploadedPosts } from "@/components/site/uploaded-posts";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — INTEGRIS Design Wing" },
      {
        name: "description",
        content:
          "Structural, mechanical, simulation and prototyping projects designed and analysed by the INTEGRIS Design Wing.",
      },
      { property: "og:title", content: "Projects — INTEGRIS" },
      {
        property: "og:description",
        content: "Design studies, analysis work and built prototypes from INTEGRIS.",
      },
    ],
  }),
  component: Projects,
});

const statusStyles: Record<string, string> = {
  Completed: "border-primary/50 text-primary",
  "In Progress": "border-accent/60 text-accent",
  Concept: "border-border text-muted-foreground",
};

function Projects() {
  const [filter, setFilter] = useState<string>("All");
  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <PageHero
        label="Projects"
        title="Designs that were calculated, then built"
        description="Each project below moved through hand calculation, CAD, simulation and physical validation."
      />

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="flex flex-wrap gap-2">
          {projectCategories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
              className={`rounded-sm border px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] transition-colors ${
                filter === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {shown.map((p) => (
            <article
              key={p.name}
              className="hover-lift group overflow-hidden rounded-sm border border-border bg-card"
            >
              <div className="overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  width={1280}
                  height={800}
                  loading="lazy"
                  className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="tech-label">{p.category}</span>
                  <span
                    className={`rounded-sm border px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] ${statusStyles[p.status]}`}
                  >
                    {p.status}
                  </span>
                </div>
                <h2 className="mt-4 text-xl font-semibold">{p.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-sm bg-secondary px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20">
          <p className="tech-label">Member uploads</p>
          <h2 className="mt-3 text-2xl font-bold md:text-3xl">Latest project submissions</h2>
          <div className="mt-8">
            <UploadedPosts section="project" emptyText="No member-uploaded projects yet." />
          </div>
        </div>
      </section>
    </>
  );
}