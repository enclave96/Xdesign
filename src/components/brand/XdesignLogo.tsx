import { cn } from "@/lib/utils";
import { useId } from "react";

export interface XdesignLogoProps {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
  priority?: boolean;
}

/**
 * The Xdesign fingerprint mark, recreated from the supplied brand artwork.
 * SVG keeps the mark crisp at every size and lets it work on glass surfaces.
 */
export function XdesignLogo({
  className,
  markClassName,
  showWordmark = true,
}: XdesignLogoProps) {
  const gradientId = useId().replace(/:/g, "");
  const clipId = useId().replace(/:/g, "");

  return (
    <div className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 84 84"
        fill="none"
        aria-hidden
        className={cn("h-9 w-9 shrink-0", markClassName)}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={gradientId} x1="13" y1="12" x2="71" y2="73" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D946EF" />
            <stop offset="0.48" stopColor="#8B5CF6" />
            <stop offset="1" stopColor="#2563EB" />
          </linearGradient>
          <clipPath id={clipId}>
            <circle cx="42" cy="42" r="33" />
          </clipPath>
        </defs>
        <circle cx="42" cy="42" r="34.5" fill={`url(#${gradientId})`} fillOpacity=".12" />
        <g clipPath={`url(#${clipId})`} stroke={`url(#${gradientId})`} strokeWidth="3.1" strokeLinecap="round">
          <path d="M17 65C27 58 29 50 27 41C25 31 29 22 39 17C48 13 60 17 66 25" />
          <path d="M13 59C21 54 23 47 22 39C21 28 27 17 38 12C50 7 64 12 71 22" />
          <path d="M19 72C33 64 36 54 33 41C31 29 36 22 44 19C53 16 62 21 66 29C70 38 68 47 63 54" />
          <path d="M24 78C40 69 44 58 40 41C38 32 42 27 48 25C55 23 61 28 63 34C67 44 61 56 53 63" />
          <path d="M31 81C48 72 52 61 47 42C45 35 48 32 52 32C57 32 60 37 60 42C60 52 53 62 45 69" />
          <path d="M8 50C15 46 17 41 16 34C15 22 22 11 35 6" />
          <path d="M10 70C21 65 27 57 25 44C23 33 26 28 31 25" />
          <path d="M39 82C53 75 58 66 56 53" />
          <path d="M46 79C56 73 63 63 65 51" />
          <path d="M54 75C65 67 71 57 72 46" />
          <path d="M60 68C70 60 75 50 75 39" />
          <path d="M65 59C74 52 78 43 77 33" />
        </g>
      </svg>
      {showWordmark && (
        <span className="text-[var(--text-lg)] font-[var(--font-weight-semibold)] tracking-[-0.035em] text-[var(--color-text-primary)]">
          Xdesign
        </span>
      )}
    </div>
  );
}
