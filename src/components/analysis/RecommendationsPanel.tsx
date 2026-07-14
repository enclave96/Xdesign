"use client";

import { SectionCard } from "@/components/ui/SectionCard";
import type { AnalysisReport } from "@/lib/analysis/types";

export interface RecommendationsPanelProps {
  report: AnalysisReport | null;
  className?: string;
}

export function RecommendationsPanel({
  report,
  className,
}: RecommendationsPanelProps) {
  if (!report) {
    return (
      <SectionCard title="Recommendations" className={className}>
        <p className="text-sm text-muted-foreground">
          Recommendations will appear once analysis is complete.
        </p>
      </SectionCard>
    );
  }

  return (
    <div className={className}>
      <SectionCard title="Summary" description={report.summary} className="mb-6" />

      {report.strengths.length > 0 && (
        <SectionCard title="Strengths" className="mb-6">
          <ul className="space-y-2">
            {report.strengths.map((strength, i) => (
              <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                <span className="mt-0.5 text-blue-600" aria-hidden>
                  ✓
                </span>
                {strength}
              </li>
            ))}
          </ul>
        </SectionCard>
      )}

      <SectionCard title="Actionable Recommendations">
        <ol className="space-y-4">
          {report.recommendations.map((rec, i) => (
            <li key={i} className="flex gap-3">
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground"
                aria-hidden
              >
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed text-muted-foreground">{rec}</p>
            </li>
          ))}
        </ol>
      </SectionCard>
    </div>
  );
}
