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

export function iconProps(
  size: IconSize | number = "sm",
  className?: string,
  variant: IconProps["variant"] = "Linear"
): IconProps {
  return {
    size: typeof size === "number" ? size : ICON_SIZES[size],
    variant,
    color: "currentColor",
    className: cn("shrink-0", className),
  };
}
