"use client";

import { GlassCard } from "@/components/ui/GlassCard";
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
      <GlassCard title="Recommendations" className={className}>
        <p className="text-[var(--text-sm)] text-[var(--color-text-muted)]">
          Recommendations will appear once analysis is complete.
        </p>
      </GlassCard>
    );
  }

  return (
    <div className={className}>
      <GlassCard
        title="Summary"
        description={report.summary}
        className="mb-6"
      />

      {report.strengths.length > 0 && (
        <GlassCard title="Strengths" className="mb-6">
          <ul className="space-y-2">
            {report.strengths.map((strength, i) => (
              <li
                key={i}
                className="flex gap-2 text-[var(--text-sm)] text-[var(--color-text-secondary)]"
              >
                <span className="mt-0.5 text-[var(--color-blue-500)]" aria-hidden>
                  ✓
                </span>
                {strength}
              </li>
            ))}
          </ul>
        </GlassCard>
      )}

      <GlassCard title="Actionable Recommendations">
        <ol className="space-y-4">
          {report.recommendations.map((rec, i) => (
            <li key={i} className="flex gap-3">
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--gradient-accent)] text-[var(--text-xs)] font-bold text-white"
                aria-hidden
              >
                {i + 1}
              </span>
              <p className="text-[var(--text-sm)] leading-[var(--leading-relaxed)] text-[var(--color-text-secondary)]">
                {rec}
              </p>
            </li>
          ))}
        </ol>
      </GlassCard>
    </div>
  );
}
