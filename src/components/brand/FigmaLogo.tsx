import { cn } from "@/lib/utils";

export interface FigmaLogoProps {
  className?: string;
  /** White monochrome mark for on-color backgrounds */
  variant?: "color" | "mono";
}

/**
 * Official Figma logomark — colorful by default, monochrome for active/orange states.
 */
export function FigmaLogo({ className, variant = "color" }: FigmaLogoProps) {
  if (variant === "mono") {
    return (
      <svg
        viewBox="0 0 38 57"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        className={cn("shrink-0", className)}
      >
        <path
          d="M19 28.5c0-5.2 4.2-9.5 9.5-9.5S38 23.3 38 28.5 33.8 38 28.5 38 19 33.7 19 28.5z"
          fill="currentColor"
        />
        <path
          d="M0 47.5C0 42.3 4.2 38 9.5 38H19v9.5c0 5.2-4.2 9.5-9.5 9.5S0 52.7 0 47.5z"
          fill="currentColor"
        />
        <path
          d="M19 0v19h9.5c5.2 0 9.5-4.2 9.5-9.5S33.7 0 28.5 0H19z"
          fill="currentColor"
        />
        <path
          d="M0 9.5C0 14.7 4.2 19 9.5 19H19V0H9.5C4.2 0 0 4.2 0 9.5z"
          fill="currentColor"
        />
        <path
          d="M0 28.5C0 33.7 4.2 38 9.5 38H19V19H9.5C4.2 19 0 23.3 0 28.5z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 38 57"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={cn("shrink-0", className)}
    >
      <path
        d="M19 28.5c0-5.2 4.2-9.5 9.5-9.5S38 23.3 38 28.5 33.8 38 28.5 38 19 33.7 19 28.5z"
        fill="#1ABCFE"
      />
      <path
        d="M0 47.5C0 42.3 4.2 38 9.5 38H19v9.5c0 5.2-4.2 9.5-9.5 9.5S0 52.7 0 47.5z"
        fill="#0ACF83"
      />
      <path
        d="M19 0v19h9.5c5.2 0 9.5-4.2 9.5-9.5S33.7 0 28.5 0H19z"
        fill="#FF7262"
      />
      <path
        d="M0 9.5C0 14.7 4.2 19 9.5 19H19V0H9.5C4.2 0 0 4.2 0 9.5z"
        fill="#F24E1E"
      />
      <path
        d="M0 28.5C0 33.7 4.2 38 9.5 38H19V19H9.5C4.2 19 0 23.3 0 28.5z"
        fill="#A259FF"
      />
    </svg>
  );
}
