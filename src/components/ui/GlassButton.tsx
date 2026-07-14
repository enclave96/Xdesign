import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type GlassButtonVariant = "primary" | "secondary" | "ghost" | "outline";
export type GlassButtonSize = "sm" | "md" | "lg";

export interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: GlassButtonVariant;
  size?: GlassButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
}

const variantStyles: Record<GlassButtonVariant, string> = {
  primary: cn(
    "bg-[var(--gradient-accent)] text-[var(--color-text-inverse)]",
    "border border-white/40",
    "shadow-[var(--glow-button)]",
    "hover:shadow-[var(--glow-button-hover)] hover:brightness-[1.03] hover:-translate-y-px",
    "active:translate-y-0 active:brightness-95 active:shadow-[var(--glow-button)]",
    "focus-visible:shadow-[var(--glow-focus)]"
  ),
  secondary: cn(
    "bg-[var(--glass-bg-elevated)] text-[var(--color-text-primary)]",
    "border border-[var(--glass-border-strong)]",
    "backdrop-blur-[var(--blur-md)] backdrop-saturate-150",
    "shadow-[var(--shadow-glass-sm)]",
    "hover:bg-[var(--glass-bg-strong)] hover:shadow-[var(--shadow-glass-md)] hover:-translate-y-px",
    "active:translate-y-0 active:bg-[var(--glass-bg)]",
    "focus-visible:shadow-[var(--glow-focus)]"
  ),
  outline: cn(
    "bg-[var(--glass-bg-subtle)] text-[var(--color-text-primary)]",
    "border border-[var(--glass-border)]",
    "backdrop-blur-[var(--blur-sm)]",
    "hover:bg-[var(--glass-bg)] hover:border-[var(--color-purple-300)] hover:shadow-[var(--shadow-glass-sm)]",
    "active:bg-[var(--glass-bg-elevated)]",
    "focus-visible:shadow-[var(--glow-focus)]"
  ),
  ghost: cn(
    "bg-transparent text-[var(--color-text-secondary)]",
    "border border-transparent",
    "hover:bg-[var(--glass-bg-subtle)] hover:text-[var(--color-text-primary)]",
    "active:bg-[var(--glass-bg)]",
    "focus-visible:shadow-[var(--glow-focus)]"
  ),
};

const sizeStyles: Record<GlassButtonSize, string> = {
  sm: "h-9 gap-1.5 px-3.5 text-[var(--text-sm)] rounded-[var(--radius-sm)]",
  md: "h-11 gap-2 px-5 text-[var(--text-sm)] rounded-[var(--radius-md)]",
  lg: "h-12 gap-2.5 px-7 text-[var(--text-base)] rounded-[var(--radius-lg)]",
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
    const isPrimary = variant === "primary";

    return (
      <button
        ref={ref}
        type="button"
        disabled={isDisabled}
        className={cn(
          "group relative inline-flex items-center justify-center overflow-hidden",
          "font-[var(--font-weight-medium)]",
          "transition-all duration-[var(--transition-smooth)]",
          "disabled:pointer-events-none disabled:opacity-45 disabled:shadow-none disabled:translate-y-0",
          "focus-visible:outline-none",
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          isPrimary && "liquid-shine",
          className
        )}
        {...props}
      >
        {/* Glass top reflection */}
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 h-[45%]",
            isPrimary
              ? "bg-gradient-to-b from-white/30 to-transparent"
              : "bg-[var(--glass-input-shine)] opacity-70"
          )}
        />

        {loading && (
          <span
            aria-hidden
            className="absolute inset-0 z-10 flex items-center justify-center bg-inherit"
          >
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
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
            "relative z-[1] inline-flex items-center gap-inherit",
            loading && "invisible"
          )}
        >
          {leftIcon && <span className="shrink-0 opacity-90">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0 opacity-90">{rightIcon}</span>}
        </span>
      </button>
    );
  }
);

GlassButton.displayName = "GlassButton";
