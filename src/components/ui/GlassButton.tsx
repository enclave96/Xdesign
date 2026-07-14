import Link from "next/link";
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
  /** Renders as a Next.js link with button styling (avoids invalid nested anchor + button). */
  href?: string;
}

const variantStyles: Record<GlassButtonVariant, string> = {
  primary: cn(
    "bg-[var(--gradient-primary)] text-white hover:text-white",
    "border border-[var(--color-purple-800)]/40",
    "shadow-[var(--glow-button-primary)]",
    "font-[var(--font-weight-semibold)] tracking-[-0.01em]",
    "hover:bg-[var(--gradient-primary-hover)] hover:shadow-[var(--glow-button-primary-hover)] hover:-translate-y-px",
    "active:translate-y-0 active:brightness-[0.97] active:shadow-[var(--glow-button-primary)]",
    "focus-visible:shadow-[var(--glow-focus),var(--glow-button-primary)]"
  ),
  secondary: cn(
    "bg-[var(--glass-bg-elevated)] text-[var(--color-text-primary)]",
    "border border-[var(--glass-border-strong)]",
    "backdrop-blur-[var(--blur-md)] backdrop-saturate-150",
    "shadow-[var(--shadow-glass-sm)]",
    "font-[var(--font-weight-medium)]",
    "hover:bg-[var(--glass-bg-strong)] hover:border-[var(--color-purple-200)] hover:shadow-[var(--shadow-glass-md)] hover:-translate-y-px",
    "active:translate-y-0 active:bg-[var(--glass-bg)]",
    "focus-visible:shadow-[var(--glow-focus)]"
  ),
  outline: cn(
    "bg-[var(--glass-bg-subtle)] text-[var(--color-purple-700)]",
    "border border-[var(--color-purple-300)]",
    "backdrop-blur-[var(--blur-sm)]",
    "font-[var(--font-weight-semibold)]",
    "hover:bg-[var(--glass-bg)] hover:border-[var(--color-purple-400)] hover:shadow-[var(--shadow-glass-sm)]",
    "active:bg-[var(--glass-bg-elevated)]",
    "focus-visible:shadow-[var(--glow-focus)]"
  ),
  ghost: cn(
    "bg-transparent text-[var(--color-text-secondary)]",
    "border border-transparent",
    "font-[var(--font-weight-medium)]",
    "hover:bg-[var(--glass-bg)] hover:text-[var(--color-text-primary)]",
    "active:bg-[var(--glass-bg-elevated)]",
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
      href,
      type = "button",
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    const isPrimary = variant === "primary";

    const buttonClassName = cn(
      "group relative inline-flex items-center justify-center overflow-hidden no-underline",
      "transition-all duration-[var(--transition-smooth)]",
      "disabled:pointer-events-none disabled:opacity-45 disabled:shadow-none disabled:translate-y-0",
      "focus-visible:outline-none",
      variantStyles[variant],
      sizeStyles[size],
      fullWidth && "w-full",
      isPrimary && "liquid-shine",
      isDisabled && "pointer-events-none opacity-45 shadow-none translate-y-0",
      className
    );

    const content = (
      <>
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 h-[45%]",
            isPrimary
              ? "bg-gradient-to-b from-white/20 to-transparent"
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
            isPrimary && "text-white",
            loading && "invisible"
          )}
        >
          {leftIcon && (
            <span
              className={cn(
                "shrink-0 opacity-90 transition-colors",
                !isPrimary && "group-hover:text-[var(--color-purple-600)]"
              )}
            >
              {leftIcon}
            </span>
          )}
          {children}
          {rightIcon && (
            <span
              className={cn(
                "shrink-0 opacity-90 transition-colors",
                !isPrimary && "group-hover:text-[var(--color-purple-600)]"
              )}
            >
              {rightIcon}
            </span>
          )}
        </span>
      </>
    );

    if (href && !isDisabled) {
      return (
        <Link href={href} className={buttonClassName}>
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={buttonClassName}
        {...props}
      >
        {content}
      </button>
    );
  }
);

GlassButton.displayName = "GlassButton";
