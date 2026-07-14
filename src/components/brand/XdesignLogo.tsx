import { cn } from "@/lib/utils";

export interface XdesignLogoProps {
  className?: string;
  /** Height / sizing classes applied to the logo mark */
  markClassName?: string;
  priority?: boolean;
}

const LOGO_SRC = "/brand/orbital-logo.png";

export function XdesignLogo({
  className,
  markClassName,
}: XdesignLogoProps) {
  return (
    <div className={cn("inline-flex items-center", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={LOGO_SRC}
        alt="Orbital"
        className={cn(
          "aspect-square h-9 w-9 shrink-0 object-contain",
          markClassName
        )}
      />
    </div>
  );
}
