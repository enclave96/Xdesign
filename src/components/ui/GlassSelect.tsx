"use client";

import { forwardRef, type SelectHTMLAttributes } from "react";
import { ArrowDown } from "iconsax-reactjs";
import { cn } from "@/lib/utils";
import { iconProps } from "@/components/icons";

export type GlassSelectSize = "sm" | "md" | "lg";

export interface GlassSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  selectSize?: GlassSelectSize;
  error?: boolean;
}

const sizeStyles: Record<GlassSelectSize, string> = {
  sm: "h-9 px-3 pr-9 text-[var(--text-sm)] rounded-[var(--radius-sm)]",
  md: "h-11 px-4 pr-10 text-[var(--text-sm)] rounded-[var(--radius-md)]",
  lg: "h-12 px-4 pr-11 text-[var(--text-base)] rounded-[var(--radius-md)]",
};

export const GlassSelect = forwardRef<HTMLSelectElement, GlassSelectProps>(
  ({ className, selectSize = "md", error = false, disabled, children, ...props }, ref) => {
    return (
      <div className={cn("group relative", className)}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-1/2 rounded-t-[var(--radius-md)] bg-[var(--glass-input-shine)]"
        />
        <select
          ref={ref}
          disabled={disabled}
          className={cn(
            "relative z-[1] w-full appearance-none cursor-pointer",
            "bg-[var(--glass-bg-input)] text-[var(--color-text-primary)]",
            "border border-[var(--glass-border-input)]",
            "backdrop-blur-[var(--blur-md)] backdrop-saturate-150",
            "shadow-[inset_0_1px_2px_rgba(15,23,42,0.04),inset_0_-1px_0_rgba(255,255,255,0.6)]",
            "transition-all duration-[var(--transition-smooth)]",
            "hover:border-[var(--glass-border-strong)] hover:bg-[var(--glass-bg-elevated)]",
            "focus:outline-none focus:border-[var(--glass-border-focus)]",
            "focus:bg-[var(--glass-bg-input-focus)] focus:shadow-[var(--glow-focus-input)]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-[var(--color-severity-critical-border)]",
            sizeStyles[selectSize]
          )}
          {...props}
        >
          {children}
        </select>
        <span
          aria-hidden
          className="pointer-events-none absolute right-3 top-1/2 z-[2] -translate-y-1/2 text-[var(--color-text-primary)] transition-colors duration-[var(--transition-base)] group-hover:text-[var(--color-purple-600)] group-focus-within:text-[var(--color-purple-600)]"
        >
          <ArrowDown {...iconProps("sm", undefined, "Linear", { interactive: false })} />
        </span>
      </div>
    );
  }
);

GlassSelect.displayName = "GlassSelect";
