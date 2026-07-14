import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type GlassButtonVariant = "primary" | "secondary" | "ghost";
export type GlassButtonSize = "sm" | "md" | "lg";

export interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: GlassButtonVariant;
  size?: GlassButtonSize;
  /** Render as full-width block */
  fullWidth?: boolean;
  /** Show loading spinner and disable interaction */
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
}

const variantStyles: Record<GlassButtonVariant, string> = {
  primary: cn(
    "bg-[var(--gradient-accent)] text-[var(--color-text-inverse)]",
    "border border-white/30 shadow-[var(--shadow-glass-md)]",
    "hover:brightness-105 hover:shadow-[var(--shadow-glass-lg)]",
    "active:brightness-95",
    "focus-visible:ring-2 focus-visible:ring-[var(--color-purple-400)] focus-visible:ring-offset-2"
  ),
  secondary: cn(
    "bg-[var(--glass-bg-elevated)] text-[var(--color-text-primary)]",
    "border border-[var(--glass-border-strong)] backdrop-blur-[var(--blur-md)]",
    "shadow-[var(--shadow-glass-sm)]",
    "hover:bg-[var(--glass-bg-strong)] hover:shadow-[var(--shadow-glass-md)]",
    "active:bg-[var(--glass-bg)]",
    "focus-visible:ring-2 focus-visible:ring-[var(--color-blue-400)] focus-visible:ring-offset-2"
  ),
  ghost: cn(
    "bg-transparent text-[var(--color-text-secondary)]",
    "border border-transparent",
    "hover:bg-[var(--glass-bg-subtle)] hover:text-[var(--color-text-primary)]",
    "active:bg-[var(--glass-bg)]",
    "focus-visible:ring-2 focus-visible:ring-[var(--color-slate-300)] focus-visible:ring-offset-2"
  ),
};

const sizeStyles: Record<GlassButtonSize, string> = {
  sm: "h-8 gap-1.5 px-3 text-[var(--text-sm)] rounded-[var(--radius-sm)]",
  md: "h-10 gap-2 px-4 text-[var(--text-sm)] rounded-[var(--radius-md)]",
  lg: "h-12 gap-2.5 px-6 text-[var(--text-base)] rounded-[var(--radius-md)]",
};

export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      fullWidth = false,
      loading = false,
      disabled,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type="button"
        disabled={isDisabled}
        className={cn(
          "relative inline-flex items-center justify-center font-[var(--font-weight-medium)]",
          "transition-all duration-[var(--transition-base)]",
          "disabled:pointer-events-none disabled:opacity-50",
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {loading && (
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center"
          >
            <svg
              className="h-4 w-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          </span>
        )}
        <span
          className={cn(
            "inline-flex items-center gap-inherit",
            loading && "invisible"
          )}
        >
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </span>
      </button>
    );
  }
);

GlassButton.displayName = "GlassButton";
