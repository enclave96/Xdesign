"use client";

import { useMemo } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
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
  critical: "border-[var(--color-severity-critical)] bg-[rgba(220,38,38,0.15)]",
  high: "border-[var(--color-severity-high)] bg-[rgba(234,88,12,0.15)]",
  medium: "border-[var(--color-severity-medium)] bg-[rgba(217,119,6,0.15)]",
  low: "border-[var(--color-severity-low)] bg-[rgba(59,130,246,0.15)]",
  info: "border-[var(--color-severity-info)] bg-[rgba(100,116,139,0.15)]",
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
    <GlassCard
      title="Design Preview"
      description="Click markers to inspect issues"
      className={className}
      padding="none"
    >
      <div className="relative overflow-hidden rounded-b-[var(--radius-lg)] bg-[var(--color-slate-100)]">
        {!imageUrl ? (
          <div className="flex aspect-video items-center justify-center">
            <p className="text-[var(--text-sm)] text-[var(--color-text-muted)]">
              Preview unavailable
            </p>
          </div>
        ) : (
          <div className="relative w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt="Design preview"
              className="block h-auto w-full"
            />

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
                    "absolute border-2 transition-all duration-[var(--transition-fast)]",
                    severityColors[issue.severity] ?? severityColors.info,
                    isSelected
                      ? "z-10 ring-2 ring-[var(--color-purple-500)] ring-offset-2"
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
                      "absolute -left-2 -top-2 flex h-5 w-5 items-center justify-center",
                      "rounded-full text-[10px] font-bold text-white shadow-md",
                      isSelected
                        ? "bg-[var(--color-purple-600)]"
                        : "bg-[var(--color-slate-700)]"
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
    </GlassCard>
  );
}
