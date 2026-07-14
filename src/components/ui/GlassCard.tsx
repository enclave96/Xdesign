import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { GlassPanel, type GlassPanelProps } from "./GlassPanel";

export interface GlassCardProps
  extends Omit<GlassPanelProps, "children" | "title">,
    Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode;
  description?: ReactNode;
  headerAction?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      className,
      title,
      description,
      headerAction,
      footer,
      children,
      padding = "none",
      variant = "default",
      shine = true,
      ...props
    },
    ref
  ) => {
    const hasHeader = title || description || headerAction;

    return (
      <GlassPanel
        ref={ref}
        className={cn("flex flex-col", className)}
        padding={padding}
        variant={variant}
        shine={shine}
        {...props}
      >
        {hasHeader && (
          <header
            className={cn(
              "flex items-start justify-between gap-4",
              "border-b border-[var(--glass-border-subtle)]",
              "px-6 py-5"
            )}
          >
            <div className="min-w-0 flex-1">
              {title && (
                <h3 className="text-[var(--text-lg)] font-[var(--font-weight-semibold)] leading-[var(--leading-tight)] text-[var(--color-text-primary)]">
                  {title}
                </h3>
              )}
              {description && (
                <p className="mt-1 text-[var(--text-sm)] leading-[var(--leading-normal)] text-[var(--color-text-secondary)]">
                  {description}
                </p>
              )}
            </div>
            {headerAction && (
              <div className="shrink-0">{headerAction}</div>
            )}
          </header>
        )}

        {children && (
          <div className={cn(hasHeader ? "px-6 py-5" : "p-6")}>
            {children}
          </div>
        )}

        {footer && (
          <footer
            className={cn(
              "border-t border-[var(--glass-border-subtle)]",
              "px-6 py-4"
            )}
          >
            {footer}
          </footer>
        )}
      </GlassPanel>
    );
  }
);

GlassCard.displayName = "GlassCard";
