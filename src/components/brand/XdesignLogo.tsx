import { cn } from "@/lib/utils";

export interface XdesignLogoProps {
  className?: string;
  markClassName?: string;
  priority?: boolean;
}

const LOGO_SRC = "/brand/xdesign-logo.svg";

export function XdesignLogo({
  className,
  markClassName,
}: XdesignLogoProps) {
  return (
    <div className={cn("inline-flex items-center", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={LOGO_SRC}
        alt="Xdesign"
        className={cn("h-10 w-10 shrink-0 object-contain", markClassName)}
      />
    </div>
  );
}
