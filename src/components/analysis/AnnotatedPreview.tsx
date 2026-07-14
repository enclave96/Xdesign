"use client";

import { useMemo } from "react";
import { SectionCard } from "@/components/ui/SectionCard";
import type { IssueRecord } from "@/lib/api";
import { cn } from "@/lib/utils";

export interface AnnotatedPreviewProps {
  imageUrl: string | null;
  issues: IssueRecord[];
  selectedIssueId?: string | null;
  onIssueClick?: (issue: IssueRecord) => void;
  className?: string;
}

const severityColors: Record<string, string> = {
  critical: "border-red-600 bg-red-500/15",
  high: "border-orange-600 bg-orange-500/15",
  medium: "border-amber-600 bg-amber-500/15",
  low: "border-blue-600 bg-blue-500/15",
  info: "border-slate-500 bg-slate-500/15",
};

export function AnnotatedPreview({
  imageUrl,
  issues,
  selectedIssueId,
  onIssueClick,
  className,
}: AnnotatedPreviewProps) {
  const annotatedIssues = useMemo(
    () =>
      issues.filter(
        (issue) =>
          issue.x != null &&
          issue.y != null &&
          issue.width != null &&
          issue.height != null
      ),
    [issues]
  );

  return (
    <SectionCard
      title="Design Preview"
      description="Click markers to inspect issues"
      className={className}
      contentClassName="p-0"
    >
      <div className="relative overflow-hidden rounded-b-lg bg-muted">
        {!imageUrl ? (
          <div className="flex aspect-video items-center justify-center">
            <p className="text-sm text-muted-foreground">Preview unavailable</p>
          </div>
        ) : (
          <div className="relative w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageUrl} alt="Design preview" className="block h-auto w-full" />

            {annotatedIssues.map((issue, index) => {
              const isSelected = selectedIssueId === issue.id;
              const hasCoords =
                issue.x != null &&
                issue.y != null &&
                issue.width != null &&
                issue.height != null;

              if (!hasCoords) return null;

              return (
                <button
                  key={issue.id}
                  type="button"
                  aria-label={`Issue: ${issue.title}`}
                  onClick={() => onIssueClick?.(issue)}
                  className={cn(
                    "absolute border-2 transition-all",
                    severityColors[issue.severity] ?? severityColors.info,
                    isSelected
                      ? "z-10 ring-2 ring-primary ring-offset-2"
                      : "hover:brightness-110"
                  )}
                  style={{
                    left: `${issue.x}%`,
                    top: `${issue.y}%`,
                    width: `${issue.width}%`,
                    height: `${issue.height}%`,
                  }}
                >
                  <span
                    className={cn(
                      "absolute -left-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white shadow-md",
                      isSelected ? "bg-primary" : "bg-slate-700"
                    )}
                  >
                    {index + 1}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </SectionCard>
  );
}
