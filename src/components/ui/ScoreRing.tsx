import { useId, useMemo } from "react";
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
    track: "rgba(148, 163, 184, 0.35)",
    fill: "url(#score-gradient-default)",
  },
  success: {
    track: "rgba(74, 222, 128, 0.28)",
    fill: "#16a34a",
  },
  warning: {
    track: "rgba(251, 191, 36, 0.28)",
    fill: "#d97706",
  },
  danger: {
    track: "rgba(248, 113, 113, 0.28)",
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
  const uid = useId().replace(/:/g, "");
  const clampedScore = Math.min(100, Math.max(0, score));
  const resolvedVariant = variant ?? getAutoVariant(clampedScore);
  const config = sizeConfig[size];
  const colors = variantColors[resolvedVariant];
  const gradientId = `score-gradient-default-${uid}`;

  const { radius, circumference, offset, svgSize, center } = useMemo(() => {
    // Extra padding prevents round stroke caps from being clipped at the viewBox edge.
    const capPadding = Math.ceil(config.stroke / 2) + 1;
    const svgSize = config.dimension + capPadding * 2;
    const center = svgSize / 2;
    const r = (config.dimension - config.stroke) / 2;
    const c = 2 * Math.PI * r;
    const o = c - (clampedScore / 100) * c;
    return { radius: r, circumference: c, offset: o, svgSize, center };
  }, [config.dimension, config.stroke, clampedScore]);

  const fill =
    resolvedVariant === "default" ? `url(#${gradientId})` : colors.fill;

  return (
    <div
      className={cn("inline-flex flex-col items-center gap-2", className)}
      role="meter"
      aria-valuenow={clampedScore}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ? `${label}: ${clampedScore}` : `Score: ${clampedScore}`}
    >
      <div
        className="relative flex items-center justify-center"
        style={{ width: svgSize, height: svgSize }}
      >
        {/* Solid backdrop — no backdrop-filter so the ring stays crisp */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-full border border-border bg-card shadow-sm"
        />

        <div
          className="relative overflow-visible"
          style={{ width: svgSize, height: svgSize }}
        >
          <svg
            width={svgSize}
            height={svgSize}
            viewBox={`0 0 ${svgSize} ${svgSize}`}
            className="-rotate-90 overflow-visible"
            shapeRendering="geometricPrecision"
          >
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F65B19" />
                <stop offset="100%" stopColor="#FF934D" />
              </linearGradient>
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
              stroke={fill}
              strokeWidth={config.stroke}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={animated ? undefined : offset}
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

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span
              className={cn(
                "font-bold tabular-nums text-foreground",
                config.fontSize
              )}
            >
              {Math.round(clampedScore)}
            </span>
          </div>
        </div>
      </div>

      {label && (
        <span
          className={cn(
            "text-center font-medium text-muted-foreground",
            config.labelSize
          )}
        >
          {label}
        </span>
      )}
    </div>
  );
}
