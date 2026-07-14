import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type GlassPanelVariant = "default" | "elevated" | "subtle" | "strong";
export type GlassPanelPadding = "none" | "sm" | "md" | "lg";

export interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  variant?: GlassPanelVariant;
  padding?: GlassPanelPadding;
  shine?: boolean;
  /** Subtle lift on hover */
  hoverLift?: boolean;
  children?: ReactNode;
}

const variantStyles: Record<GlassPanelVariant, string> = {
  default:
    "bg-[var(--glass-bg)] shadow-[var(--shadow-glass-md)] border-[var(--glass-border)]",
  elevated:
    "bg-[var(--glass-bg-elevated)] shadow-[var(--shadow-glass-lg)] border-[var(--glass-border-strong)]",
  subtle:
    "bg-[var(--glass-bg-subtle)] shadow-[var(--shadow-glass-sm)] border-[var(--glass-border-subtle)]",
  strong:
    "bg-[var(--glass-bg-strong)] shadow-[var(--shadow-glass-xl)] border-[var(--glass-border-strong)]",
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
      hoverLift = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group/panel relative overflow-hidden rounded-[var(--radius-lg)] border",
          "backdrop-blur-[var(--blur-lg)] backdrop-saturate-150",
          "transition-all duration-[var(--transition-smooth)]",
          variantStyles[variant],
          paddingStyles[padding],
          hoverLift && "hover:-translate-y-0.5 hover:shadow-[var(--shadow-glass-lg)]",
          className
        )}
        {...props}
      >
        {/* Gradient border shimmer */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-60"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.5) 0%, transparent 40%, rgba(196,181,253,0.15) 100%)",
            mask: "linear-gradient(#fff 0 0) content-box exclude, linear-gradient(#fff 0 0)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box exclude, linear-gradient(#fff 0 0)",
            padding: "1px",
          }}
        />

        {shine && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-[42%] bg-[var(--gradient-reflection)]"
          />
        )}

        {/* Bottom inner glow for depth */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white/5 to-transparent"
        />

        <div className="relative z-[1]">{children}</div>
      </div>
    );
  }
);

GlassPanel.displayName = "GlassPanel";
