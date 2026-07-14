"use client";

import { ScoreRing } from "@/components/ui/ScoreRing";
import { SectionCard } from "@/components/ui/SectionCard";
import { SCORE_CATEGORY_LABELS } from "@/lib/api";
import type { CategoryScores } from "@/lib/analysis/types";

export interface ScoreGridProps {
  scores: CategoryScores;
  className?: string;
}

export function ScoreGrid({ scores, className }: ScoreGridProps) {
  const entries = Object.entries(scores) as [keyof CategoryScores, number][];

  return (
    <SectionCard
      title="Category Scores"
      description="Breakdown across key UX dimensions"
      className={className}
    >
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {entries.map(([key, value]) => (
          <div
            key={key}
            className="flex flex-col items-center rounded-md bg-muted/50 px-4 py-5"
          >
            <ScoreRing score={value} size="sm" label={SCORE_CATEGORY_LABELS[key]} />
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
