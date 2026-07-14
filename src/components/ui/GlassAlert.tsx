import { type ReactNode } from "react";
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export type GlassAlertVariant = "error" | "success" | "warning" | "info";

export interface GlassAlertProps {
  variant?: GlassAlertVariant;
  title?: string;
  children: ReactNode;
  className?: string;
}

const variantConfig: Record<
  GlassAlertVariant,
  { container: string; icon: ReactNode; title: string }
> = {
  error: {
    container:
      "border-[var(--color-severity-critical-border)] bg-[var(--color-severity-critical-bg)]",
    icon: <AlertCircle className="h-4 w-4 shrink-0 text-[var(--color-severity-critical)]" />,
    title: "text-[var(--color-severity-critical)]",
  },
  success: {
    container: "border-[var(--color-severity-low-border)] bg-[var(--color-severity-low-bg)]",
    icon: <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--color-severity-low)]" />,
    title: "text-[var(--color-severity-low)]",
  },
  warning: {
    container:
      "border-[var(--color-severity-medium-border)] bg-[var(--color-severity-medium-bg)]",
    icon: <AlertTriangle className="h-4 w-4 shrink-0 text-[var(--color-severity-medium)]" />,
    title: "text-[var(--color-severity-medium)]",
  },
  info: {
    container: "border-[var(--color-severity-info-border)] bg-[var(--color-severity-info-bg)]",
    icon: <Info className="h-4 w-4 shrink-0 text-[var(--color-severity-info)]" />,
    title: "text-[var(--color-severity-info)]",
  },
};

export function GlassAlert({
  variant = "error",
  title,
  children,
  className,
}: GlassAlertProps) {
  const config = variantConfig[variant];

  return (
    <div
      role="alert"
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-md)] border px-4 py-3",
        "backdrop-blur-[var(--blur-md)] backdrop-saturate-150",
        "shadow-[var(--shadow-glass-sm)]",
        config.container,
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-[var(--glass-input-shine)] opacity-60"
      />
      <div className="relative flex gap-3">
        {config.icon}
        <div className="min-w-0 flex-1">
          {title && (
            <p className={cn("text-[var(--text-sm)] font-[var(--font-weight-semibold)]", config.title)}>
              {title}
            </p>
          )}
          <div
            className={cn(
              "text-[var(--text-sm)] leading-relaxed",
              title ? "mt-0.5 text-[var(--color-text-secondary)]" : config.title
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
