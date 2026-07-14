import { useMemo } from "react";
import { cn } from "@/lib/utils";

export type ScoreRingSize = "sm" | "md" | "lg" | "xl";
export type ScoreRingVariant = "default" | "success" | "warning" | "danger";

export interface ScoreRingProps {
  /** Score value from 0 to 100 */
  score: number;
  size?: ScoreRingSize;
  variant?: ScoreRingVariant;
  /** Optional label below the score */
  label?: string;
  /** Show animated entrance */
  animated?: boolean;
  className?: string;
}

const sizeConfig: Record<
  ScoreRingSize,
  { dimension: number; stroke: number; fontSize: string; labelSize: string }
> = {
  sm: { dimension: 64, stroke: 5, fontSize: "text-sm", labelSize: "text-[10px]" },
  md: { dimension: 96, stroke: 6, fontSize: "text-xl", labelSize: "text-xs" },
  lg: { dimension: 128, stroke: 8, fontSize: "text-3xl", labelSize: "text-sm" },
  xl: { dimension: 160, stroke: 10, fontSize: "text-4xl", labelSize: "text-sm" },
};

const variantColors: Record<ScoreRingVariant, { track: string; fill: string }> = {
  default: {
    track: "rgba(148, 163, 184, 0.25)",
    fill: "url(#score-gradient-default)",
  },
  success: {
    track: "rgba(74, 222, 128, 0.2)",
    fill: "#16a34a",
  },
  warning: {
    track: "rgba(251, 191, 36, 0.2)",
    fill: "#d97706",
  },
  danger: {
    track: "rgba(248, 113, 113, 0.2)",
    fill: "#dc2626",
  },
};

function getAutoVariant(score: number): ScoreRingVariant {
  if (score >= 80) return "success";
  if (score >= 60) return "default";
  if (score >= 40) return "warning";
  return "danger";
}

export function ScoreRing({
  score,
  size = "md",
  variant,
  label,
  animated = true,
  className,
}: ScoreRingProps) {
  const clampedScore = Math.min(100, Math.max(0, score));
  const resolvedVariant = variant ?? getAutoVariant(clampedScore);
  const config = sizeConfig[size];
  const colors = variantColors[resolvedVariant];

  const { radius, circumference, offset } = useMemo(() => {
    const r = (config.dimension - config.stroke) / 2;
    const c = 2 * Math.PI * r;
    const o = c - (clampedScore / 100) * c;
    return { radius: r, circumference: c, offset: o };
  }, [config.dimension, config.stroke, clampedScore]);

  const center = config.dimension / 2;

  return (
    <div
      className={cn("inline-flex flex-col items-center gap-2", className)}
      role="meter"
      aria-valuenow={clampedScore}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ? `${label}: ${clampedScore}` : `Score: ${clampedScore}`}
    >
      <div className="relative" style={{ width: config.dimension, height: config.dimension }}>
        <svg
          width={config.dimension}
          height={config.dimension}
          viewBox={`0 0 ${config.dimension} ${config.dimension}`}
          className="-rotate-90"
        >
          <defs>
            <linearGradient id="score-gradient-default" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4a94f7" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <filter id="score-glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={colors.track}
            strokeWidth={config.stroke}
          />

          {/* Progress arc */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={colors.fill}
            strokeWidth={config.stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={animated ? undefined : offset}
            filter="url(#score-glow)"
            className={cn(animated && "animate-score-ring")}
            style={
              animated
                ? ({
                    "--score-circumference": circumference,
                    "--score-offset": offset,
                  } as React.CSSProperties)
                : undefined
            }
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={cn(
              "font-[var(--font-weight-bold)] tabular-nums text-[var(--color-text-primary)]",
              config.fontSize
            )}
          >
            {Math.round(clampedScore)}
          </span>
        </div>
      </div>

      {label && (
        <span
          className={cn(
            "font-[var(--font-weight-medium)] text-[var(--color-text-secondary)]",
            config.labelSize
          )}
        >
          {label}
        </span>
      )}
    </div>
  );
}
