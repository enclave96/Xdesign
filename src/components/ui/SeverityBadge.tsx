import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type BadgeSeverity = "critical" | "high" | "medium" | "low" | "info";
export type BadgeSize = "sm" | "md";

export interface SeverityBadgeProps extends HTMLAttributes<HTMLSpanElement> {
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
    container: "border-red-200 bg-red-50",
    dot: "bg-red-600",
    label: "text-red-700",
  },
  high: {
    container: "border-orange-200 bg-orange-50",
    dot: "bg-orange-600",
    label: "text-orange-700",
  },
  medium: {
    container: "border-amber-200 bg-amber-50",
    dot: "bg-amber-600",
    label: "text-amber-700",
  },
  low: {
    container: "border-green-200 bg-green-50",
    dot: "bg-green-600",
    label: "text-green-700",
  },
  info: {
    container: "border-blue-200 bg-blue-50",
    dot: "bg-blue-600",
    label: "text-blue-700",
  },
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2.5 py-0.5 text-xs gap-1.5",
  md: "px-3 py-1 text-sm gap-2",
};

const severityLabels: Record<BadgeSeverity, string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
  info: "Info",
};

export function SeverityBadge({
  className,
  severity,
  size = "md",
  dot = true,
  children,
  ...props
}: SeverityBadgeProps) {
  const styles = severityStyles[severity];

  return (
    <span
      role="status"
      className={cn(
        "inline-flex items-center rounded-full border font-medium",
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
