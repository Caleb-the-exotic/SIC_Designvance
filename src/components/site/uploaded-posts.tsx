import { useQuery } from "@tanstack/react-query";
import { FileText } from "lucide-react";
import { fetchPosts, type PostSection, type TechCategory } from "@/lib/posts";

export function UploadedPosts({
  section,
  techCategory,
  emptyText,
}: {
  section: PostSection;
  techCategory?: TechCategory;
  emptyText?: string;
}) {
  const { data, isLoading } = useQuery({
    queryKey: ["posts", section],
    queryFn: () => fetchPosts(section),
  });

  const posts = (data ?? []).filter((p) =>
    techCategory ? p.tech_category === techCategory : true,
  );

  if (isLoading) {
    return (
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
        Loading…
      </p>
    );
  }

  if (!posts.length) {
    return emptyText ? (
      <p className="text-sm text-muted-foreground">{emptyText}</p>
    ) : null;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((p) => (
        <article
          key={p.id}
          className="hover-lift group overflow-hidden rounded-sm border border-border bg-card"
        >
          {p.image_url && (
            <img
              src={p.image_url}
              alt={p.title}
              loading="lazy"
              className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
          <div className="p-6">
            <h3 className="text-lg font-semibold">{p.title}</h3>
            {p.caption && (
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.caption}</p>
            )}
            {p.ppt_url && (
              <a
                href={p.ppt_url}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-sm border border-primary/50 px-3 py-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <FileText className="h-3.5 w-3.5" />
                Open presentation
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
