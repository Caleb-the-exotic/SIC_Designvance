import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { LogIn, Menu, Upload, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

const links = [
  { to: "/", label: "Home" },
  { to: "/team", label: "Our Team" },
  { to: "/technology", label: "Technology" },
  { to: "/industry-visit", label: "Industry Visit" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function handleSignOut() {
    setOpen(false);
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3.5">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src="/Designvance%20Minimal.png"
            alt="Designvance logo"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-bold tracking-normal text-foreground">
              Designvance
            </span>
            <span className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
              Design Wing · SIC
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-sm px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-primary" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {user && (
          <div className="hidden items-center gap-2 lg:flex">
            <Link
              to="/upload"
              className="inline-flex items-center gap-2 rounded-sm border border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Upload className="h-3.5 w-3.5" />
              Upload
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-sm border border-primary/60 px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Log out
            </button>
          </div>
        )}

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-border text-foreground lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="absolute left-0 right-0 top-full border-b border-border bg-background/95 backdrop-blur-xl px-5 py-3 shadow-2xl lg:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: l.to === "/" }}
              className="block border-b border-border/50 py-3 text-sm text-muted-foreground last:border-0"
              activeProps={{ className: "text-primary" }}
            >
              {l.label}
            </Link>
          ))}
          {user && (
            <div className="mt-3 flex gap-2">
              <Link
                to="/upload"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-sm border border-border px-4 py-2 text-center font-mono text-xs uppercase tracking-[0.18em] text-foreground"
              >
                Upload
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="flex-1 rounded-sm border border-primary/60 px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-primary"
              >
                Log out
              </button>
            </div>
          )}
        </nav>
      )}
    </header>
  );
}