import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type GlassPanelVariant = "default" | "elevated" | "subtle" | "strong";
export type GlassPanelPadding = "none" | "sm" | "md" | "lg";

export interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  variant?: GlassPanelVariant;
  padding?: GlassPanelPadding;
  /** Show top reflection shine overlay */
  shine?: boolean;
  children?: ReactNode;
}

const variantStyles: Record<GlassPanelVariant, string> = {
  default: "bg-[var(--glass-bg)] shadow-[var(--shadow-glass-md)]",
  elevated: "bg-[var(--glass-bg-elevated)] shadow-[var(--shadow-glass-lg)]",
  subtle: "bg-[var(--glass-bg-subtle)] shadow-[var(--shadow-glass-sm)]",
  strong: "bg-[var(--glass-bg-strong)] shadow-[var(--shadow-glass-xl)]",
};

const paddingStyles: Record<GlassPanelPadding, string> = {
  none: "p-0",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  (
    {
      className,
      variant = "default",
      padding = "md",
      shine = true,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-[var(--radius-lg)]",
          "border border-[var(--glass-border)]",
          "backdrop-blur-[var(--blur-lg)]",
          variantStyles[variant],
          paddingStyles[padding],
          className
        )}
        {...props}
      >
        {shine && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-[var(--gradient-reflection)]"
          />
        )}
        <div className="relative z-[1]">{children}</div>
      </div>
    );
  }
);

GlassPanel.displayName = "GlassPanel";
