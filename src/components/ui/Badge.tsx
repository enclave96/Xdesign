import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type BadgeSeverity = "critical" | "high" | "medium" | "low" | "info";
export type BadgeSize = "sm" | "md";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  severity: BadgeSeverity;
  size?: BadgeSize;
  dot?: boolean;
  children: React.ReactNode;
}

const severityStyles: Record<
  BadgeSeverity,
  { container: string; dot: string; label: string }
> = {
  critical: {
    container:
      "bg-[var(--color-severity-critical-bg)] border-[var(--color-severity-critical-border)]",
    dot: "bg-[var(--color-severity-critical)] shadow-[0_0_6px_rgba(220,38,38,0.5)]",
    label: "text-[var(--color-severity-critical)]",
  },
  high: {
    container:
      "bg-[var(--color-severity-high-bg)] border-[var(--color-severity-high-border)]",
    dot: "bg-[var(--color-severity-high)] shadow-[0_0_6px_rgba(234,88,12,0.45)]",
    label: "text-[var(--color-severity-high)]",
  },
  medium: {
    container:
      "bg-[var(--color-severity-medium-bg)] border-[var(--color-severity-medium-border)]",
    dot: "bg-[var(--color-severity-medium)] shadow-[0_0_6px_rgba(217,119,6,0.4)]",
    label: "text-[var(--color-severity-medium)]",
  },
  low: {
    container:
      "bg-[var(--color-severity-low-bg)] border-[var(--color-severity-low-border)]",
    dot: "bg-[var(--color-severity-low)] shadow-[0_0_6px_rgba(22,163,74,0.4)]",
    label: "text-[var(--color-severity-low)]",
  },
  info: {
    container:
      "bg-[var(--color-severity-info-bg)] border-[var(--color-severity-info-border)]",
    dot: "bg-[var(--color-severity-info)] shadow-[0_0_6px_rgba(37,99,235,0.4)]",
    label: "text-[var(--color-severity-info)]",
  },
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2.5 py-0.5 text-[var(--text-xs)] gap-1.5",
  md: "px-3 py-1 text-[var(--text-sm)] gap-2",
};

const severityLabels: Record<BadgeSeverity, string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
  info: "Info",
};

export function Badge({
  className,
  severity,
  size = "md",
  dot = true,
  children,
  ...props
}: BadgeProps) {
  const styles = severityStyles[severity];

  return (
    <span
      role="status"
      className={cn(
        "relative inline-flex items-center overflow-hidden rounded-[var(--radius-full)]",
        "border font-[var(--font-weight-medium)]",
        "backdrop-blur-[var(--blur-sm)] backdrop-saturate-150",
        "shadow-[var(--shadow-glass-sm)]",
        "transition-transform duration-[var(--transition-fast)]",
        styles.container,
        sizeStyles[size],
        className
      )}
      {...props}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-[var(--glass-input-shine)] opacity-50"
      />
      {dot && (
        <span
          aria-hidden
          className={cn("relative h-1.5 w-1.5 shrink-0 rounded-full", styles.dot)}
        />
      )}
      <span className={cn("relative capitalize", styles.label)}>
        {children ?? severityLabels[severity]}
      </span>
    </span>
  );
}
