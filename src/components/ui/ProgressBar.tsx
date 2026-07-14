import { cn } from "@/lib/utils";

export type ProgressBarVariant = "default" | "success" | "warning" | "danger";
export type ProgressBarSize = "sm" | "md" | "lg";

export interface ProgressBarProps {
  /** Progress value from 0 to 100 */
  value: number;
  variant?: ProgressBarVariant;
  size?: ProgressBarSize;
  /** Show percentage label */
  showLabel?: boolean;
  /** Custom label text (overrides percentage) */
  label?: string;
  /** Indeterminate loading animation */
  indeterminate?: boolean;
  /** Animate value changes */
  animated?: boolean;
  className?: string;
}

const sizeStyles: Record<ProgressBarSize, { track: string; bar: string }> = {
  sm: { track: "h-1.5", bar: "h-1.5" },
  md: { track: "h-2.5", bar: "h-2.5" },
  lg: { track: "h-4", bar: "h-4" },
};

const variantStyles: Record<ProgressBarVariant, string> = {
  default: "bg-[var(--gradient-accent)]",
  success: "bg-gradient-to-r from-emerald-400 to-emerald-600",
  warning: "bg-gradient-to-r from-amber-400 to-orange-500",
  danger: "bg-gradient-to-r from-red-400 to-red-600",
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
        <div className="mb-2 flex items-center justify-between">
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
          "backdrop-blur-[var(--blur-sm)] shadow-[var(--shadow-inner-glow)]",
          sizeStyles[size].track
        )}
      >
        {indeterminate ? (
          <div
            className={cn(
              "absolute inset-y-0 w-1/3 rounded-[var(--radius-full)]",
              variantStyles[variant],
              "animate-progress-indeterminate"
            )}
          />
        ) : (
          <div
            className={cn(
              "h-full rounded-[var(--radius-full)]",
              variantStyles[variant],
              "shadow-[0_0_12px_rgba(99,102,241,0.35)]",
              animated && "transition-[width] duration-[var(--transition-slow)] ease-out"
            )}
            style={{ width: `${clampedValue}%` }}
          />
        )}

        {/* Glass shine overlay on track */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[var(--gradient-reflection)] opacity-50"
        />
      </div>
    </div>
  );
}
