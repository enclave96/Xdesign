"use client";

import { SectionCard } from "@/components/ui/SectionCard";
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
    <SectionCard
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
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors",
                    state === "done" && "border-blue-600 bg-blue-600 text-white",
                    state === "active" && "border-primary bg-primary/10 text-primary",
                    state === "failed" && "border-destructive bg-destructive/10 text-destructive",
                    state === "pending" && "border-border bg-muted text-muted-foreground"
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
                  <p className="text-sm font-semibold text-foreground">{step.label}</p>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
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
    </SectionCard>
  );
}
