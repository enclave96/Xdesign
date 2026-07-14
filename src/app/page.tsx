import Link from "next/link";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassCard } from "@/components/ui/GlassCard";

const features = [
  {
    title: "Instant UX Scoring",
    description:
      "Get an overall score plus category breakdowns for hierarchy, navigation, readability, and more.",
    icon: "📊",
  },
  {
    title: "Accessibility Checks",
    description:
      "Identify WCAG contrast issues, touch target problems, and typography concerns automatically.",
    icon: "♿",
  },
  {
    title: "Annotated Reports",
    description:
      "Visual issue markers on your design with actionable recommendations you can share with your team.",
    icon: "🎯",
  },
  {
    title: "Multiple Sources",
    description:
      "Upload screenshots, capture live websites, or import Figma frames — all in one workflow.",
    icon: "🔗",
  },
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen">
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[var(--color-blue-200)] opacity-30 blur-3xl" />
        <div className="absolute -right-24 top-1/4 h-80 w-80 rounded-full bg-[var(--color-purple-200)] opacity-25 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[var(--color-blue-300)] opacity-20 blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 px-4 pt-4 sm:px-6 lg:px-8">
        <GlassPanel variant="elevated" padding="none" className="mx-auto max-w-7xl">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <div
                aria-hidden
                className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] bg-[var(--gradient-accent)] shadow-[var(--shadow-glass-sm)]"
              >
                <span className="text-sm font-bold text-white">X</span>
              </div>
              <span className="text-[var(--text-lg)] font-[var(--font-weight-semibold)] text-[var(--color-text-primary)]">
                Xdesign
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <Link href="/login">
                <GlassButton variant="ghost" size="sm">
                  Log in
                </GlassButton>
              </Link>
              <Link href="/register">
                <GlassButton variant="primary" size="sm">
                  Get started
                </GlassButton>
              </Link>
            </div>
          </div>
        </GlassPanel>
      </header>

      {/* Hero */}
      <main className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <section className="text-center">
          <GlassPanel variant="subtle" padding="lg" className="mx-auto max-w-4xl">
            <p className="mb-4 text-[var(--text-sm)] font-[var(--font-weight-medium)] uppercase tracking-wider text-[var(--color-text-accent)]">
              AI-Powered Design Analysis
            </p>
            <h1 className="text-[var(--text-3xl)] font-[var(--font-weight-bold)] leading-[var(--leading-tight)] sm:text-[var(--text-4xl)]">
              Ship better UX with{" "}
              <span className="text-gradient">instant design feedback</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-[var(--text-lg)] leading-[var(--leading-relaxed)] text-[var(--color-text-secondary)]">
              Upload your designs and get a comprehensive UX audit — scores,
              annotated issues, and actionable recommendations in minutes.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/register">
                <GlassButton variant="primary" size="lg">
                  Start analyzing free
                </GlassButton>
              </Link>
              <Link href="/upload">
                <GlassButton variant="secondary" size="lg">
                  Upload a design
                </GlassButton>
              </Link>
            </div>
          </GlassPanel>
        </section>

        {/* Features */}
        <section className="mt-20">
          <h2 className="text-center text-[var(--text-2xl)] font-[var(--font-weight-semibold)]">
            Everything you need to improve your designs
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-[var(--color-text-secondary)]">
            Professional-grade analysis powered by modern UX heuristics and
            accessibility standards.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <GlassCard key={feature.title} title={feature.title}>
                <span className="mb-3 block text-2xl" aria-hidden>
                  {feature.icon}
                </span>
                <p className="text-[var(--text-sm)] text-[var(--color-text-secondary)]">
                  {feature.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-20">
          <GlassPanel variant="elevated" padding="lg" className="text-center">
            <h2 className="text-[var(--text-2xl)] font-[var(--font-weight-semibold)]">
              Ready to improve your design?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-[var(--color-text-secondary)]">
              Join designers who use Xdesign to catch UX issues before they
              reach production.
            </p>
            <Link href="/upload" className="mt-8 inline-block">
              <GlassButton variant="primary" size="lg">
                Upload your first design
              </GlassButton>
            </Link>
          </GlassPanel>
        </section>
      </main>

      <footer className="relative z-10 border-t border-[var(--glass-border-subtle)] py-8 text-center">
        <p className="text-[var(--text-sm)] text-[var(--color-text-muted)]">
          © {new Date().getFullYear()} Xdesign. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
