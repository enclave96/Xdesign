"use client";

import { useId } from "react";

const BRAND_FROM = "#F65B19";
const BRAND_TO = "#FF934D";
const BRAND_MID = "#FF7A33";

/**
 * Decorative, motion-safe SVG illustration for the Orbital landing hero.
 * Visualizes a design canvas with UX audit overlays, charts, and issue markers.
 */
export function DesignAuditIllustration() {
  const uid = useId().replace(/:/g, "");

  return (
    <div
      aria-hidden
      className="relative mx-auto w-full max-w-[620px] select-none"
    >
      <div className="absolute inset-[10%] rounded-full bg-[#F65B19]/20 blur-3xl animate-aurora-breathe" />
      <svg
        viewBox="0 0 640 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-[1] h-auto w-full overflow-visible drop-shadow-[0_28px_48px_rgba(246,91,25,0.16)]"
      >
        <defs>
          <linearGradient id={`${uid}-canvas`} x1="120" y1="70" x2="518" y2="430" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" stopOpacity="0.98" />
            <stop offset="1" stopColor="#FFF7F2" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id={`${uid}-brand`} x1="195" y1="205" x2="410" y2="340" gradientUnits="userSpaceOnUse">
            <stop stopColor={BRAND_FROM} />
            <stop offset="1" stopColor={BRAND_TO} />
          </linearGradient>
          <linearGradient id={`${uid}-scan`} x1="0" y1="0" x2="1" y2="0">
            <stop stopColor={BRAND_FROM} stopOpacity="0" />
            <stop offset="0.45" stopColor={BRAND_MID} stopOpacity="0.95" />
            <stop offset="1" stopColor={BRAND_TO} stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`${uid}-bar`} x1="0" y1="1" x2="0" y2="0">
            <stop stopColor={BRAND_FROM} />
            <stop offset="1" stopColor={BRAND_TO} />
          </linearGradient>
          <linearGradient id={`${uid}-line`} x1="0" y1="0" x2="1" y2="0">
            <stop stopColor={BRAND_FROM} stopOpacity="0.35" />
            <stop offset="0.5" stopColor={BRAND_MID} />
            <stop offset="1" stopColor={BRAND_TO} />
          </linearGradient>
          <linearGradient id={`${uid}-ring`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor={BRAND_FROM} />
            <stop offset="1" stopColor={BRAND_TO} />
          </linearGradient>
          <filter id={`${uid}-glow`} x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id={`${uid}-soft`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#F65B19" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Design canvas */}
        <g className="animate-illustration-float">
          <rect
            x="92"
            y="54"
            width="456"
            height="366"
            rx="30"
            fill={`url(#${uid}-canvas)`}
            stroke="rgba(255,255,255,0.95)"
            strokeWidth="3"
            filter={`url(#${uid}-soft)`}
          />
          <rect x="92" y="54" width="456" height="50" rx="30" fill="rgba(255,255,255,0.72)" />
          <path d="M92 104H548" stroke="rgba(246,91,25,0.12)" strokeWidth="1.5" />
          <circle cx="124" cy="79" r="6" fill="#FDA4AF" />
          <circle cx="143" cy="79" r="6" fill="#FCD34D" />
          <circle cx="162" cy="79" r="6" fill="#86EFAC" />

          {/* Sidebar */}
          <rect x="122" y="130" width="92" height="260" rx="17" fill="rgba(255,237,228,0.55)" />
          <rect x="139" y="153" width="49" height="8" rx="4" fill={BRAND_FROM} fillOpacity=".35" />
          <rect x="139" y="184" width="58" height="7" rx="3.5" fill="#FDBA74" fillOpacity=".55" />
          <rect x="139" y="207" width="42" height="7" rx="3.5" fill="#FED7AA" />
          <rect x="139" y="230" width="54" height="7" rx="3.5" fill="#FED7AA" />
          <rect x="139" y="268" width="58" height="7" rx="3.5" fill="#FED7AA" fillOpacity=".7" />
          <rect x="139" y="291" width="46" height="7" rx="3.5" fill="#FFEDD5" />

          {/* Hero block */}
          <rect x="238" y="130" width="278" height="101" rx="18" fill={`url(#${uid}-brand)`} />
          <rect x="263" y="157" width="136" height="11" rx="5.5" fill="white" fillOpacity=".94" />
          <rect x="263" y="180" width="95" height="7" rx="3.5" fill="white" fillOpacity=".62" />
          <rect x="263" y="198" width="67" height="7" rx="3.5" fill="white" fillOpacity=".48" />
          <rect x="263" y="212" width="58" height="10" rx="5" fill="white" fillOpacity=".88" />

          {/* Content cards */}
          <rect x="238" y="253" width="132" height="137" rx="18" fill="white" fillOpacity=".82" stroke="rgba(246,91,25,0.08)" strokeWidth="1.5" />
          <rect x="386" y="253" width="130" height="137" rx="18" fill="white" fillOpacity=".82" stroke="rgba(246,91,25,0.08)" strokeWidth="1.5" />
          <circle cx="282" cy="298" r="20" fill="#FFF1E8" />
          <path d="M274 298L280 304L291 292" stroke={BRAND_FROM} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="263" y="334" width="77" height="8" rx="4" fill="#FDBA74" fillOpacity=".45" />
          <rect x="263" y="352" width="53" height="7" rx="3.5" fill="#FED7AA" />
          <circle cx="431" cy="298" r="20" fill="#FFF1E8" />
          <rect x="416" y="288" width="30" height="20" rx="6" fill="none" stroke={BRAND_FROM} strokeWidth="2.5" strokeDasharray="4 3" />
          <rect x="409" y="334" width="82" height="8" rx="4" fill="#FDBA74" fillOpacity=".45" />
          <rect x="409" y="352" width="56" height="7" rx="3.5" fill="#FED7AA" />

          {/* Issue highlight overlays on the design */}
          <g opacity="0.92">
            <rect
              x="258"
              y="208"
              width="68"
              height="18"
              rx="5"
              fill={BRAND_FROM}
              fillOpacity="0.1"
              stroke={BRAND_FROM}
              strokeWidth="1.5"
              strokeDasharray="5 4"
            />
            <rect
              x="404"
              y="283"
              width="54"
              height="34"
              rx="8"
              fill={BRAND_FROM}
              fillOpacity="0.08"
              stroke={BRAND_TO}
              strokeWidth="1.5"
              strokeDasharray="5 4"
            />
            <path
              d="M326 217C350 217 368 200 388 186"
              stroke={BRAND_FROM}
              strokeWidth="1.5"
              strokeDasharray="4 4"
              strokeLinecap="round"
              opacity="0.55"
            />
            <path
              d="M458 301C472 301 484 292 498 278"
              stroke={BRAND_TO}
              strokeWidth="1.5"
              strokeDasharray="4 4"
              strokeLinecap="round"
              opacity="0.55"
            />
          </g>

          {/* Analytics overlay panel on top of the design */}
          <g filter={`url(#${uid}-soft)`}>
            <rect
              x="332"
              y="272"
              width="196"
              height="132"
              rx="16"
              fill="rgba(255,255,255,0.9)"
              stroke="rgba(246,91,25,0.18)"
              strokeWidth="1.5"
            />
            <rect x="348" y="288" width="72" height="6" rx="3" fill="#1E293B" fillOpacity=".75" />
            <rect x="348" y="300" width="48" height="4" rx="2" fill="#94A3B8" fillOpacity=".55" />

            {/* Mini bar chart */}
            <g transform="translate(348, 318)">
              {[
                { h: 34, delay: "0s" },
                { h: 48, delay: "0.12s" },
                { h: 28, delay: "0.24s" },
                { h: 56, delay: "0.36s" },
                { h: 40, delay: "0.48s" },
              ].map((bar, i) => (
                <rect
                  key={bar.h}
                  x={i * 18}
                  y={60 - bar.h}
                  width="11"
                  height={bar.h}
                  rx="3"
                  fill={`url(#${uid}-bar)`}
                  className={`animate-hero-bar animate-hero-bar-${i + 1}`}
                  style={{ animationDelay: bar.delay }}
                />
              ))}
            </g>

            {/* Sparkline */}
            <path
              d="M348 418C368 404 382 412 402 396C418 384 432 390 448 376C464 362 478 368 494 354"
              stroke={`url(#${uid}-line)`}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-hero-sparkline"
            />
            <circle cx="494" cy="354" r="4" fill={BRAND_FROM} className="animate-hero-spark-dot" />
            <path
              d="M348 418H510"
              stroke="rgba(148,163,184,0.25)"
              strokeWidth="1"
              strokeDasharray="3 4"
            />
          </g>

          {/* Scan beam */}
          <g className="animate-scan-line">
            <rect x="106" y="116" width="428" height="3" rx="1.5" fill={`url(#${uid}-scan)`} filter={`url(#${uid}-glow)`} />
          </g>

          {/* Issue pointer markers */}
          <g className="animate-marker-one">
            <circle cx="473" cy="156" r="22" fill={BRAND_FROM} fillOpacity="0.14" className="animate-marker-ring" />
            <circle cx="473" cy="156" r="18" fill="#FFF" fillOpacity=".96" />
            <circle cx="473" cy="156" r="12" fill={BRAND_FROM} />
            <path d="M473 150V157" stroke="white" strokeWidth="3" strokeLinecap="round" />
            <circle cx="473" cy="163" r="1.6" fill="white" />
            <rect x="492" y="142" width="52" height="22" rx="8" fill="white" fillOpacity=".95" stroke="rgba(246,91,25,0.2)" strokeWidth="1.2" />
            <text x="502" y="157" fill="#9A3412" fontSize="9.5" fontWeight="700">
              Contrast
            </text>
          </g>

          <g className="animate-marker-two">
            <circle cx="344" cy="353" r="20" fill={BRAND_TO} fillOpacity="0.14" className="animate-marker-ring" />
            <circle cx="344" cy="353" r="17" fill="#FFF" fillOpacity=".96" />
            <circle cx="344" cy="353" r="11" fill={BRAND_MID} />
            <path d="M339 353L343 357L350 349" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="278" y="336" width="54" height="22" rx="8" fill="white" fillOpacity=".95" stroke="rgba(246,91,25,0.2)" strokeWidth="1.2" />
            <text x="286" y="351" fill="#9A3412" fontSize="9.5" fontWeight="700">
              Tap area
            </text>
          </g>
        </g>

        {/* Category scores pill */}
        <g className="animate-pill-one">
          <rect x="18" y="148" width="154" height="72" rx="18" fill="rgba(255,255,255,0.82)" stroke="rgba(246,91,25,0.14)" strokeWidth="2" />
          <text x="36" y="172" fill="#0F172A" fontSize="11" fontWeight="700">
            UX breakdown
          </text>
          <text x="36" y="186" fill="#94A3B8" fontSize="8.5" fontWeight="600">
            8 categories
          </text>
          <g transform="translate(36, 194)">
            {[
              { w: 88, label: "Nav" },
              { w: 72, label: "Type" },
              { w: 96, label: "Hier" },
              { w: 64, label: "CTA" },
            ].map((row, i) => (
              <g key={row.label} transform={`translate(0, ${i * 11})`}>
                <rect x="0" y="0" width="104" height="5" rx="2.5" fill="#FFEDD5" />
                <rect
                  x="0"
                  y="0"
                  width={row.w * 0.52}
                  height="5"
                  rx="2.5"
                  fill={`url(#${uid}-bar)`}
                  className={`animate-hero-pill-bar animate-hero-pill-bar-${i + 1}`}
                />
              </g>
            ))}
          </g>
        </g>

        {/* Score ring pill */}
        <g className="animate-pill-two">
          <rect x="468" y="368" width="154" height="78" rx="20" fill="rgba(255,255,255,0.84)" stroke="rgba(246,91,25,0.14)" strokeWidth="2" />
          <circle cx="528" cy="407" r="24" stroke="#FFEDD5" strokeWidth="7" />
          <circle
            cx="528"
            cy="407"
            r="24"
            stroke={`url(#${uid}-ring)`}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray="150.8"
            className="animate-hero-score-ring"
            transform="rotate(-90 528 407)"
          />
          <text x="516" y="412" fill="#0F172A" fontSize="17" fontWeight="800">
            92
          </text>
          <text x="490" y="432" fill="#64748B" fontSize="9" fontWeight="700">
            UX SCORE
          </text>
          <g transform="translate(558, 388)">
            <rect x="0" y="0" width="48" height="5" rx="2.5" fill="#FFEDD5" />
            <rect x="0" y="0" width="44" height="5" rx="2.5" fill={BRAND_FROM} fillOpacity=".85" />
            <rect x="0" y="10" width="48" height="5" rx="2.5" fill="#FFEDD5" />
            <rect x="0" y="10" width="36" height="5" rx="2.5" fill={BRAND_MID} fillOpacity=".8" />
            <rect x="0" y="20" width="48" height="5" rx="2.5" fill="#FFEDD5" />
            <rect x="0" y="20" width="40" height="5" rx="2.5" fill={BRAND_TO} fillOpacity=".75" />
          </g>
        </g>
      </svg>
    </div>
  );
}
