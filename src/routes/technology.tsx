import { useState, useEffect, useCallback } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Box, Cpu, Layers3, Printer, Ruler, Waves, Download, ExternalLink } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { UploadedPosts } from "@/components/site/uploaded-posts";
import type { TechCategory } from "@/lib/posts";

export const Route = createFileRoute("/technology")({
  head: () => ({
    meta: [
      { title: "Technology & Tools — Designvance Design Wing" },
      {
        name: "description",
        content:
          "CAD, finite element analysis, structural analysis, strength of materials, simulation and 3D printing — the engineering toolkit of Designvance.",
      },
      { property: "og:title", content: "Technology — Designvance" },
      {
        property: "og:description",
        content: "The engineering tools and methods behind every Designvance design.",
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
    value: "strength-of-materials",
    label: "Strength of Materials",
    blurb: "Session decks and teaching material on stress, strain, bending and fatigue.",
  },
  {
    value: "fluid-dynamics",
    label: "Fluid Dynamics",
    blurb: "Resources covering fluid mechanics, flow analysis and CFD fundamentals.",
  },
  {
    value: "fea",
    label: "FEA",
    blurb: "Finite element analysis study material and mesh convergence references.",
  },
  {
    value: "cad-design",
    label: "CAD Design",
    blurb: "Parametric modelling, assemblies and GD&T teaching resources.",
  },
  {
    value: "simulation",
    label: "Simulation",
    blurb: "Motion, thermal and multiphysics simulation material.",
  },
  {
    value: "prototyping",
    label: "Prototyping",
    blurb: "3D printing, FDM techniques and design-for-manufacture resources.",
  },
];

type StaticResource = {
  title: string;
  caption: string;
  downloadUrl: string;
  viewUrl: string;
};

const staticResources: Record<TechCategory, StaticResource[]> = {
  "strength-of-materials": [
    {
      title: "Thin & Thick Cylinders",
      caption:
        "Covers thin and thick cylinder theory under internal pressure. Topics include hoop and longitudinal stress in thin cylinders, Lamé's equations for radial and hoop stress distributions in thick cylinders, and worked examples on compound cylinders.",
      downloadUrl: "/SOM/Thin_and_Thick_Cylinders.pptx",
      viewUrl: "/SOM/Thin_and_Thick_Cylinders.pdf",
    },
  ],
  "fluid-dynamics": [],
  fea: [],
  "cad-design": [],
  simulation: [],
  prototyping: [],
};

const QUIZ_URL = "https://wayground.com/join?gc=31651077";

function Technology() {
  const [tab, setTab] = useState<TechCategory>("strength-of-materials");
  // carouselIndex goes 0..total (inclusive), where index=total means the cloned first 3 slides
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(true);
  const active = techTabs.find((t) => t.value === tab)!;
  const total = areas.length; // 6
  // Append 3 clones at the end so we can slide into them, then silently jump back
  const infiniteAreas = [...areas, ...areas.slice(0, 3)];

  // Detect mobile screen for 1 item (100%) vs 3 items (33.333%) per slide
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  const advance = useCallback(() => {
    setTransitioning(true);
    setCarouselIndex((i) => i + 1);
  }, []);

  // When we land on the cloned section (index >= total), silently jump back
  useEffect(() => {
    if (carouselIndex >= total) {
      // Wait for transition to finish, then jump without animation
      const id = setTimeout(() => {
        setTransitioning(false);
        setCarouselIndex(carouselIndex - total);
      }, 500);
      return () => clearTimeout(id);
    }
  }, [carouselIndex, total]);

  useEffect(() => {
    const id = setInterval(advance, 4000);
    return () => clearInterval(id);
  }, [advance]);

  const resources = staticResources[tab] ?? [];

  return (
    <>
      <PageHero
        label="Technology"
        title="The toolkit behind every design"
        description="A design only counts once it survives analysis. These are the methods and tools Designvance uses across the full loop — from first sketch to tested prototype."
      />

      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex"
              style={{
                transform: `translateX(-${carouselIndex * (isMobile ? 100 : 33.333)}%)`,
                transition: transitioning ? "transform 500ms ease-in-out" : "none",
              }}
            >
              {infiniteAreas.map(({ Icon, title, text, tools }, idx) => (
                <div key={`${title}-${idx}`} className="w-full md:w-1/3 shrink-0 px-2.5">
                  <article className="group relative h-full overflow-hidden rounded-sm border border-border bg-card p-7">
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
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {areas.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => { setTransitioning(true); setCarouselIndex(i); }}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  (carouselIndex % total) === i
                    ? "w-6 bg-primary"
                    : "w-2 bg-foreground/30 hover:bg-foreground/60"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mt-20">
          <p className="tech-label">Resources</p>
          <h2 className="mt-3 text-2xl font-bold md:text-3xl">Study material</h2>

          <div className="mt-6 flex flex-wrap gap-2">
            {techTabs.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setTab(t.value)}
                aria-pressed={tab === t.value}
                className={`rounded-sm border px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] transition-colors ${tab === t.value
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
            {resources.length > 0 ? (
              <div className="space-y-6">
                {resources.map((r) => (
                  <article
                    key={r.title}
                    className="group overflow-hidden rounded-xl border border-border bg-card"
                  >
                    <div className="flex flex-col md:flex-row min-h-[140px]">
                      <div className="flex flex-col justify-between p-6 md:w-3/4">
                        <div>
                          <h3 className="text-xl font-semibold">{r.title}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {r.caption}
                          </p>
                        </div>
                        <div className="mt-5 flex flex-wrap gap-3">
                          <a
                            href={r.downloadUrl}
                            download
                            className="inline-flex items-center gap-2 rounded-full border border-white/70 px-5 py-2 font-mono text-[0.75rem] uppercase tracking-[0.16em] text-white transition-all duration-200 hover:bg-white hover:text-black hover:border-white"
                          >
                            <Download className="h-4 w-4" />
                            Download
                          </a>
                          <a
                            href={r.viewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-white/70 px-5 py-2 font-mono text-[0.75rem] uppercase tracking-[0.16em] text-white transition-all duration-200 hover:bg-white hover:text-black hover:border-white"
                          >
                            Read
                          </a>
                          <a
                            href={QUIZ_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-white/70 px-5 py-2 font-mono text-[0.75rem] uppercase tracking-[0.16em] text-white transition-all duration-200 hover:bg-white hover:text-black hover:border-white"
                          >
                            <ExternalLink className="h-4 w-4" />
                            Take Quiz
                          </a>
                        </div>
                      </div>
                      <div className="md:w-1/4 rounded-xl m-3 overflow-hidden bg-secondary/40 border border-border/50">
                        <img
                          src="https://images.unsplash.com/photo-1667858329757-95becd82346e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt={`${r.title} preview`}
                          className="h-full w-full object-cover"
                          style={{ minHeight: "120px" }}
                        />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Nothing uploaded in this category yet.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
