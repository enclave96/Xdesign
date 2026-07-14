"use client";

import { useId } from "react";

/**
 * Decorative, motion-safe SVG illustration for the Xdesign landing page.
 * It visualizes a design canvas being scanned for UX issues.
 */
export function DesignAuditIllustration() {
  const gradientId = useId().replace(/:/g, "");
  const glowId = useId().replace(/:/g, "");

  return (
    <div
      aria-hidden
      className="relative mx-auto w-full max-w-[620px] select-none"
    >
      <div className="absolute inset-[12%] rounded-full bg-orange-300/25 blur-3xl animate-aurora-breathe" />
      <svg
        viewBox="0 0 640 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-[1] h-auto w-full overflow-visible drop-shadow-[0_28px_42px_rgba(76,81,191,0.18)]"
      >
        <defs>
          <linearGradient id={`${gradientId}-canvas`} x1="120" y1="70" x2="518" y2="430" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" stopOpacity="0.96" />
            <stop offset="1" stopColor="#EEF2FF" stopOpacity="0.82" />
          </linearGradient>
          <linearGradient id={`${gradientId}-accent`} x1="195" y1="205" x2="410" y2="340" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38BDF8" />
            <stop offset="1" stopColor="#8B5CF6" />
          </linearGradient>
          <linearGradient id={`${gradientId}-scan`} x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#38BDF8" stopOpacity="0" />
            <stop offset="0.5" stopColor="#8B5CF6" stopOpacity="0.95" />
            <stop offset="1" stopColor="#38BDF8" stopOpacity="0" />
          </linearGradient>
          <filter id={glowId} x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="animate-illustration-float">
          <rect x="92" y="54" width="456" height="366" rx="30" fill={`url(#${gradientId}-canvas)`} stroke="rgba(255,255,255,0.92)" strokeWidth="3" />
          <rect x="92" y="54" width="456" height="50" rx="30" fill="rgba(255,255,255,0.66)" />
          <path d="M92 104H548" stroke="rgba(148,163,184,0.18)" strokeWidth="1.5" />
          <circle cx="124" cy="79" r="6" fill="#FDA4AF" />
          <circle cx="143" cy="79" r="6" fill="#FCD34D" />
          <circle cx="162" cy="79" r="6" fill="#86EFAC" />

          <rect x="122" y="130" width="92" height="260" rx="17" fill="rgba(226,232,240,0.65)" />
          <rect x="139" y="153" width="49" height="8" rx="4" fill="#94A3B8" fillOpacity=".5" />
          <rect x="139" y="184" width="58" height="7" rx="3.5" fill="#CBD5E1" />
          <rect x="139" y="207" width="42" height="7" rx="3.5" fill="#CBD5E1" />
          <rect x="139" y="230" width="54" height="7" rx="3.5" fill="#CBD5E1" />

          <rect x="238" y="130" width="278" height="101" rx="18" fill={`url(#${gradientId}-accent)`} />
          <rect x="263" y="157" width="136" height="11" rx="5.5" fill="white" fillOpacity=".94" />
          <rect x="263" y="180" width="95" height="7" rx="3.5" fill="white" fillOpacity=".62" />
          <rect x="263" y="198" width="67" height="7" rx="3.5" fill="white" fillOpacity=".48" />

          <rect x="238" y="253" width="132" height="137" rx="18" fill="white" fillOpacity=".7" />
          <rect x="386" y="253" width="130" height="137" rx="18" fill="white" fillOpacity=".7" />
          <circle cx="282" cy="298" r="20" fill="#DBEAFE" />
          <path d="M274 298L280 304L291 292" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="263" y="334" width="77" height="8" rx="4" fill="#94A3B8" fillOpacity=".55" />
          <rect x="263" y="352" width="53" height="7" rx="3.5" fill="#CBD5E1" />
          <circle cx="431" cy="298" r="20" fill="#F3E8FF" />
          <path d="M431 286V301" stroke="#7C3AED" strokeWidth="4" strokeLinecap="round" />
          <circle cx="431" cy="309" r="2.5" fill="#7C3AED" />
          <rect x="409" y="334" width="82" height="8" rx="4" fill="#94A3B8" fillOpacity=".55" />
          <rect x="409" y="352" width="56" height="7" rx="3.5" fill="#CBD5E1" />

          <g className="animate-scan-line">
            <rect x="106" y="116" width="428" height="3" rx="1.5" fill={`url(#${gradientId}-scan)`} filter={`url(#${glowId})`} />
          </g>

          <g className="animate-marker-one">
            <circle cx="473" cy="156" r="18" fill="#FFF" fillOpacity=".94" />
            <circle cx="473" cy="156" r="12" fill="#F97316" />
            <path d="M473 150V157" stroke="white" strokeWidth="3" strokeLinecap="round" />
            <circle cx="473" cy="163" r="1.6" fill="white" />
          </g>
          <g className="animate-marker-two">
            <circle cx="344" cy="353" r="17" fill="#FFF" fillOpacity=".94" />
            <circle cx="344" cy="353" r="11" fill="#2563EB" />
            <path d="M339 353L343 357L350 349" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>

        <g className="animate-pill-one">
          <rect x="29" y="156" width="138" height="52" rx="18" fill="rgba(255,255,255,0.74)" stroke="rgba(255,255,255,0.95)" strokeWidth="2" />
          <circle cx="56" cy="182" r="10" fill="#DCFCE7" />
          <path d="M51 182L55 186L62 178" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="76" y="175" width="66" height="7" rx="3.5" fill="#475569" fillOpacity=".76" />
          <rect x="76" y="188" width="43" height="5" rx="2.5" fill="#94A3B8" />
        </g>

        <g className="animate-pill-two">
          <rect x="476" y="375" width="137" height="58" rx="20" fill="rgba(255,255,255,0.76)" stroke="rgba(255,255,255,0.95)" strokeWidth="2" />
          <text x="497" y="400" fill="#0F172A" fontSize="17" fontWeight="700">92</text>
          <text x="497" y="418" fill="#64748B" fontSize="10" fontWeight="600">UX SCORE</text>
          <path d="M557 411C572 411 584 399 584 384" stroke="#8B5CF6" strokeWidth="6" strokeLinecap="round" />
          <path d="M557 411C542 411 530 399 530 384" stroke="#E2E8F0" strokeWidth="6" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}
