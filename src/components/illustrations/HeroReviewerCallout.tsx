"use client";

import { cn } from "@/lib/utils";

export interface HeroReviewerCalloutProps {
  name?: string;
  className?: string;
}

/**
 * Animated reviewer cursor + name label overlaid on the hero illustration.
 */
export function HeroReviewerCallout({
  name = "Maya Chen",
  className,
}: HeroReviewerCalloutProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute z-30 hidden sm:block",
        "left-2 top-[18%] md:left-4 lg:left-0",
        className
      )}
    >
      <div className="animate-hero-callout">
        <div className="flex items-end gap-1">
          <svg
            viewBox="0 0 24 24"
            className="animate-hero-cursor h-7 w-7 shrink-0 text-[#F65B19] drop-shadow-[0_2px_6px_rgba(246,91,25,0.35)]"
            fill="currentColor"
          >
            <path d="M4 3.5L19.5 11.5L11.5 13.5L9 21.5L4 3.5Z" />
          </svg>

          <span className="mb-1 inline-flex items-center gap-2.5 rounded-full border border-orange-200/90 bg-white px-4 py-2 text-sm font-semibold text-orange-950 shadow-[0_12px_32px_rgba(246,91,25,0.18)] ring-1 ring-orange-100/80">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F65B19] opacity-40" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#F65B19] shadow-[0_0_0_4px_rgba(246,91,25,0.2)]" />
            </span>
            {name}
          </span>
        </div>

        <svg
          viewBox="0 0 120 72"
          className="ml-8 mt-1 h-14 w-28 text-[#F65B19]/45"
          fill="none"
          aria-hidden
        >
          <path
            d="M6 8C34 14 58 38 110 62"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="5 6"
            strokeLinecap="round"
            className="animate-hero-callout-line"
          />
        </svg>
      </div>
    </div>
  );
}
