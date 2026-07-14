import Link from "next/link";
import { ArrowRight, MagicStar, TrendUp } from "iconsax-reactjs";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { GlassButton } from "@/components/ui/GlassButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DesignAuditIllustration } from "@/components/illustrations/DesignAuditIllustration";
import {
  FeatureIllustration,
  type FeatureIllustrationType,
} from "@/components/illustrations/FeatureIllustrations";
import { XdesignLogo } from "@/components/brand/XdesignLogo";
import { iconProps } from "@/components/icons";

const features: {
  title: string;
  description: string;
  illustration: FeatureIllustrationType;
}[] = [
  {
    title: "Instant UX Scoring",
    description:
      "Get an overall score plus category breakdowns for hierarchy, navigation, readability, and more.",
    illustration: "scoring",
  },
  {
    title: "Accessibility Checks",
    description:
      "Identify WCAG contrast issues, touch target problems, and typography concerns automatically.",
    illustration: "accessibility",
  },
  {
    title: "Annotated Reports",
    description:
      "Visual issue markers on your design with actionable recommendations you can share with your team.",
    illustration: "reports",
  },
  {
    title: "Multiple Sources",
    description:
      "Upload screenshots, capture live websites, or import Figma frames — all in one workflow.",
    illustration: "sources",
  },
];

const faqs = [
  {
    question: "What can I analyze?",
    answer:
      "Upload a screenshot or image, paste a public website URL, or bring in a public Figma frame. Xdesign turns it into a visual UX and accessibility review.",
  },
  {
    question: "What does the report cover?",
    answer:
      "Every report includes visual hierarchy, readability, consistency, navigation clarity, contrast, typography, touch targets, and WCAG-oriented recommendations.",
  },
  {
    question: "Can I share the findings with my team?",
    answer:
      "Yes. Each project retains its history and can export an HTML report with scores, annotated issues, and prioritised next steps.",
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
      <header className="sticky top-0 z-[var(--z-header)] border-b border-[var(--color-slate-200)]/70 bg-white/90 backdrop-blur-[var(--blur-md)]">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="shrink-0">
            <XdesignLogo markClassName="h-8 w-auto" />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {[
              { label: "Features", href: "#features" },
              { label: "FAQ", href: "#faq" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-[var(--radius-sm)] px-3.5 py-2 text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-slate-100)] hover:text-[var(--color-text-primary)]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <Link
              href="/login"
              className="text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[var(--color-text-primary)] transition-colors hover:text-[var(--color-purple-700)]"
            >
              Login
            </Link>
            <GlassButton
              href="/register"
              variant="primary"
              size="sm"
              rightIcon={
                <ArrowRight
                  {...iconProps("xs", "-rotate-45", "Linear", { tone: "light", interactive: false })}
                />
              }
            >
              See a demo
            </GlassButton>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-10 mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <section className="grid items-center gap-12 lg:grid-cols-[1.02fr_1fr] lg:gap-10">
          <div className="animate-enter-up text-center lg:text-left">
            <div className="mb-7 inline-flex items-center gap-2 rounded-[10px] border border-[var(--color-slate-200)] bg-white px-3 py-1.5 text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[var(--color-text-primary)] shadow-[var(--shadow-glass-sm)]">
              <MagicStar {...iconProps("xs", "text-[var(--color-purple-600)]", "Bold", { interactive: false })} />
              Made for better interfaces
            </div>

            <h1 className="mx-auto max-w-xl text-[2.7rem] font-[var(--font-weight-bold)] leading-[1.08] tracking-[-0.045em] text-[var(--color-text-primary)] sm:text-[3.4rem] lg:mx-0">
              Smarter design decisions{" "}
              <span className="inline-flex h-[0.85em] w-[0.85em] translate-y-[0.08em] items-center justify-center rounded-[0.22em] bg-[var(--gradient-primary)] align-baseline shadow-[var(--glow-button-primary)]">
                <TrendUp {...iconProps("md", "h-[60%] w-[60%]", "Bold", { tone: "light", interactive: false })} />
              </span>{" "}
              powered by AI
            </h1>

            <p className="mx-auto mt-6 max-w-md text-[var(--text-lg)] leading-[1.65] text-[var(--color-text-muted)] lg:mx-0">
              Turn your screens into clear insights, better decisions, and
              continuously improved user experiences.
            </p>

            <div className="mt-8 flex justify-center lg:justify-start">
              <GlassButton
                href="/register"
                variant="primary"
                size="lg"
                rightIcon={
                  <ArrowRight
                    {...iconProps("sm", "-rotate-45", "Linear", { tone: "light", interactive: false })}
                  />
                }
              >
                See a demo
              </GlassButton>
            </div>

            <dl className="mt-12 flex items-start justify-center gap-10 text-left sm:gap-14 lg:justify-start">
              {[
                { value: "5k+", label: "Screens analyzed" },
                { value: "40%+", label: "Fewer UX issues" },
                { value: "3×", label: "Faster reviews" },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="text-[1.7rem] font-[var(--font-weight-bold)] tracking-tight text-[var(--color-text-primary)]">
                    {stat.value}
                  </dd>
                  <dd className="mt-0.5 text-[var(--text-sm)] text-[var(--color-text-muted)]">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="animate-enter-scale relative">
            <div
              aria-hidden
              className="absolute -inset-10 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(196,181,253,0.35)_0%,transparent_65%)]"
            />

            <div className="relative rounded-[var(--radius-xl)] border border-[var(--color-slate-200)]/80 bg-white p-3 shadow-[var(--shadow-glass-xl)]">
              <DesignAuditIllustration />
            </div>

            {/* Floating collaborator cursors */}
            <div className="absolute -left-4 top-[30%] hidden items-center sm:flex" aria-hidden>
              <svg viewBox="0 0 12 12" className="h-3 w-3 -rotate-12 text-[var(--color-purple-600)]" fill="currentColor">
                <path d="M0 0L12 5L5.5 6.5L4 12L0 0Z" />
              </svg>
              <span className="ml-1 rounded-full bg-[var(--color-purple-100)] px-3 py-1 text-[var(--text-xs)] font-[var(--font-weight-semibold)] text-[var(--color-purple-800)] shadow-[var(--shadow-glass-sm)]">
                Maya Chen
              </span>
            </div>
            <div className="absolute -right-3 top-[58%] hidden items-center sm:flex" aria-hidden>
              <span className="mr-1 rounded-full bg-pink-100 px-3 py-1 text-[var(--text-xs)] font-[var(--font-weight-semibold)] text-pink-800 shadow-[var(--shadow-glass-sm)]">
                Sam Park
              </span>
              <svg viewBox="0 0 12 12" className="h-3 w-3 rotate-[100deg] text-pink-500" fill="currentColor">
                <path d="M0 0L12 5L5.5 6.5L4 12L0 0Z" />
              </svg>
            </div>

            {/* Stat chips */}
            <div className="absolute -bottom-6 left-1/2 hidden w-max -translate-x-1/2 items-center gap-3 sm:flex" aria-hidden>
              {[
                { dot: "bg-[var(--color-purple-400)]", label: "Score", value: "92" },
                { dot: "bg-sky-300", label: "Issues", value: "14" },
                { dot: "bg-pink-300", label: "Contrast", value: "AA" },
              ].map((chip) => (
                <span
                  key={chip.label}
                  className="inline-flex items-center gap-2 rounded-[12px] border border-[var(--color-slate-200)] bg-white px-3.5 py-2 text-[var(--text-sm)] shadow-[var(--shadow-glass-md)]"
                >
                  <span className={`h-2.5 w-2.5 rounded-[3px] ${chip.dot}`} />
                  <span className="text-[var(--color-text-muted)]">{chip.label}</span>
                  <span className="font-[var(--font-weight-bold)] text-[var(--color-text-primary)]">
                    {chip.value}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mt-28 scroll-mt-24">
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
            {features.map((feature, index) => (
              <GlassCard
                key={feature.title}
                hoverLift
                padding="none"
                className="animate-enter-up overflow-hidden"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <div className="p-5">
                  <FeatureIllustration type={feature.illustration} />
                  <h3 className="mt-4 text-[var(--text-lg)] font-[var(--font-weight-semibold)] leading-[var(--leading-tight)] text-[var(--color-text-primary)]">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-[var(--text-sm)] leading-[var(--leading-normal)] text-[var(--color-text-secondary)]">
                    {feature.description}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        <section id="faq" className="mx-auto mt-24 max-w-3xl scroll-mt-24">
          <div className="text-center">
            <p className="text-[var(--text-sm)] font-[var(--font-weight-semibold)] uppercase tracking-[0.16em] text-[var(--color-text-accent)]">
              FAQ
            </p>
            <h2 className="mt-3 text-[var(--text-2xl)] font-[var(--font-weight-semibold)] tracking-tight sm:text-4xl">
              Good questions, clear answers.
            </h2>
          </div>
          <GlassPanel variant="subtle" padding="md" className="mt-8">
            <Accordion type="single" collapsible>
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`faq-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </GlassPanel>
        </section>

        {/* CTA */}
        <section className="mt-24">
          <GlassPanel variant="elevated" padding="lg" className="overflow-visible text-center">
            <div aria-hidden className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-violet-300/35 blur-3xl animate-aurora-breathe" />
            <div aria-hidden className="absolute -bottom-16 -left-12 h-36 w-36 rounded-full bg-sky-300/35 blur-3xl animate-aurora-breathe [animation-delay:1.2s]" />
            <div className="relative">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--gradient-accent)] text-white shadow-[var(--glow-button)]">
                <MagicStar {...iconProps("md", undefined, "Bold", { tone: "light", interactive: false })} />
              </div>
              <h2 className="text-[var(--text-2xl)] font-[var(--font-weight-semibold)] tracking-tight sm:text-3xl">
                Turn every design review into momentum.
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-[var(--color-text-secondary)]">
                Start with a screenshot, a Figma frame, or a live link. Xdesign does the first pass for you.
              </p>
              <Link href="/upload" className="mt-8 inline-block">
                <GlassButton variant="primary" size="lg" rightIcon={<ArrowRight {...iconProps("sm", undefined, "Linear", { tone: "light", interactive: false })} />}>
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
