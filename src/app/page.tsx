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
    <div className="relative min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
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
                className="rounded-md px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              Login
            </Link>
            <Button
              href="/register"
              size="sm"
              rightIcon={
                <ArrowRight
                  {...iconProps("xs", "-rotate-45", "Linear", { tone: "light", interactive: false })}
                />
              }
            >
              See a demo
            </Button>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <section className="grid items-center gap-12 lg:grid-cols-[1.02fr_1fr] lg:gap-10">
          <div className="animate-enter-up text-center lg:text-left">
            <Badge variant="outline" className="mb-7 gap-2 px-3 py-1.5 text-sm font-medium">
              <MagicStar {...iconProps("xs", "text-primary", "Bold", { interactive: false })} />
              Made for better interfaces
            </Badge>

            <h1 className="mx-auto max-w-xl text-[2.7rem] font-bold leading-[1.08] tracking-tight text-foreground sm:text-[3.4rem] lg:mx-0">
              Smarter design decisions{" "}
              <span className="inline-flex h-[0.85em] w-[0.85em] translate-y-[0.08em] items-center justify-center rounded-[0.22em] bg-primary align-baseline">
                <TrendUp {...iconProps("md", "h-[60%] w-[60%]", "Bold", { tone: "light", interactive: false })} />
              </span>{" "}
              powered by AI
            </h1>

            <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-muted-foreground lg:mx-0">
              Turn your screens into clear insights, better decisions, and
              continuously improved user experiences.
            </p>

            <div className="mt-8 flex justify-center lg:justify-start">
              <Button
                href="/register"
                size="lg"
                rightIcon={
                  <ArrowRight
                    {...iconProps("sm", "-rotate-45", "Linear", { tone: "light", interactive: false })}
                  />
                }
              >
                See a demo
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
              className="absolute -inset-10 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(196,181,253,0.35)_0%,transparent_65%)]"
            />

            <Card className="relative p-3 shadow-md">
              <DesignAuditIllustration />
            </Card>

            <div className="absolute -left-4 top-[30%] hidden items-center sm:flex" aria-hidden>
              <svg viewBox="0 0 12 12" className="h-3 w-3 -rotate-12 text-primary" fill="currentColor">
                <path d="M0 0L12 5L5.5 6.5L4 12L0 0Z" />
              </svg>
              <span className="ml-1 rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-800 shadow-sm">
                Maya Chen
              </span>
            </div>
            <div className="absolute -right-3 top-[58%] hidden items-center sm:flex" aria-hidden>
              <span className="mr-1 rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-800 shadow-sm">
                Sam Park
              </span>
              <svg viewBox="0 0 12 12" className="h-3 w-3 rotate-[100deg] text-pink-500" fill="currentColor">
                <path d="M0 0L12 5L5.5 6.5L4 12L0 0Z" />
              </svg>
            </div>

            <div className="absolute -bottom-6 left-1/2 hidden w-max -translate-x-1/2 items-center gap-3 sm:flex" aria-hidden>
              {[
                { dot: "bg-violet-400", label: "Score", value: "92" },
                { dot: "bg-sky-300", label: "Issues", value: "14" },
                { dot: "bg-pink-300", label: "Contrast", value: "AA" },
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

        <section id="features" className="mt-28 scroll-mt-24">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              One intelligent workspace
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
              <div aria-hidden className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-violet-300/35 blur-3xl animate-aurora-breathe" />
              <div aria-hidden className="absolute -bottom-16 -left-12 h-36 w-36 rounded-full bg-sky-300/35 blur-3xl animate-aurora-breathe [animation-delay:1.2s]" />
              <div className="relative">
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <MagicStar {...iconProps("md", undefined, "Bold", { tone: "light", interactive: false })} />
                </div>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  Turn every design review into momentum.
                </h2>
                <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
                  Start with a screenshot, a Figma frame, or a live link. Xdesign does the first pass for you.
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

      <footer className="relative z-10 border-t py-8 text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Xdesign. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
