import { cn } from "@/lib/utils";

export type ProgressBarVariant = "default" | "success" | "warning" | "danger";
export type ProgressBarSize = "sm" | "md" | "lg";

export interface ProgressBarProps {
  value: number;
  variant?: ProgressBarVariant;
  size?: ProgressBarSize;
  showLabel?: boolean;
  label?: string;
  indeterminate?: boolean;
  animated?: boolean;
  className?: string;
}

const sizeStyles: Record<ProgressBarSize, { track: string; bar: string }> = {
  sm: { track: "h-2", bar: "h-2" },
  md: { track: "h-3", bar: "h-3" },
  lg: { track: "h-4", bar: "h-4" },
};

const variantStyles: Record<ProgressBarVariant, string> = {
  default: "bg-[var(--gradient-primary)]",
  success: "bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500",
  warning: "bg-gradient-to-r from-amber-400 via-orange-400 to-orange-500",
  danger: "bg-gradient-to-r from-red-400 via-red-500 to-rose-500",
};

export function ProgressBar({
  value,
  variant = "default",
  size = "md",
  showLabel = false,
  label,
  indeterminate = false,
  animated = true,
  className,
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));
  const displayLabel = label ?? `${Math.round(clampedValue)}%`;

  return (
    <div className={cn("w-full", className)}>
      {(showLabel || label) && (
        <div className="mb-2.5 flex items-center justify-between">
          <span className="text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[var(--color-text-secondary)]">
            {label ? label : "Progress"}
          </span>
          {!indeterminate && (
            <span className="text-[var(--text-sm)] font-[var(--font-weight-semibold)] tabular-nums text-[var(--color-text-primary)]">
              {displayLabel}
            </span>
          )}
        </div>
      )}

      <div
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? `Progress: ${clampedValue}%`}
        className={cn(
          "relative w-full overflow-hidden rounded-[var(--radius-full)]",
          "bg-[var(--glass-bg-subtle)] border border-[var(--glass-border-subtle)]",
          "backdrop-blur-[var(--blur-sm)]",
          "shadow-[inset_0_1px_3px_rgba(15,23,42,0.06),var(--shadow-inner-glow)]",
          sizeStyles[size].track
        )}
      >
        {indeterminate ? (
          <div
            className={cn(
              "absolute inset-y-0 w-2/5 rounded-[var(--radius-full)]",
              variantStyles[variant],
              "shadow-[0_0_16px_rgba(99,102,241,0.4)]",
              "animate-progress-indeterminate"
            )}
          >
            <div className="absolute inset-0 animate-liquid-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </div>
        ) : (
          <div
            className={cn(
              "relative h-full overflow-hidden rounded-[var(--radius-full)]",
              variantStyles[variant],
              "shadow-[0_0_16px_rgba(99,102,241,0.35)]",
              animated && "transition-[width] duration-[var(--transition-liquid)] ease-out"
            )}
            style={{ width: `${clampedValue}%` }}
          >
            <div className="absolute inset-0 animate-liquid-shimmer bg-gradient-to-r from-transparent via-white/35 to-transparent" />
          </div>
        )}

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[var(--gradient-reflection)] opacity-40"
        />
      </div>
    </div>
  );
}
