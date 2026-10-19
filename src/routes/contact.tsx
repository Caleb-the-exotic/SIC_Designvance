import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageHero } from "@/components/site/page-hero";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Designvance — Design Wing of the Student Innovation Club" },
      {
        name: "description",
        content:
          "Get in touch with Designvance for design collaborations, structural analysis support or to join the Design Wing.",
      },
      { property: "og:title", content: "Contact Designvance" },
      {
        property: "og:description",
        content: "Reach the Designvance Design Wing for collaborations and membership.",
      },
    ],
  }),
  component: Contact,
});

const fieldClass =
  "w-full rounded-sm border border-input bg-secondary/40 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary";

function Contact() {
  const [sending, setSending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xbgdbbkj", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        form.reset();
        toast.success("Message sent successfully!", {
          description: "Thanks for reaching out — the Designvance team will get back to you soon.",
        });
      } else {
        const data = await response.json().catch(() => null);
        toast.error("Failed to send message", {
          description: data?.error || "Please check your details and try again.",
        });
      }
    } catch {
      toast.error("Network error", {
        description: "Could not send your message. Please check your connection and try again.",
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <PageHero
        label="Contact"
        title="Let's design something that holds"
        description="Collaborations, project support, workshops or membership — reach out and we'll respond."
      />

      <section className="mx-auto max-w-5xl px-5 py-16 md:py-20">
        <form onSubmit={onSubmit} className="rounded-sm border border-border bg-card p-6 sm:p-8 md:p-10">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Left column in desktop: Name, Email, Subject */}
            <div className="flex flex-col gap-5">
              <div>
                <label htmlFor="name" className="font-mono text-sm font-normal italic uppercase tracking-[0.18em] text-primary">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  className={`${fieldClass} mt-2`}
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="font-mono text-sm font-normal italic uppercase tracking-[0.18em] text-primary">
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

              <div>
                <label htmlFor="subject" className="font-mono text-sm font-normal italic uppercase tracking-[0.18em] text-primary">
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
            </div>

            {/* Right column in desktop: Message */}
            <div className="flex flex-col">
              <label htmlFor="message" className="font-mono text-sm font-normal italic uppercase tracking-[0.18em] text-primary">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={9}
                required
                className={`${fieldClass} mt-2 flex-1 resize-y min-h-[160px]`}
                placeholder="Tell us about the design problem…"
              />
            </div>
          </div>

          {/* Centered button in desktop, full width / normal on mobile */}
          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              disabled={sending}
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-sm bg-primary px-8 py-3.5 font-mono text-sm font-normal italic uppercase tracking-[0.18em] text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              {sending ? "Sending…" : "Send message"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
}