import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, MapPin, Download, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { PageHero } from "@/components/site/page-hero";
import { visits, type Visit } from "@/data/site";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export const Route = createFileRoute("/industry-visit")({
  head: () => ({
    meta: [
      { title: "Industry Visits — Designvance Design Wing" },
      {
        name: "description",
        content:
          "Industry visits conducted by Designvance: fabrication plants, machining lines and the engineering lessons our members brought back.",
      },
      { property: "og:title", content: "Industry Visits — Designvance" },
      {
        property: "og:description",
        content: "Where we went, what we saw and what it changed in our designs.",
      },
    ],
  }),
  component: IndustryVisit,
});

function ImageCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Auto-advance every 3.5 seconds
  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(nextSlide, 3500);
    return () => clearInterval(interval);
  }, [nextSlide, images.length]);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl bg-muted group shrink-0">
      {images.map((img, idx) => (
        <img
          key={img}
          src={img}
          alt={`${alt} - image ${idx + 1}`}
          width={1600}
          height={1200}
          loading={idx === 0 ? "eager" : "lazy"}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
            idx === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        />
      ))}

      {images.length > 1 && (
        <>
          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              prevSlide();
            }}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/70 p-2 text-foreground backdrop-blur-sm opacity-0 transition-opacity hover:bg-background group-hover:opacity-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              nextSlide();
            }}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/70 p-2 text-foreground backdrop-blur-sm opacity-0 transition-opacity hover:bg-background group-hover:opacity-100"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-background/60 px-2.5 py-1 backdrop-blur-sm">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? "w-6 bg-primary" : "w-2 bg-foreground/40 hover:bg-foreground/70"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const VISIBLE_OUTCOMES = 5;

function VisitCard({ visit }: { visit: Visit }) {
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [outcomesOpen, setOutcomesOpen] = useState(false);
  const hasReports = visit.reports && visit.reports.length > 0;
  const hasOutcomes = visit.outcomes && visit.outcomes.length > 0;
  const needsTruncate = hasOutcomes && visit.outcomes!.length > VISIBLE_OUTCOMES;

  return (
    <>
      <article className="overflow-hidden rounded-2xl border border-border bg-card p-5 sm:p-6 md:p-7 shadow-sm transition-all duration-300 hover:border-border/80">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch">
          {/* Left side: Carousel as rounded rectangle */}
          <div className="w-full md:w-1/2 lg:w-[48%] shrink-0">
            <ImageCarousel images={visit.images} alt={visit.company} />
          </div>

          {/* Right side: Information & actions */}
          <div className="flex flex-col justify-between flex-1 py-1">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">{visit.company}</h2>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  {visit.location}
                </span>
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-3.5 w-3.5 text-primary" />
                  {visit.date}
                </span>
              </div>

              <h3 className="tech-label mt-6">Key learning outcomes</h3>
              {hasOutcomes ? (
                <div>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                    {(needsTruncate ? visit.outcomes!.slice(0, VISIBLE_OUTCOMES) : visit.outcomes!).map((o) => (
                      <li key={o} className="flex gap-3">
                        <span className="shrink-0 text-primary">➣</span>
                        {o}
                      </li>
                    ))}
                  </ul>
                  {needsTruncate && (
                    <button
                      type="button"
                      onClick={() => setOutcomesOpen(true)}
                      className="mt-3 text-sm text-primary hover:underline cursor-pointer"
                    >
                      Read more...
                    </button>
                  )}
                </div>
              ) : (
                <div className="mt-3 min-h-[1.5rem]" />
              )}
            </div>

            {/* Single download button in bottom right corner */}
            <div className="mt-8 flex justify-end">
              {hasReports ? (
                <button
                  type="button"
                  onClick={() => setDownloadOpen(true)}
                  className="inline-flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-primary transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:border-primary shadow-sm cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  Download Reports
                </button>
              ) : (
                <span className="text-sm text-muted-foreground">No reports available</span>
              )}
            </div>
          </div>
        </div>
      </article>

      {/* Download dialog */}
      <Dialog open={downloadOpen} onOpenChange={setDownloadOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Download Reports</DialogTitle>
            <DialogDescription>Select a report to download.</DialogDescription>
          </DialogHeader>
          <div className="mt-2 space-y-3">
            {visit.reports?.map((r) => (
              <a
                key={r.url}
                href={r.url}
                download
                onClick={() => setDownloadOpen(false)}
                className="flex items-center gap-3 rounded-sm border border-border bg-secondary/40 px-4 py-3 font-mono text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <FileText className="h-5 w-5 shrink-0 text-primary" />
                {r.label}
              </a>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Outcomes dialog */}
      <Dialog open={outcomesOpen} onOpenChange={setOutcomesOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Key Learning Outcomes</DialogTitle>
            <DialogDescription>{visit.company}</DialogDescription>
          </DialogHeader>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            {visit.outcomes?.map((o) => (
              <li key={o} className="flex gap-3">
                <span className="shrink-0 text-primary">➣</span>
                {o}
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </>
  );
}

function IndustryVisit() {
  return (
    <>
      <PageHero
        label="Industry Visit"
        title="Theory, checked against the shop floor"
        description="Site visits let members compare textbook assumptions with how components are actually fabricated, joined, inspected and shipped."
      />

      <section className="mx-auto max-w-6xl px-5 py-20">
        <ol className="relative space-y-12 border-l border-border pl-6 md:pl-10">
          {visits.map((v) => (
            <li key={v.company} className="relative">
              <span className="absolute -left-[31px] top-2 h-3 w-3 rotate-45 border border-primary bg-background md:-left-[47px]" />
              <VisitCard visit={v} />
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}