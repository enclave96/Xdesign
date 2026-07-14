"use client";

import { useId } from "react";

const BRAND_FROM = "#F65B19";
const BRAND_MID = "#FF7A33";
const BRAND_TO = "#FF934D";

/**
 * Decorative, motion-safe SVG illustration for the Xdesign landing hero.
 * A design canvas under audit: dashed issue highlights connected to labeled
 * markers, a floating analytics panel, and a UX score card.
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
          <linearGradient id={`${uid}-brand`} x1="234" y1="128" x2="520" y2="224" gradientUnits="userSpaceOnUse">
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
            <stop stopColor={BRAND_FROM} stopOpacity="0.4" />
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

        {/* ===== Design canvas ===== */}
        <g className="animate-illustration-float">
          <rect
            x="92"
            y="54"
            width="456"
            height="366"
            rx="28"
            fill={`url(#${uid}-canvas)`}
            stroke="rgba(255,255,255,0.95)"
            strokeWidth="3"
            filter={`url(#${uid}-soft)`}
          />

          {/* Browser chrome */}
          <path d="M92 82C92 66.536 104.536 54 120 54H520C535.464 54 548 66.536 548 82V104H92V82Z" fill="rgba(255,255,255,0.8)" />
          <path d="M92 104H548" stroke="rgba(246,91,25,0.12)" strokeWidth="1.5" />
          <circle cx="122" cy="79" r="5.5" fill="#FDA4AF" />
          <circle cx="140" cy="79" r="5.5" fill="#FCD34D" />
          <circle cx="158" cy="79" r="5.5" fill="#86EFAC" />
          <rect x="238" y="70" width="164" height="18" rx="9" fill="rgba(226,232,240,0.6)" />
          <rect x="252" y="77" width="90" height="4" rx="2" fill="#94A3B8" fillOpacity=".5" />

          {/* Sidebar */}
          <rect x="118" y="128" width="92" height="264" rx="16" fill="rgba(255,237,228,0.55)" />
          <rect x="134" y="148" width="52" height="8" rx="4" fill={BRAND_FROM} fillOpacity=".38" />
          <rect x="134" y="176" width="60" height="6" rx="3" fill="#FDBA74" fillOpacity=".6" />
          <rect x="134" y="196" width="44" height="6" rx="3" fill="#FED7AA" />
          <rect x="134" y="216" width="54" height="6" rx="3" fill="#FED7AA" />
          <rect x="134" y="236" width="48" height="6" rx="3" fill="#FED7AA" fillOpacity=".7" />
          <rect x="134" y="256" width="58" height="6" rx="3" fill="#FFEDD5" />

          {/* Hero block */}
          <rect x="234" y="128" width="286" height="96" rx="16" fill={`url(#${uid}-brand)`} />
          <rect x="258" y="150" width="140" height="11" rx="5.5" fill="white" fillOpacity=".95" />
          <rect x="258" y="171" width="98" height="7" rx="3.5" fill="white" fillOpacity=".6" />
          <rect x="258" y="192" width="62" height="14" rx="7" fill="white" fillOpacity=".9" />

          {/* Content cards */}
          <rect x="234" y="240" width="136" height="152" rx="16" fill="white" fillOpacity=".85" stroke="rgba(246,91,25,0.1)" strokeWidth="1.5" />
          <rect x="386" y="240" width="134" height="152" rx="16" fill="white" fillOpacity=".85" stroke="rgba(246,91,25,0.1)" strokeWidth="1.5" />

          {/* Left card content */}
          <circle cx="278" cy="284" r="20" fill="#FFF1E8" />
          <path d="M270 284L276 290L287 278" stroke={BRAND_FROM} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="258" y="320" width="88" height="8" rx="4" fill="#FDBA74" fillOpacity=".5" />
          <rect x="258" y="338" width="60" height="6" rx="3" fill="#FED7AA" />
          <rect x="258" y="356" width="72" height="6" rx="3" fill="#FFEDD5" />

          {/* Right card content */}
          <circle cx="428" cy="284" r="20" fill="#FFF1E8" />
          <rect x="413" y="275" width="30" height="19" rx="5" fill="none" stroke={BRAND_FROM} strokeWidth="2.2" strokeDasharray="4 3" />
          <rect x="408" y="320" width="90" height="8" rx="4" fill="#FDBA74" fillOpacity=".5" />
          <rect x="408" y="338" width="62" height="6" rx="3" fill="#FED7AA" />
          <rect x="408" y="356" width="76" height="6" rx="3" fill="#FFEDD5" />

          {/* Issue highlight: CTA contrast (hero block) */}
          <rect
            x="250"
            y="186"
            width="78"
            height="26"
            rx="8"
            fill="white"
            fillOpacity="0.12"
            stroke="white"
            strokeOpacity="0.9"
            strokeWidth="1.6"
            strokeDasharray="5 4"
          />
          {/* Connector: CTA highlight → contrast marker */}
          <path
            d="M330 196C384 188 424 176 452 162"
            stroke={BRAND_FROM}
            strokeWidth="1.6"
            strokeDasharray="4 4"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* Issue highlight: tap target (right card icon) */}
          <rect
            x="404"
            y="266"
            width="48"
            height="36"
            rx="10"
            fill={BRAND_FROM}
            fillOpacity="0.08"
            stroke={BRAND_TO}
            strokeWidth="1.6"
            strokeDasharray="5 4"
          />
          {/* Connector: tap highlight → tap marker */}
          <path
            d="M404 296C384 312 368 328 356 342"
            stroke={BRAND_TO}
            strokeWidth="1.6"
            strokeDasharray="4 4"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* Scan beam */}
          <g className="animate-scan-line">
            <rect x="106" y="116" width="428" height="3" rx="1.5" fill={`url(#${uid}-scan)`} filter={`url(#${uid}-glow)`} />
          </g>

          {/* Marker: contrast */}
          <g className="animate-marker-one">
            <circle cx="473" cy="156" r="22" fill={BRAND_FROM} fillOpacity="0.14" className="animate-marker-ring" />
            <circle cx="473" cy="156" r="17" fill="#FFF" fillOpacity=".97" />
            <circle cx="473" cy="156" r="11" fill={BRAND_FROM} />
            <path d="M473 150.5V157" stroke="white" strokeWidth="2.8" strokeLinecap="round" />
            <circle cx="473" cy="161.5" r="1.5" fill="white" />
            <g filter={`url(#${uid}-soft)`}>
              <rect x="494" y="144" width="50" height="24" rx="9" fill="white" fillOpacity=".97" stroke="rgba(246,91,25,0.22)" strokeWidth="1.2" />
              <text x="519" y="160" textAnchor="middle" fill="#9A3412" fontSize="10" fontWeight="700">
                Contrast
              </text>
            </g>
          </g>

          {/* Marker: tap area */}
          <g className="animate-marker-two">
            <circle cx="344" cy="353" r="20" fill={BRAND_TO} fillOpacity="0.14" className="animate-marker-ring" />
            <circle cx="344" cy="353" r="16" fill="#FFF" fillOpacity=".97" />
            <circle cx="344" cy="353" r="10.5" fill={BRAND_MID} />
            <path d="M339.5 353L343 356.5L349.5 349.5" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            <g filter={`url(#${uid}-soft)`}>
              <rect x="272" y="341" width="52" height="24" rx="9" fill="white" fillOpacity=".97" stroke="rgba(246,91,25,0.22)" strokeWidth="1.2" />
              <text x="298" y="357" textAnchor="middle" fill="#9A3412" fontSize="10" fontWeight="700">
                Tap area
              </text>
            </g>
          </g>
        </g>

        {/* ===== Floating analytics panel (left) ===== */}
        <g className="animate-pill-one" filter={`url(#${uid}-soft)`}>
          <rect x="8" y="210" width="172" height="150" rx="18" fill="rgba(255,255,255,0.94)" stroke="rgba(246,91,25,0.16)" strokeWidth="1.5" />

          <text x="24" y="236" fill="#0F172A" fontSize="11" fontWeight="700">
            UX analytics
          </text>
          <circle cx="158" cy="232" r="4" fill={BRAND_FROM} className="animate-hero-spark-dot" />

          {/* Bar chart: baseline y=314 */}
          <g transform="translate(24, 258)">
            {[
              { h: 30 },
              { h: 44 },
              { h: 26 },
              { h: 52 },
              { h: 38 },
            ].map((bar, i) => (
              <rect
                key={`${uid}-hb-${i}`}
                x={i * 19}
                y={56 - bar.h}
                width="12"
                height={bar.h}
                rx="3"
                fill={`url(#${uid}-bar)`}
                className={`animate-hero-bar animate-hero-bar-${i + 1}`}
              />
            ))}
            {/* 6th bar fills remaining width */}
            <rect
              x={95}
              y={56 - 46}
              width="12"
              height="46"
              rx="3"
              fill={`url(#${uid}-bar)`}
              fillOpacity="0.55"
              className="animate-hero-bar animate-hero-bar-5"
            />
            <rect
              x={114}
              y={56 - 34}
              width="12"
              height="34"
              rx="3"
              fill={`url(#${uid}-bar)`}
              fillOpacity="0.4"
              className="animate-hero-bar animate-hero-bar-4"
            />
            <rect
              x={133}
              y={56 - 42}
              width="12"
              height="42"
              rx="3"
              fill={`url(#${uid}-bar)`}
              fillOpacity="0.3"
              className="animate-hero-bar animate-hero-bar-3"
            />
          </g>
          <path d="M24 314H164" stroke="rgba(148,163,184,0.3)" strokeWidth="1" />

          {/* Sparkline */}
          <path
            d="M24 342C40 336 52 340 68 332C84 324 96 330 112 322C128 314 144 320 164 310"
            stroke={`url(#${uid}-line)`}
            strokeWidth="2.6"
            strokeLinecap="round"
            className="animate-hero-sparkline"
          />
          <circle cx="164" cy="310" r="3.5" fill={BRAND_FROM} className="animate-hero-spark-dot" />
        </g>

        {/* ===== Floating score card (right) ===== */}
        <g className="animate-pill-two" filter={`url(#${uid}-soft)`}>
          <rect x="472" y="386" width="150" height="76" rx="18" fill="rgba(255,255,255,0.95)" stroke="rgba(246,91,25,0.16)" strokeWidth="1.5" />

          {/* Ring */}
          <circle cx="510" cy="424" r="23" stroke="#FFEDD5" strokeWidth="6.5" />
          <circle
            cx="510"
            cy="424"
            r="23"
            stroke={`url(#${uid}-ring)`}
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeDasharray="144.5"
            className="animate-hero-score-ring"
            transform="rotate(-90 510 424)"
          />
          <text x="510" y="429.5" textAnchor="middle" fill="#0F172A" fontSize="15" fontWeight="800">
            92
          </text>

          {/* Label + mini progress */}
          <text x="546" y="412" fill="#64748B" fontSize="8.5" fontWeight="700" letterSpacing="0.08em">
            UX SCORE
          </text>
          <g transform="translate(546, 420)">
            <rect x="0" y="0" width="60" height="5" rx="2.5" fill="#FFEDD5" />
            <rect x="0" y="0" width="54" height="5" rx="2.5" fill={BRAND_FROM} fillOpacity=".9" className="animate-hero-pill-bar animate-hero-pill-bar-1" />
            <rect x="0" y="11" width="60" height="5" rx="2.5" fill="#FFEDD5" />
            <rect x="0" y="11" width="44" height="5" rx="2.5" fill={BRAND_MID} fillOpacity=".85" className="animate-hero-pill-bar animate-hero-pill-bar-2" />
            <rect x="0" y="22" width="60" height="5" rx="2.5" fill="#FFEDD5" />
            <rect x="0" y="22" width="50" height="5" rx="2.5" fill={BRAND_TO} fillOpacity=".8" className="animate-hero-pill-bar animate-hero-pill-bar-3" />
          </g>
        </g>
      </svg>
    </div>
  );
}
