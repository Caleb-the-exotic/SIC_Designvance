import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Boxes, Compass, Gauge, Ruler } from "lucide-react";
import WebThreads from "@/components/WebThreads";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Designvance — Engineering Strength. Designing the Future." },
      {
        name: "description",
        content:
          "Designvance, the Design Wing of the Student Innovation Club: strength of materials, structural analysis, FEA and innovative mechanical design.",
      },
      { property: "og:title", content: "Designvance — Engineering Strength. Designing the Future." },
      {
        property: "og:description",
        content: "Structural design, simulation and prototyping by the SIC Design Wing.",
      },
    ],
  }),
  component: Index,
});

const pillars = [
  {
    Icon: Ruler,
    title: "Strength of Materials",
    text: "Stress, strain, bending and fatigue worked out by hand before anything is meshed.",
  },
  {
    Icon: Compass,
    title: "Structural Design",
    text: "Load paths, sections and joints sized against real service conditions.",
  },
  {
    Icon: Gauge,
    title: "Engineering Analysis",
    text: "FEA studies that confirm the theory and expose failure modes early.",
  },
  {
    Icon: Boxes,
    title: "Mechanical Innovation",
    text: "From parametric CAD to printed prototypes and tested hardware.",
  },
];

function Index() {
  return (
    <>
      <section className="relative flex min-h-svh overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 h-full w-[100vw] min-w-[1400px]">
          <WebThreads
            color1="#FF6A00"
            color2="#FFC46B"
            color3="#FFFFFF"
            speed={0.2}
            threadCount={6}
            frequency={5}
            spread={0.18}
            taper={1}
            position={0.5}
            fanMode="center"
            glow={0.02}
            falloff={0.6}
            thickness={1.1}
            brightness={0.6}
            opacity={1}
            mirror
            shimmer={false}
            grain
            grainIntensity={0.05}
            mouseInteraction
            mouseStrength={0.3}
          />
        </div>
        <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-5 pt-6 pb-10 sm:py-12 my-auto -translate-y-3 sm:translate-y-0">
          <div className="max-w-4xl text-center pb-6 sm:pb-10">
            <h1 className="rise-in font-hero text-4xl uppercase leading-[1.05] tracking-wide drop-shadow-[0_3px_10px_rgba(0,0,0,0.9)] sm:whitespace-nowrap sm:text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl sm:leading-[0.9]">
              <span className="block sm:inline">Engineering Strength.</span>{" "}
              <span className="block sm:inline text-primary">Designing the Future.</span>
            </h1>
          </div>
          <div className="my-auto flex items-center justify-center -mt-3 sm:-mt-6 pb-2">
            <img
              src="/Designvance%20Final.png"
              alt="Designvance logo"
              width={900}
              height={450}
              className="rise-in h-68 w-auto object-contain sm:h-80 md:h-96 lg:h-[30rem] xl:h-[32rem]"
            />
          </div>
        </div>
      </section>

      <section className="ambient-glow">
        <div className="relative mx-auto max-w-7xl px-5 py-20 md:py-28">
          <p className="tech-label">What we do</p>
          <h2 className="rule-accent mt-4 max-w-2xl text-3xl font-bold md:text-4xl">
            Many disciplines, one design process
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            We are the design and analysis core of the Student Innovation Club — turning material
            behaviour, structural theory and CAD into hardware that holds up under load.
          </p>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {pillars.map(({ Icon, title, text }) => (
              <article key={title} className="card-accent rounded-sm p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-primary/30 bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] text-primary-foreground cursor-default"
            >
              Explore Projects
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              to="/team"
              className="inline-flex items-center gap-2 rounded-sm border border-border px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Meet Our Team
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-steel">
        <div className="blueprint-grid mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 py-16 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Have a design problem worth solving?</h2>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
              We collaborate with student teams, faculty and industry on structural and mechanical
              design challenges.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Contact Designvance
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
