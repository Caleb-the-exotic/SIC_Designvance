import { Link } from "@tanstack/react-router";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import logo from "@/assets/integris-logo.png";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-steel">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="INTEGRIS logo"
              width={36}
              height={36}
              loading="lazy"
              className="h-9 w-9 object-contain"
            />
            <span className="font-display text-lg font-bold tracking-[0.18em]">INTEGRIS</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            The Design Wing of the Student Innovation Club — strength of materials, structural
            analysis and mechanical design, applied to real hardware.
          </p>
        </div>

        <div>
          <h3 className="tech-label">Navigate</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {[
              { to: "/", label: "Home" },
              { to: "/team", label: "Our Team" },
              { to: "/technology", label: "Technology" },
              { to: "/industry-visit", label: "Industry Visit" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="tech-label">Connect</h3>
          <div className="mt-4 flex gap-3">
            {[
              { Icon: Linkedin, label: "LinkedIn" },
              { Icon: Instagram, label: "Instagram" },
              { Icon: Github, label: "GitHub" },
              { Icon: Mail, label: "Email" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <p className="mt-4 font-mono text-xs text-muted-foreground">integris.sic@gmail.com</p>
        </div>
      </div>
      <div className="border-t border-border/60 px-5 py-5 text-center font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
        © {new Date().getFullYear()} INTEGRIS · Design Wing, Student Innovation Club
      </div>
    </footer>
  );
}