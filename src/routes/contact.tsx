import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Github, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { PageHero } from "@/components/site/page-hero";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact INTEGRIS — Design Wing of the Student Innovation Club" },
      {
        name: "description",
        content:
          "Get in touch with INTEGRIS for design collaborations, structural analysis support or to join the Design Wing.",
      },
      { property: "og:title", content: "Contact INTEGRIS" },
      {
        property: "og:description",
        content: "Reach the INTEGRIS Design Wing for collaborations and membership.",
      },
    ],
  }),
  component: Contact,
});

const fieldClass =
  "w-full rounded-sm border border-input bg-secondary/40 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary";

function Contact() {
  const [sending, setSending] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget;
    setTimeout(() => {
      setSending(false);
      form.reset();
      toast.success("Message ready to send", {
        description: "Thanks for reaching out — the INTEGRIS team will get back to you.",
      });
    }, 600);
  }

  return (
    <>
      <PageHero
        label="Contact"
        title="Let's design something that holds"
        description="Collaborations, project support, workshops or membership — reach out and we'll respond."
      />

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          <div className="glass-panel rounded-sm p-7">
            <h2 className="tech-label">Reach us</h2>
            <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-primary" />
                integris.sic@gmail.com
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-primary" />
                +91 00000 00000
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                Student Innovation Club, Design Wing Lab
              </li>
            </ul>
          </div>

          <div className="glass-panel rounded-sm p-7">
            <h2 className="tech-label">Official channels</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {[
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Github, label: "GitHub" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="inline-flex items-center gap-2 rounded-sm border border-border px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="rounded-sm border border-border bg-card p-7 md:p-9">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="tech-label">
                Name
              </label>
              <input id="name" name="name" required className={`${fieldClass} mt-2`} placeholder="Your full name" />
            </div>
            <div>
              <label htmlFor="email" className="tech-label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={`${fieldClass} mt-2`}
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div className="mt-5">
            <label htmlFor="subject" className="tech-label">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              required
              className={`${fieldClass} mt-2`}
              placeholder="What is this about?"
            />
          </div>
          <div className="mt-5">
            <label htmlFor="message" className="tech-label">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              className={`${fieldClass} mt-2 resize-y`}
              placeholder="Tell us about the design problem…"
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="mt-7 inline-flex rounded-sm bg-primary px-7 py-3 font-mono text-xs uppercase tracking-[0.18em] text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-60"
          >
            {sending ? "Sending…" : "Send message"}
          </button>
        </form>
      </section>
    </>
  );
}