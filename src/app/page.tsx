import Link from "next/link";
import { ArrowRight, MagicStar, TrendUp } from "iconsax-reactjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DesignAuditIllustration } from "@/components/illustrations/DesignAuditIllustration";
import {
  FeatureIllustration,
  type FeatureIllustrationType,
} from "@/components/illustrations/FeatureIllustrations";
import { MarketingHeader } from "@/components/layout/MarketingHeader";
import { MarketingFooter } from "@/components/layout/MarketingFooter";
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

const solutions = [
  {
    title: "Product teams",
    description: "Ship confident UI changes with objective scores before every release.",
  },
  {
    title: "Design agencies",
    description: "Deliver polished audit reports clients can act on in minutes, not days.",
  },
  {
    title: "Growth & marketing",
    description: "Catch conversion-killing UX issues on landing pages before they cost leads.",
  },
];

const platformStats = [
  { value: "8", label: "UX dimensions scored" },
  { value: "WCAG", label: "Accessibility checks" },
  { value: "HTML", label: "Exportable reports" },
  { value: "3", label: "Import sources" },
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
    <div className="relative min-h-screen bg-background">
      <MarketingHeader />

      <main className="relative z-10 mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <section className="grid items-center gap-12 lg:grid-cols-[1.02fr_1fr] lg:gap-10">
          <div className="animate-enter-up text-center lg:text-left">
            <Badge variant="outline" className="mb-7 gap-2 border-orange-200 bg-orange-50 px-3 py-1.5 text-sm font-medium text-orange-800">
              <MagicStar {...iconProps("xs", "text-[#F65B19]", "Bold", { interactive: false })} />
              Made for better interfaces
            </Badge>

            <h1 className="mx-auto max-w-xl text-[2.7rem] font-bold leading-[1.08] tracking-tight text-foreground sm:text-[3.4rem] lg:mx-0">
              Smarter design decisions{" "}
              <span className="inline-flex h-[0.85em] w-[0.85em] translate-y-[0.08em] items-center justify-center rounded-[0.22em] bg-brand-gradient align-baseline shadow-sm">
                <TrendUp {...iconProps("md", "h-[60%] w-[60%]", "Bold", { tone: "light", interactive: false })} />
              </span>{" "}
              powered by AI
            </h1>

            <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-muted-foreground lg:mx-0">
              Turn your screens into clear insights, better decisions, and
              continuously improved user experiences.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Button
                href="/register"
                size="lg"
                rightIcon={
                  <ArrowRight
                    {...iconProps("sm", "-rotate-45", "Linear", { tone: "light", interactive: false })}
                  />
                }
              >
                Get started free
              </Button>
              <Button href="#platform" variant="outline" size="lg">
                See how it works
              </Button>
            </div>

            <dl className="mt-12 flex items-start justify-center gap-10 text-left sm:gap-14 lg:justify-start">
              {[
                { value: "5k+", label: "Screens analyzed" },
                { value: "40%+", label: "Fewer UX issues" },
                { value: "3×", label: "Faster reviews" },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="text-[1.7rem] font-bold tracking-tight text-foreground">
                    {stat.value}
                  </dd>
                  <dd className="mt-0.5 text-sm text-muted-foreground">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="animate-enter-scale relative">
            <div
              aria-hidden
              className="absolute -inset-10 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(246,91,25,0.18)_0%,transparent_65%)]"
            />

            <Card className="relative p-3 shadow-md">
              <DesignAuditIllustration />
            </Card>

            <div className="absolute -left-2 top-[28%] hidden sm:block animate-hero-callout" aria-hidden>
              <div className="flex items-center">
                <svg viewBox="0 0 12 12" className="h-3.5 w-3.5 -rotate-[18deg] text-[#F65B19]" fill="currentColor">
                  <path d="M0 0L12 5L5.5 6.5L4 12L0 0Z" />
                </svg>
                <span className="ml-1.5 inline-flex items-center gap-2 rounded-full border border-orange-200/80 bg-white/95 px-3 py-1.5 text-xs font-semibold text-orange-900 shadow-[0_8px_24px_rgba(246,91,25,0.12)]">
                  <span className="h-2 w-2 rounded-full bg-[#F65B19] shadow-[0_0_0_3px_rgba(246,91,25,0.18)]" />
                  Maya Chen
                </span>
              </div>
              <svg
                viewBox="0 0 80 48"
                className="ml-6 mt-1 h-10 w-16 text-[#F65B19]/35"
                fill="none"
                aria-hidden
              >
                <path
                  d="M4 4C28 8 42 30 76 44"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="4 5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="absolute -bottom-6 left-1/2 hidden w-max -translate-x-1/2 items-center gap-3 sm:flex" aria-hidden>
              {[
                { dot: "bg-[#F65B19]", label: "Score", value: "92" },
                { dot: "bg-[#FF934D]", label: "Issues", value: "14" },
                { dot: "bg-orange-300", label: "Contrast", value: "AA" },
              ].map((chip) => (
                <span
                  key={chip.label}
                  className="inline-flex items-center gap-2 rounded-xl border bg-card px-3.5 py-2 text-sm shadow-sm"
                >
                  <span className={`h-2.5 w-2.5 rounded-[3px] ${chip.dot}`} />
                  <span className="text-muted-foreground">{chip.label}</span>
                  <span className="font-bold text-foreground">{chip.value}</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="platform" className="mt-28 scroll-mt-24">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Platform</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-4xl">
              One workspace for every design review
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Upload, score, annotate, and share — Orbital brings UX analysis, accessibility checks,
              and exportable reports into a single connected workflow.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {platformStats.map((stat) => (
              <Card key={stat.label} className="text-center">
                <CardContent className="py-6">
                  <p className="text-2xl font-bold text-brand-gradient">{stat.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="features" className="mt-28 scroll-mt-24">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Features
            </p>
            <h2 className="mt-3 text-center text-2xl font-semibold tracking-tight sm:text-4xl">
              Feedback your whole team can act on
            </h2>
          </div>
          <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
            Professional-grade analysis powered by modern UX heuristics and
            accessibility standards.
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className="animate-enter-up transition-shadow hover:shadow-md"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <CardContent className="p-5">
                  <FeatureIllustration type={feature.illustration} />
                  <h3 className="mt-4 text-lg font-semibold leading-tight text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-normal text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="solutions" className="mt-28 scroll-mt-24">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Solutions</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-4xl">
              Built for every team that ships interfaces
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {solutions.map((item) => (
              <Card key={item.title} className="border-orange-100 bg-gradient-to-b from-orange-50/80 to-card">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="reports" className="mt-28 scroll-mt-24 rounded-2xl border bg-muted/30 p-8 sm:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Reports</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                Annotated reports your stakeholders understand
              </h2>
              <p className="mt-4 text-muted-foreground">
                Export HTML reports with scores, issue markers, severity filters, and prioritised
                recommendations — ready to share with product, design, and engineering.
              </p>
              <Button href="/register" className="mt-6">
                Start analyzing
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["Score breakdown", "Issue markers", "WCAG checks", "Export HTML"].map((item) => (
                <div key={item} className="rounded-lg border bg-card p-4 text-sm font-medium shadow-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="integrations" className="mt-28 scroll-mt-24 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Integrations</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            Bring designs from anywhere
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {["Figma", "Screenshots", "Live URLs", "Slack", "Notion", "Jira"].map((name) => (
              <Badge key={name} variant="outline" className="px-4 py-2 text-sm">
                {name}
              </Badge>
            ))}
          </div>
        </section>

        <section id="pricing" className="mt-28 scroll-mt-24">
          <Card className="overflow-hidden">
            <CardContent className="grid gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">Pricing</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Start free. Scale when your team does.
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Run your first analyses at no cost. Upgrade when you need team workspaces,
                  compare mode, and advanced reporting.
                </p>
              </div>
              <div className="rounded-xl bg-brand-gradient p-8 text-white shadow-lg">
                <p className="text-sm font-medium opacity-90">Starter</p>
                <p className="mt-2 text-4xl font-bold">$0</p>
                <p className="mt-1 text-sm opacity-90">per month · unlimited trial analyses</p>
                <Button href="/register" variant="secondary" className="mt-6 w-full bg-white text-orange-700 hover:bg-white/90">
                  Sign up free
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="resources" className="mt-28 scroll-mt-24">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Resources</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-4xl">
              Learn, compare, and improve
            </h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { title: "UX audit checklist", desc: "A practical guide for pre-release reviews." },
              { title: "WCAG quick reference", desc: "Contrast, targets, and typography basics." },
              { title: "Design review playbook", desc: "How high-performing teams run critiques." },
            ].map((item) => (
              <Card key={item.title}>
                <CardContent className="p-5">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="faq" className="mx-auto mt-24 max-w-3xl scroll-mt-24">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">FAQ</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-4xl">
              Good questions, clear answers.
            </h2>
          </div>
          <Card className="mt-8">
            <CardContent className="px-6">
              <Accordion type="single" collapsible>
                {faqs.map((faq, index) => (
                  <AccordionItem key={faq.question} value={`faq-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>

        <section className="mt-24">
          <Card className="overflow-visible text-center">
            <CardContent className="relative px-8 py-12">
              <div aria-hidden className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-orange-300/35 blur-3xl animate-aurora-breathe" />
              <div aria-hidden className="absolute -bottom-16 -left-12 h-36 w-36 rounded-full bg-amber-300/35 blur-3xl animate-aurora-breathe [animation-delay:1.2s]" />
              <div className="relative">
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-gradient text-white shadow-sm">
                  <MagicStar {...iconProps("md", undefined, "Bold", { tone: "light", interactive: false })} />
                </div>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  Turn every design review into momentum.
                </h2>
                <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
                  Start with a screenshot, a Figma frame, or a live link. Orbital does the first pass for you.
                </p>
                <Button
                  href="/upload"
                  size="lg"
                  className="mt-8"
                  rightIcon={<ArrowRight {...iconProps("sm", undefined, "Linear", { tone: "light", interactive: false })} />}
                >
                  Upload your first design
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
