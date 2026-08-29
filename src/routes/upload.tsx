import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { PageHero } from "@/components/site/page-hero";
import { uploadFile, type PostSection, type TechCategory } from "@/lib/posts";

export const Route = createFileRoute("/upload")({
  head: () => ({
    meta: [
      { title: "Upload Content — INTEGRIS Design Wing" },
      {
        name: "description",
        content:
          "Member console for publishing industry visits, technology lessons and projects with images, presentations and captions.",
      },
      { property: "og:title", content: "Upload Content — INTEGRIS" },
      { property: "og:description", content: "Publish INTEGRIS visits, lessons and projects." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: UploadPage,
});

const sections: { value: PostSection; label: string }[] = [
  { value: "industry_visit", label: "Industry Visit" },
  { value: "technology", label: "Technology" },
  { value: "project", label: "Project" },
];

function UploadPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [section, setSection] = useState<PostSection>("industry_visit");
  const [techCategory, setTechCategory] = useState<TechCategory>("strength-of-materials");
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [pptLink, setPptLink] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [pptFile, setPptFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setBusy(true);
    try {
      const image_url = imageFile ? await uploadFile(imageFile, user.id) : imageLink || null;
      const ppt_url = pptFile ? await uploadFile(pptFile, user.id) : pptLink || null;

      const { error } = await supabase.from("posts").insert({
        section,
        tech_category: section === "technology" ? techCategory : null,
        title,
        caption: caption || null,
        image_url,
        ppt_url,
        created_by: user.id,
      });
      if (error) throw error;

      toast.success("Content published");
      setTitle("");
      setCaption("");
      setImageLink("");
      setPptLink("");
      setImageFile(null);
      setPptFile(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  if (loading || !user) return null;

  const inputClass =
    "mt-2 w-full rounded-sm border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary";

  return (
    <>
      <PageHero
        label="Member Console"
        title="Upload new content"
        description="Add an entry to Industry Visits, Technology or Projects. Attach an image and a presentation as a file or a link."
      />
      <section className="mx-auto max-w-3xl px-5 py-16">
        <form onSubmit={onSubmit} className="glass-panel space-y-6 rounded-sm p-7">
          <div>
            <span className="tech-label">Destination page</span>
            <div className="mt-3 flex flex-wrap gap-2">
              {sections.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => setSection(s.value)}
                  className={`rounded-sm border px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] transition-colors ${
                    section === s.value
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {section === "technology" && (
            <div>
              <span className="tech-label">Technology category</span>
              <div className="mt-3 flex flex-wrap gap-2">
                {(
                  [
                    "strength-of-materials",
                    "fluid-dynamics",
                    "fea",
                    "cad-design",
                    "simulation",
                    "prototyping",
                  ] as const
                ).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setTechCategory(c)}
                    className={`rounded-sm border px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] transition-colors ${
                      techCategory === c
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {c === "strength-of-materials"
                      ? "Strength of Materials"
                      : c === "fluid-dynamics"
                        ? "Fluid Dynamics"
                        : c === "fea"
                          ? "FEA"
                          : c === "cad-design"
                            ? "CAD Design"
                            : c === "simulation"
                              ? "Simulation"
                              : "Prototyping"}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <label htmlFor="title" className="tech-label">
              Title
            </label>
            <input
              id="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="caption" className="tech-label">
              Caption
            </label>
            <textarea
              id="caption"
              rows={3}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="imageFile" className="tech-label">
                Image file
              </label>
              <input
                id="imageFile"
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                className={inputClass}
              />
              <label htmlFor="imageLink" className="tech-label mt-4 block">
                or image link
              </label>
              <input
                id="imageLink"
                type="url"
                placeholder="https://…"
                value={imageLink}
                onChange={(e) => setImageLink(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="pptFile" className="tech-label">
                PPT file
              </label>
              <input
                id="pptFile"
                type="file"
                accept=".ppt,.pptx,.pdf"
                onChange={(e) => setPptFile(e.target.files?.[0] ?? null)}
                className={inputClass}
              />
              <label htmlFor="pptLink" className="tech-label mt-4 block">
                or PPT link
              </label>
              <input
                id="pptLink"
                type="url"
                placeholder="https://…"
                value={pptLink}
                onChange={(e) => setPptLink(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={busy}
              className="rounded-sm bg-primary px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] text-primary-foreground disabled:opacity-60"
            >
              {busy ? "Publishing…" : "Publish"}
            </button>
            <Link
              to="/technology"
              className="rounded-sm border border-border px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] transition-colors hover:border-primary hover:text-primary"
            >
              View technology page
            </Link>
          </div>
        </form>
      </section>
    </>
  );
}
