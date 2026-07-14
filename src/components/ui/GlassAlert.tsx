import { type ReactNode } from "react";
import { Danger, InfoCircle, TickCircle, Warning2 } from "iconsax-reactjs";
import { cn } from "@/lib/utils";
import { iconProps } from "@/components/icons";

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
    icon: <Danger {...iconProps("sm", "text-[var(--color-severity-critical)]", "Bold", { interactive: false })} />,
    title: "text-[var(--color-severity-critical)]",
  },
  success: {
    container: "border-[var(--color-severity-low-border)] bg-[var(--color-severity-low-bg)]",
    icon: <TickCircle {...iconProps("sm", "text-[var(--color-severity-low)]", "Bold", { interactive: false })} />,
    title: "text-[var(--color-severity-low)]",
  },
  warning: {
    container:
      "border-[var(--color-severity-medium-border)] bg-[var(--color-severity-medium-bg)]",
    icon: <Warning2 {...iconProps("sm", "text-[var(--color-severity-medium)]", "Bold", { interactive: false })} />,
    title: "text-[var(--color-severity-medium)]",
  },
  info: {
    container: "border-[var(--color-severity-info-border)] bg-[var(--color-severity-info-bg)]",
    icon: <InfoCircle {...iconProps("sm", "text-[var(--color-severity-info)]", "Linear", { interactive: false })} />,
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
