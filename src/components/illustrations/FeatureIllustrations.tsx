"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

export type FeatureIllustrationType =
  | "scoring"
  | "accessibility"
  | "reports"
  | "sources";

export interface FeatureIllustrationProps {
  type: FeatureIllustrationType;
  className?: string;
}

const accentMap: Record<
  FeatureIllustrationType,
  { from: string; to: string; glow: string }
> = {
  scoring: { from: "#38BDF8", to: "#2563EB", glow: "rgba(56,189,248,0.35)" },
  accessibility: { from: "#A78BFA", to: "#7C3AED", glow: "rgba(139,92,246,0.35)" },
  reports: { from: "#34D399", to: "#0D9488", glow: "rgba(52,211,153,0.35)" },
  sources: { from: "#FB923C", to: "#EC4899", glow: "rgba(251,146,60,0.35)" },
};

export function FeatureIllustration({ type, className }: FeatureIllustrationProps) {
  const uid = useId().replace(/:/g, "");
  const accent = accentMap[type];

  return (
    <div
      aria-hidden
      className={cn(
        "relative mx-auto aspect-[7/4] w-full max-h-36 overflow-hidden rounded-[var(--radius-lg)]",
        "border border-white/70 bg-white/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]",
        className
      )}
    >
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background: `radial-gradient(ellipse 80% 70% at 50% 100%, ${accent.glow} 0%, transparent 70%)`,
        }}
      />
      <svg
        viewBox="0 0 280 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-[1] h-full w-full"
      >
        <defs>
          <linearGradient id={`${uid}-accent`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor={accent.from} />
            <stop offset="1" stopColor={accent.to} />
          </linearGradient>
          <linearGradient id={`${uid}-soft`} x1="40" y1="20" x2="240" y2="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="1" stopColor="#F8FAFC" stopOpacity="0.75" />
          </linearGradient>
        </defs>

        {type === "scoring" && <ScoringArt uid={uid} />}
        {type === "accessibility" && <AccessibilityArt uid={uid} />}
        {type === "reports" && <ReportsArt uid={uid} />}
        {type === "sources" && <SourcesArt uid={uid} />}
      </svg>
    </div>
  );
}

function ScoringArt({ uid }: { uid: string }) {
  return (
    <g className="animate-feat-float">
      <rect x="34" y="24" width="212" height="112" rx="18" fill={`url(#${uid}-soft)`} stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" />
      <circle cx="140" cy="72" r="34" stroke="#E2E8F0" strokeWidth="7" />
      <circle
        cx="140"
        cy="72"
        r="34"
        stroke={`url(#${uid}-accent)`}
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray="213.6"
        strokeDashoffset="42"
        transform="rotate(-90 140 72)"
        className="animate-feat-score-ring"
      />
      <text x="140" y="78" textAnchor="middle" fill="#0F172A" fontSize="22" fontWeight="700">
        87
      </text>
      <g>
        <rect x="62" y="100" width="18" height="22" rx="4" className="animate-feat-bar-1" fill="#38BDF8" />
        <rect x="88" y="106" width="18" height="16" rx="4" className="animate-feat-bar-2" fill="#60A5FA" />
        <rect x="114" y="102" width="18" height="20" rx="4" className="animate-feat-bar-3" fill="#818CF8" />
        <rect x="140" y="98" width="18" height="24" rx="4" className="animate-feat-bar-4" fill="#8B5CF6" />
        <rect x="166" y="104" width="18" height="18" rx="4" className="animate-feat-bar-5" fill="#A78BFA" />
        <rect x="192" y="108" width="18" height="14" rx="4" className="animate-feat-bar-6" fill="#2563EB" />
      </g>
    </g>
  );
}

function AccessibilityArt({ uid }: { uid: string }) {
  return (
    <g className="animate-feat-float">
      <rect x="34" y="24" width="212" height="112" rx="18" fill={`url(#${uid}-soft)`} stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" />
      <g className="animate-feat-shield-pulse" style={{ transformOrigin: "140px 78px" }}>
        <path
          d="M140 42L176 56V78C176 96 160 108 140 114C120 108 104 96 104 78V56L140 42Z"
          fill={`url(#${uid}-accent)`}
          fillOpacity="0.18"
          stroke={`url(#${uid}-accent)`}
          strokeWidth="2.5"
        />
        <path
          d="M128 78L136 86L154 66"
          stroke={`url(#${uid}-accent)`}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-feat-check-draw"
        />
      </g>
      <g className="animate-feat-pill-a">
        <rect x="52" y="108" width="54" height="22" rx="11" fill="white" fillOpacity="0.9" stroke="rgba(255,255,255,0.95)" />
        <text x="64" y="123" fill="#7C3AED" fontSize="11" fontWeight="700">
          AA
        </text>
        <rect x="98" y="114" width="42" height="10" rx="5" fill="#DDD6FE" />
      </g>
      <g className="animate-feat-pill-b">
        <rect x="174" y="108" width="54" height="22" rx="11" fill="white" fillOpacity="0.9" stroke="rgba(255,255,255,0.95)" />
        <rect x="186" y="114" width="14" height="10" rx="3" fill="#0F172A" />
        <rect x="204" y="114" width="14" height="10" rx="3" fill="#F8FAFC" stroke="#CBD5E1" />
      </g>
    </g>
  );
}

function ReportsArt({ uid }: { uid: string }) {
  return (
    <g className="animate-feat-float">
      <rect x="48" y="28" width="184" height="104" rx="16" fill={`url(#${uid}-soft)`} stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" />
      <rect x="48" y="28" width="184" height="24" rx="16" fill="rgba(255,255,255,0.72)" />
      <circle cx="66" cy="40" r="4" fill="#FDA4AF" />
      <circle cx="78" cy="40" r="4" fill="#FCD34D" />
      <circle cx="90" cy="40" r="4" fill="#86EFAC" />
      <rect x="68" y="64" width="56" height="52" rx="10" fill="#E2E8F0" fillOpacity="0.55" />
      <rect x="136" y="64" width="76" height="22" rx="8" fill={`url(#${uid}-accent)`} fillOpacity="0.85" />
      <rect x="136" y="94" width="76" height="22" rx="8" fill="white" fillOpacity="0.75" />
      <g className="animate-feat-marker-a">
        <circle cx="198" cy="75" r="10" fill="white" />
        <circle cx="198" cy="75" r="6" fill="#F97316" />
      </g>
      <g className="animate-feat-marker-b">
        <circle cx="156" cy="105" r="9" fill="white" />
        <circle cx="156" cy="105" r="5.5" fill="#0D9488" />
      </g>
      <path
        d="M88 118H170"
        stroke="#94A3B8"
        strokeWidth="2"
        strokeDasharray="4 4"
        className="animate-feat-dash"
      />
    </g>
  );
}

function SourcesArt({ uid }: { uid: string }) {
  return (
    <g>
      <rect x="34" y="24" width="212" height="112" rx="18" fill={`url(#${uid}-soft)`} stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" />
      <path
        d="M84 96H196"
        stroke={`url(#${uid}-accent)`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="6 6"
        className="animate-feat-dash"
        opacity="0.55"
      />
      <g className="animate-feat-source-1">
        <rect x="58" y="58" width="52" height="52" rx="14" fill="white" fillOpacity="0.92" stroke="rgba(255,255,255,0.95)" strokeWidth="1.5" />
        <rect x="72" y="74" width="24" height="18" rx="4" fill={`url(#${uid}-accent)`} fillOpacity="0.25" stroke={`url(#${uid}-accent)`} strokeWidth="1.5" />
        <path d="M78 68H90" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
      </g>
      <g className="animate-feat-source-2">
        <rect x="114" y="50" width="52" height="52" rx="14" fill="white" fillOpacity="0.92" stroke="rgba(255,255,255,0.95)" strokeWidth="1.5" />
        <circle cx="140" cy="76" r="14" stroke={`url(#${uid}-accent)`} strokeWidth="2" fill="none" />
        <path d="M140 66V76H150" stroke={`url(#${uid}-accent)`} strokeWidth="2" strokeLinecap="round" />
      </g>
      <g className="animate-feat-source-3">
        <rect x="170" y="58" width="52" height="52" rx="14" fill="white" fillOpacity="0.92" stroke="rgba(255,255,255,0.95)" strokeWidth="1.5" />
        <rect x="186" y="72" width="8" height="8" rx="2" fill="#FB923C" />
        <rect x="198" y="72" width="8" height="8" rx="2" fill="#A78BFA" />
        <rect x="186" y="84" width="20" height="8" rx="2" fill="#38BDF8" fillOpacity="0.55" />
      </g>
    </g>
  );
}
