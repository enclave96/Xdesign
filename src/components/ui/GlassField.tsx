import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface GlassFieldProps {
  label?: string;
  htmlFor?: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
  className?: string;
}

export function GlassField({
  label,
  htmlFor,
  hint,
  error,
  optional,
  children,
  className,
}: GlassFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label
          htmlFor={htmlFor}
          className="flex items-baseline gap-1.5 text-[var(--text-sm)] font-[var(--font-weight-medium)] text-[var(--color-text-primary)]"
        >
          {label}
          {optional && (
            <span className="text-[var(--text-xs)] font-[var(--font-weight-normal)] text-[var(--color-text-muted)]">
              (optional)
            </span>
          )}
        </label>
      )}
      {children}
      {hint && !error && (
        <p className="text-[var(--text-xs)] leading-relaxed text-[var(--color-text-muted)]">
          {hint}
        </p>
      )}
      {error && (
        <p className="text-[var(--text-xs)] font-[var(--font-weight-medium)] text-[var(--color-severity-critical)]">
          {error}
        </p>
      )}
    </div>
  );
}
