import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Box, Cpu, Layers3, Printer, Ruler, Waves } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { UploadedPosts } from "@/components/site/uploaded-posts";
import type { TechCategory } from "@/lib/posts";

export const Route = createFileRoute("/technology")({
  head: () => ({
    meta: [
      { title: "Technology & Tools — INTEGRIS Design Wing" },
      {
        name: "description",
        content:
          "CAD, finite element analysis, structural analysis, strength of materials, simulation and 3D printing — the engineering toolkit of INTEGRIS.",
      },
      { property: "og:title", content: "Technology — INTEGRIS" },
      {
        property: "og:description",
        content: "The engineering tools and methods behind every INTEGRIS design.",
      },
    ],
  }),
  component: Technology,
});

const areas = [
  {
    Icon: Box,
    title: "CAD & 3D Design",
    text: "Parametric solid modelling, assemblies and production drawings with full GD&T.",
    tools: ["SolidWorks", "Fusion 360", "AutoCAD"],
  },
  {
    Icon: Layers3,
    title: "Finite Element Analysis",
    text: "Mesh strategy, boundary conditions and convergence studies for static and modal cases.",
    tools: ["ANSYS", "Abaqus", "Mesh Convergence"],
  },
  {
    Icon: Ruler,
    title: "Structural Analysis",
    text: "Frames, trusses and load paths sized against deflection, buckling and joint capacity.",
    tools: ["STAAD.Pro", "Matrix Methods", "Load Combinations"],
  },
  {
    Icon: Cpu,
    title: "Strength of Materials",
    text: "Bending, torsion, combined stress, Mohr's circle and fatigue life estimation.",
    tools: ["Hand Calculations", "Mohr's Circle", "S-N Curves"],
  },
  {
    Icon: Waves,
    title: "Simulation",
    text: "Motion, thermal and flow studies where behaviour cannot be judged statically.",
    tools: ["MATLAB", "Simulink", "CFD Basics"],
  },
  {
    Icon: Printer,
    title: "3D Printing & Prototyping",
    text: "Fast FDM iterations, fit checks and test fixtures before committing to machining.",
    tools: ["FDM", "Slicing", "Design for Manufacture"],
  },
];

const techTabs: { value: TechCategory; label: string; blurb: string }[] = [
  {
    value: "lesson",
    label: "Lessons (PPTs)",
    blurb: "Session decks and teaching material shared by INTEGRIS members.",
  },
  {
    value: "common",
    label: "Common",
    blurb: "General technology resources, notes and references for the whole wing.",
  },
];

function Technology() {
  const [tab, setTab] = useState<TechCategory>("lesson");
  const active = techTabs.find((t) => t.value === tab)!;

  return (
    <>
      <PageHero
        label="Technology"
        title="The toolkit behind every design"
        description="A design only counts once it survives analysis. These are the methods and tools INTEGRIS uses across the full loop — from first sketch to tested prototype."
      />

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {areas.map(({ Icon, title, text, tools }) => (
            <article
              key={title}
              className="hover-lift group relative overflow-hidden rounded-sm border border-border bg-card p-7"
            >
              <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-primary/40 bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </span>
                <h2 className="mt-6 text-lg font-semibold">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {tools.map((t) => (
                    <span
                      key={t}
                      className="rounded-sm border border-border px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground"
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
          <p className="tech-label">Resources</p>
          <h2 className="mt-3 text-2xl font-bold md:text-3xl">Uploaded technology material</h2>

          <div className="mt-6 flex flex-wrap gap-2">
            {techTabs.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setTab(t.value)}
                aria-pressed={tab === t.value}
                className={`rounded-sm border px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] transition-colors ${
                  tab === t.value
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <p className="mt-4 text-sm text-muted-foreground">{active.blurb}</p>

          <div className="mt-8">
            <UploadedPosts
              section="technology"
              techCategory={tab}
              emptyText="Nothing uploaded in this category yet."
            />
          </div>
        </div>
      </section>
    </>
  );
}