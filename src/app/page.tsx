import Link from "next/link";
import { ArrowRight, Check, FileImage, Globe2, ShieldCheck, Sparkles } from "lucide-react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { DesignAuditIllustration } from "@/components/illustrations/DesignAuditIllustration";

const features = [
  {
    title: "Instant UX Scoring",
    description:
      "Get an overall score plus category breakdowns for hierarchy, navigation, readability, and more.",
    icon: Sparkles,
    accent: "from-sky-400 to-blue-600",
  },
  {
    title: "Accessibility Checks",
    description:
      "Identify WCAG contrast issues, touch target problems, and typography concerns automatically.",
    icon: ShieldCheck,
    accent: "from-violet-400 to-purple-600",
  },
  {
    title: "Annotated Reports",
    description:
      "Visual issue markers on your design with actionable recommendations you can share with your team.",
    icon: Check,
    accent: "from-emerald-400 to-teal-600",
  },
  {
    title: "Multiple Sources",
    description:
      "Upload screenshots, capture live websites, or import Figma frames — all in one workflow.",
    icon: Globe2,
    accent: "from-orange-400 to-pink-600",
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
                className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] bg-[var(--gradient-accent)] shadow-[var(--glow-button)]"
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
      <main className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
        <section className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-8">
          <div className="animate-enter-up text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/75 bg-white/45 px-3.5 py-2 text-[var(--text-xs)] font-[var(--font-weight-semibold)] tracking-wide text-[var(--color-text-accent)] shadow-[var(--shadow-glass-sm)] backdrop-blur-xl">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
              </span>
              AI-powered design intelligence
            </div>
            <h1 className="max-w-3xl text-[2.9rem] font-[var(--font-weight-bold)] leading-[1.05] tracking-[-0.055em] text-[var(--color-text-primary)] sm:text-6xl">
              Make every screen{" "}
              <span className="text-gradient">feel effortless.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-[var(--text-lg)] leading-[1.7] text-[var(--color-text-secondary)] lg:mx-0">
              Upload a design and get a clear, visual UX audit in minutes—complete
              with accessibility checks, annotated issues, and fixes your team can use.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
              <Link href="/register">
                <GlassButton variant="primary" size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Analyze a design
                </GlassButton>
              </Link>
              <Link href="/upload">
                <GlassButton variant="secondary" size="lg" leftIcon={<FileImage className="h-4 w-4" />}>
                  Try an upload
                </GlassButton>
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[var(--text-sm)] text-[var(--color-text-secondary)] lg:justify-start">
              {["WCAG contrast", "Visual hierarchy", "Actionable fixes"].map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-500" strokeWidth={2.5} />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="animate-enter-scale relative">
            <div className="absolute -inset-5 rounded-[2.5rem] bg-white/25 blur-2xl" />
            <GlassPanel variant="subtle" padding="sm" className="relative border-white/80" shine>
              <DesignAuditIllustration />
            </GlassPanel>
          </div>
        </section>

        {/* Features */}
        <section className="mt-24">
          <div className="text-center">
            <p className="text-[var(--text-sm)] font-[var(--font-weight-semibold)] uppercase tracking-[0.16em] text-[var(--color-text-accent)]">
              One intelligent workspace
            </p>
            <h2 className="mt-3 text-center text-[var(--text-2xl)] font-[var(--font-weight-semibold)] tracking-tight sm:text-4xl">
              Feedback your whole team can act on
            </h2>
          </div>
          <p className="mx-auto mt-3 max-w-xl text-center text-[var(--color-text-secondary)]">
            Professional-grade analysis powered by modern UX heuristics and
            accessibility standards.
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
              <GlassCard key={feature.title} title={feature.title} hoverLift className="animate-enter-up" style={{ animationDelay: `${index * 90}ms` }}>
                <span className={`mb-5 flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-gradient-to-br ${feature.accent} text-white shadow-[0_8px_20px_rgba(99,102,241,0.22)]`} aria-hidden>
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <p className="text-[var(--text-sm)] text-[var(--color-text-secondary)]">
                  {feature.description}
                </p>
              </GlassCard>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-24">
          <GlassPanel variant="elevated" padding="lg" className="overflow-visible text-center">
            <div aria-hidden className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-violet-300/35 blur-3xl animate-aurora-breathe" />
            <div aria-hidden className="absolute -bottom-16 -left-12 h-36 w-36 rounded-full bg-sky-300/35 blur-3xl animate-aurora-breathe [animation-delay:1.2s]" />
            <div className="relative">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--gradient-accent)] text-white shadow-[var(--glow-button)]">
                <Sparkles className="h-5 w-5" />
              </div>
              <h2 className="text-[var(--text-2xl)] font-[var(--font-weight-semibold)] tracking-tight sm:text-3xl">
                Turn every design review into momentum.
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-[var(--color-text-secondary)]">
                Start with a screenshot, a Figma frame, or a live link. Xdesign does the first pass for you.
              </p>
              <Link href="/upload" className="mt-8 inline-block">
                <GlassButton variant="primary" size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Upload your first design
                </GlassButton>
              </Link>
            </div>
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
