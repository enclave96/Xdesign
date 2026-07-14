import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type BadgeSeverity = "critical" | "high" | "medium" | "low" | "info";
export type BadgeSize = "sm" | "md";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  severity: BadgeSeverity;
  size?: BadgeSize;
  /** Show a dot indicator before the label */
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
    dot: "bg-[var(--color-severity-critical)]",
    label: "text-[var(--color-severity-critical)]",
  },
  high: {
    container:
      "bg-[var(--color-severity-high-bg)] border-[var(--color-severity-high-border)]",
    dot: "bg-[var(--color-severity-high)]",
    label: "text-[var(--color-severity-high)]",
  },
  medium: {
    container:
      "bg-[var(--color-severity-medium-bg)] border-[var(--color-severity-medium-border)]",
    dot: "bg-[var(--color-severity-medium)]",
    label: "text-[var(--color-severity-medium)]",
  },
  low: {
    container:
      "bg-[var(--color-severity-low-bg)] border-[var(--color-severity-low-border)]",
    dot: "bg-[var(--color-severity-low)]",
    label: "text-[var(--color-severity-low)]",
  },
  info: {
    container:
      "bg-[var(--color-severity-info-bg)] border-[var(--color-severity-info-border)]",
    dot: "bg-[var(--color-severity-info)]",
    label: "text-[var(--color-severity-info)]",
  },
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-[var(--text-xs)] gap-1",
  md: "px-2.5 py-1 text-[var(--text-sm)] gap-1.5",
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
        "inline-flex items-center rounded-[var(--radius-full)]",
        "border font-[var(--font-weight-medium)]",
        "backdrop-blur-[var(--blur-sm)]",
        styles.container,
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          aria-hidden
          className={cn("h-1.5 w-1.5 shrink-0 rounded-full", styles.dot)}
        />
      )}
      <span className={cn("capitalize", styles.label)}>
        {children ?? severityLabels[severity]}
      </span>
    </span>
  );
}
