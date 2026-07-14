import { cn } from "@/lib/utils";
import type { IconProps } from "iconsax-reactjs";

export const ICON_SIZES = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
} as const;

export type IconSize = keyof typeof ICON_SIZES;
export type IconTone = "default" | "light" | "muted" | "inherit";

export interface IconStyleOptions {
  /** Icon color preset. Default is dark primary text. */
  tone?: IconTone;
  /** Purple hover when parent/control is hovered. Disable for semantic or on-color icons. */
  interactive?: boolean;
}

const toneClasses: Record<IconTone, string> = {
  default: "text-[var(--color-text-primary)]",
  light: "text-white",
  muted: "text-[var(--color-text-muted)]",
  inherit: "text-current",
};

const interactiveClasses =
  "transition-colors duration-[var(--transition-base)] group-hover:text-[var(--color-purple-600)] hover:text-[var(--color-purple-600)] group-focus-within:text-[var(--color-purple-600)]";

export function iconProps(
  size: IconSize | number = "sm",
  className?: string,
  variant: IconProps["variant"] = "Linear",
  options: IconStyleOptions = {}
): IconProps {
  const { tone = "default", interactive = true } = options;

  return {
    size: typeof size === "number" ? size : ICON_SIZES[size],
    variant,
    color: "currentColor",
    className: cn(
      "app-icon shrink-0 [&_svg]:block [&_svg]:h-full [&_svg]:w-full",
      toneClasses[tone],
      interactive && tone !== "light" && interactiveClasses,
      className
    ),
  };
}
