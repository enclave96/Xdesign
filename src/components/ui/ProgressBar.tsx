"use client";

import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

export type ProgressBarVariant = "default" | "success" | "warning" | "danger";
export type ProgressBarSize = "sm" | "md" | "lg";

export interface ProgressBarProps {
  value: number;
  variant?: ProgressBarVariant;
  size?: ProgressBarSize;
  showLabel?: boolean;
  label?: string;
  indeterminate?: boolean;
  className?: string;
}

const sizeStyles: Record<ProgressBarSize, string> = {
  sm: "h-2",
  md: "h-3",
  lg: "h-4",
};

const variantStyles: Record<ProgressBarVariant, string> = {
  default: "[&>div]:bg-primary",
  success: "[&>div]:bg-green-600",
  warning: "[&>div]:bg-amber-500",
  danger: "[&>div]:bg-destructive",
};

export function ProgressBar({
  value,
  variant = "default",
  size = "md",
  showLabel = false,
  label,
  indeterminate = false,
  className,
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));
  const displayLabel = label ?? `${Math.round(clampedValue)}%`;

  return (
    <div className={cn("w-full", className)}>
      {(showLabel || label) && (
        <div className="mb-2.5 flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            {label ? label : "Progress"}
          </span>
          {!indeterminate && (
            <span className="text-sm font-semibold tabular-nums text-foreground">
              {displayLabel}
            </span>
          )}
        </div>
      )}

      {indeterminate ? (
        <div
          role="progressbar"
          aria-label={label ?? "Processing"}
          className={cn(
            "relative w-full overflow-hidden rounded-full bg-secondary",
            sizeStyles[size]
          )}
        >
          <div
            className={cn(
              "absolute inset-y-0 w-2/5 rounded-full bg-primary animate-progress-indeterminate"
            )}
          />
        </div>
      ) : (
        <Progress
          value={clampedValue}
          aria-label={label ?? `Progress: ${clampedValue}%`}
          className={cn(sizeStyles[size], variantStyles[variant])}
        />
      )}
    </div>
  );
}
