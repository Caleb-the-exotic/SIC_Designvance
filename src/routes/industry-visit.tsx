import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, MapPin } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { visits } from "@/data/site";
import { UploadedPosts } from "@/components/site/uploaded-posts";

export const Route = createFileRoute("/industry-visit")({
  head: () => ({
    meta: [
      { title: "Industry Visits — INTEGRIS Design Wing" },
      {
        name: "description",
        content:
          "Industry visits conducted by INTEGRIS: fabrication plants, machining lines and the engineering lessons our members brought back.",
      },
      { property: "og:title", content: "Industry Visits — INTEGRIS" },
      {
        property: "og:description",
        content: "Where we went, what we saw and what it changed in our designs.",
      },
    ],
  }),
  component: IndustryVisit,
});

function IndustryVisit() {
  return (
    <>
      <PageHero
        label="Industry Visit"
        title="Theory, checked against the shop floor"
        description="Site visits let members compare textbook assumptions with how components are actually fabricated, joined, inspected and shipped."
      />

      <section className="mx-auto max-w-5xl px-5 py-20">
        <ol className="relative space-y-12 border-l border-border pl-6 md:pl-10">
          {visits.map((v) => (
            <li key={v.company} className="relative">
              <span className="absolute -left-[31px] top-2 h-3 w-3 rotate-45 border border-primary bg-background md:-left-[47px]" />
              <article className="hover-lift overflow-hidden rounded-sm border border-border bg-card">
                <img
                  src={v.image}
                  alt={`${v.company} visit`}
                  width={1280}
                  height={800}
                  loading="lazy"
                  className="h-56 w-full object-cover md:h-72"
                />
                <div className="p-6 md:p-8">
                  <h2 className="text-xl font-semibold md:text-2xl">{v.company}</h2>
                  <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    <span className="inline-flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      {v.location}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays className="h-3.5 w-3.5 text-primary" />
                      {v.date}
                    </span>
                  </div>
                  <h3 className="tech-label mt-6">Key learning outcomes</h3>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                    {v.outcomes.map((o) => (
                      <li key={o} className="flex gap-3">
                        <span className="mt-2 h-px w-4 shrink-0 bg-primary" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
          ))}
        </ol>

        <div className="mt-20">
          <p className="tech-label">Member uploads</p>
          <h2 className="mt-3 text-2xl font-bold md:text-3xl">Recent visit submissions</h2>
          <div className="mt-8">
            <UploadedPosts section="industry_visit" emptyText="No member-uploaded visits yet." />
          </div>
        </div>
      </section>
    </>
  );
}