"use client";

import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type GlassInputSize = "sm" | "md" | "lg";

export interface GlassInputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputSize?: GlassInputSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  error?: boolean;
}

const sizeStyles: Record<GlassInputSize, string> = {
  sm: "h-9 px-3 text-[var(--text-sm)] rounded-[var(--radius-sm)]",
  md: "h-11 px-4 text-[var(--text-sm)] rounded-[var(--radius-md)]",
  lg: "h-12 px-4 text-[var(--text-base)] rounded-[var(--radius-md)]",
};

export const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  (
    {
      className,
      inputSize = "md",
      leftIcon,
      rightIcon,
      error = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const hasIcon = leftIcon || rightIcon;

    const inputClasses = cn(
      "w-full bg-[var(--glass-bg-input)] text-[var(--color-text-primary)]",
      "border border-[var(--glass-border-input)]",
      "backdrop-blur-[var(--blur-md)] backdrop-saturate-150",
      "shadow-[inset_0_1px_2px_rgba(15,23,42,0.04),inset_0_-1px_0_rgba(255,255,255,0.6)]",
      "placeholder:text-[var(--color-text-muted)]",
      "transition-all duration-[var(--transition-smooth)]",
      "hover:border-[var(--glass-border-strong)] hover:bg-[var(--glass-bg-elevated)]",
      "focus:outline-none focus:border-[var(--glass-border-focus)]",
      "focus:bg-[var(--glass-bg-input-focus)] focus:shadow-[var(--glow-focus-input)]",
      "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-[var(--glass-border-input)]",
      error && "border-[var(--color-severity-critical-border)] focus:shadow-[0_0_0_3px_rgba(220,38,38,0.15)]",
      sizeStyles[inputSize],
      leftIcon && "pl-10",
      rightIcon && "pr-10",
      !hasIcon && className
    );

    if (!hasIcon) {
      return (
        <div className={cn("relative", className)}>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-1/2 rounded-t-[var(--radius-md)] bg-[var(--glass-input-shine)]"
          />
          <input ref={ref} disabled={disabled} className={cn(inputClasses, "relative z-[1]")} {...props} />
        </div>
      );
    }

    return (
      <div className={cn("relative", className)}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-1/2 rounded-t-[var(--radius-md)] bg-[var(--glass-input-shine)]"
        />
        {leftIcon && (
          <span className="pointer-events-none absolute left-3 top-1/2 z-[2] -translate-y-1/2 text-[var(--color-text-muted)]">
            {leftIcon}
          </span>
        )}
        <input ref={ref} disabled={disabled} className={cn(inputClasses, "relative z-[1]")} {...props} />
        {rightIcon && (
          <span className="pointer-events-none absolute right-3 top-1/2 z-[2] -translate-y-1/2 text-[var(--color-text-muted)]">
            {rightIcon}
          </span>
        )}
      </div>
    );
  }
);

GlassInput.displayName = "GlassInput";
