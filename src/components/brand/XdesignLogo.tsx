import { cn } from "@/lib/utils";

export interface XdesignLogoProps {
  className?: string;
  /** Height / sizing classes applied to the full logo lockup */
  markClassName?: string;
  priority?: boolean;
}

const LOGO_SRC = "/brand/orbital-logo.svg";

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
        className={cn("h-8 w-auto shrink-0 object-contain", markClassName)}
      />
    </div>
  );
}
