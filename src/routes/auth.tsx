import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/hooks/use-auth";
import { PageHero } from "@/components/site/page-hero";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Member Login — INTEGRIS Design Wing" },
      {
        name: "description",
        content:
          "Sign in to the INTEGRIS member area to upload industry visits, technology lessons and project entries.",
      },
      { property: "og:title", content: "Member Login — INTEGRIS" },
      { property: "og:description", content: "INTEGRIS member sign in and content upload." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate({ to: "/upload" });
  }, [loading, user, navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Signed in");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/upload` },
        });
        if (error) throw error;
        toast.success("Account created. Check your inbox if confirmation is required.");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setBusy(false);
    }
  }

  async function onGoogle() {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error("Google sign-in failed");
      return;
    }
  }

  return (
    <>
      <PageHero
        label="Member Access"
        title="Sign in to the INTEGRIS console"
        description="Members can log in to publish industry visits, technology lessons and project entries with images and presentations."
      />
      <section className="mx-auto max-w-md px-5 py-16">
        <div className="glass-panel rounded-sm p-7">
          <div className="flex gap-2">
            {(["signin", "signup"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`flex-1 rounded-sm border px-3 py-2 font-mono text-[0.65rem] uppercase tracking-[0.16em] transition-colors ${
                  mode === m
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {m === "signin" ? "Sign in" : "Create account"}
              </button>
            ))}
          </div>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="tech-label">Email</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-sm border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="password" className="tech-label">Password</label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-sm border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-sm bg-primary px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] text-primary-foreground disabled:opacity-60"
            >
              {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3 text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em]">or</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <button
            type="button"
            onClick={onGoogle}
            className="w-full rounded-sm border border-border px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] transition-colors hover:border-primary hover:text-primary"
          >
            Continue with Google
          </button>
        </div>
      </section>
    </>
  );
}
