"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/utils";
import type { AnalysisStatus } from "@/lib/analysis/types";

export interface AnalysisProgressProps {
  status: AnalysisStatus;
  className?: string;
}

const steps = [
  { key: "pending", label: "Queued", description: "Waiting to start" },
  { key: "processing", label: "Analyzing", description: "Running UX checks" },
  { key: "completed", label: "Complete", description: "Report ready" },
] as const;

function getStepState(
  stepKey: string,
  status: AnalysisStatus
): "done" | "active" | "pending" | "failed" {
  if (status === "failed") {
    if (stepKey === "pending") return "done";
    if (stepKey === "processing") return "failed";
    return "pending";
  }

  const order = ["pending", "processing", "completed"];
  const currentIndex = order.indexOf(status);
  const stepIndex = order.indexOf(stepKey);

  if (stepIndex < currentIndex) return "done";
  if (stepIndex === currentIndex) return "active";
  return "pending";
}

export function AnalysisProgress({ status, className }: AnalysisProgressProps) {
  const isProcessing = status === "pending" || status === "processing";

  return (
    <GlassCard
      title="Analysis in Progress"
      description={
        status === "failed"
          ? "Analysis failed. Please try again."
          : "Your design is being evaluated across multiple UX dimensions."
      }
      className={className}
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {steps.map((step, index) => {
            const state = getStepState(step.key, status);
            return (
              <div key={step.key} className="flex flex-1 items-center gap-3">
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                    "text-[var(--text-sm)] font-[var(--font-weight-bold)]",
                    "border-2 transition-colors",
                    state === "done" &&
                      "border-[var(--color-blue-500)] bg-[var(--color-blue-500)] text-white",
                    state === "active" &&
                      "border-[var(--color-purple-500)] bg-[var(--color-purple-100)] text-[var(--color-purple-700)]",
                    state === "failed" &&
                      "border-[var(--color-severity-critical)] bg-[var(--color-severity-critical-bg)] text-[var(--color-severity-critical)]",
                    state === "pending" &&
                      "border-[var(--glass-border)] bg-[var(--glass-bg-subtle)] text-[var(--color-text-muted)]"
                  )}
                >
                  {state === "done" ? (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-[var(--text-sm)] font-[var(--font-weight-semibold)] text-[var(--color-text-primary)]">
                    {step.label}
                  </p>
                  <p className="text-[var(--text-xs)] text-[var(--color-text-muted)]">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {isProcessing && (
          <ProgressBar
            value={status === "pending" ? 25 : 65}
            indeterminate={status === "processing"}
            label="Processing your design"
            showLabel
          />
        )}
      </div>
    </GlassCard>
  );
}
