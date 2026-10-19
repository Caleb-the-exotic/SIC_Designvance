import { createFileRoute } from "@tanstack/react-router";
import { Eye, Target, ShieldCheck, Lightbulb, Users, Layers } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Designvance — Design Wing of the Student Innovation Club" },
      {
        name: "description",
        content:
          "Designvance is the Design Wing of the Student Innovation Club, focused on strength of materials, structural analysis, mechanical design and practical engineering.",
      },
      { property: "og:title", content: "About Designvance" },
      {
        property: "og:description",
        content: "Our vision, mission and core values as the SIC Design Wing.",
      },
    ],
  }),
  component: About,
});

const values = [
  { Icon: ShieldCheck, title: "Rigour", text: "Every claim is backed by a calculation or a test." },
  { Icon: Lightbulb, title: "Innovation", text: "New geometry, new materials, better load paths." },
  { Icon: Users, title: "Collaboration", text: "Designs improve under honest peer review." },
  { Icon: Layers, title: "Craft", text: "Clean drawings, clean models, clean hardware." },
];

function About() {
  return (
    <>
      <PageHero
        label="About"
        title="The Design Wing of the Student Innovation Club"
        description="Designvance exists to give the Student Innovation Club a dedicated engineering design core — a group that takes an idea from free-body diagram to validated, manufacturable hardware."
      />

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-2">
        <div className="space-y-5 text-muted-foreground">
          <p className="text-base leading-relaxed">
            We work at the intersection of{" "}
            <span className="text-foreground">strength of materials</span>, structural analysis and
            mechanical design. Members study how components carry load, where they fail and how
            geometry, material choice and joint design change that outcome.
          </p>
          <p className="text-base leading-relaxed">
            Each project runs through the same discipline: define the load case, hand-calculate the
            first sizing, model it in CAD, verify it with finite element analysis, then prototype and
            test. That loop is what separates a sketch from an engineered design.
          </p>
          <p className="text-base leading-relaxed">
            Beyond projects, Designvance runs internal workshops, design reviews and industry visits so
            members see how the theory in a textbook is applied on a real shop floor.
          </p>
        </div>

        <div className="space-y-5">
          <article className="glass-panel rounded-sm p-7">
            <Eye className="h-6 w-6 text-primary" />
            <h2 className="mt-4 text-xl font-semibold">Vision</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              To be the design authority within the Student Innovation Club — a wing whose analysis
              other teams trust, and whose members graduate as engineers who can defend every
              dimension on a drawing.
            </p>
          </article>
          <article className="glass-panel rounded-sm p-7">
            <Target className="h-6 w-6 text-primary" />
            <h2 className="mt-4 text-xl font-semibold">Mission</h2>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
              <li>· Build fluency in strength of materials and structural mechanics.</li>
              <li>· Validate every design with both hand calculation and simulation.</li>
              <li>· Prototype quickly and test honestly.</li>
              <li>· Share knowledge through reviews, workshops and documentation.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="border-t border-border bg-steel">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <p className="tech-label">Core values</p>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">How we work</h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ Icon, title, text }) => (
              <article key={title} className="hover-lift rounded-sm border border-border bg-card p-6">
                <Icon className="h-6 w-6 text-primary" />
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}