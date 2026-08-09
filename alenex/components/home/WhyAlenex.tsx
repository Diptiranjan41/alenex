"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Principle = {
  number: string;
  title: string;
  short: string;
  description: string;
};

const PRINCIPLES: Principle[] = [
  {
    number: "01",
    title: "Business First",
    short: "Business\nFirst",
    description:
      "Technology follows your business goals — not the other way around.",
  },
  {
    number: "02",
    title: "Modern by Design",
    short: "Modern\nTechnology",
    description:
      "Modern frameworks, architecture, AI and cloud technologies.",
  },
  {
    number: "03",
    title: "Built to Scale",
    short: "Scalable\nArchitecture",
    description:
      "Architecture designed for future users, features and growth.",
  },
  {
    number: "04",
    title: "Direct Collaboration",
    short: "Direct\nCollaboration",
    description:
      "Transparent communication from the first discussion to launch.",
  },
  {
    number: "05",
    title: "Quality Engineering",
    short: "Quality\nEngineering",
    description:
      "Performance, responsiveness, security and maintainable code.",
  },
  {
    number: "06",
    title: "Long-Term Mindset",
    short: "Long-Term\nMindset",
    description:
      "We build products that can continuously evolve after launch.",
  },
];

// Precompute node positions on a ring around the center (SVG space 400x400)
const CENTER = 200;
const RADIUS = 148;
const START_ANGLE = -90; // top

function polarToPercent(index: number, total: number) {
  const angle = START_ANGLE + (360 / total) * index;
  const rad = (angle * Math.PI) / 180;
  const x = CENTER + RADIUS * Math.cos(rad);
  const y = CENTER + RADIUS * Math.sin(rad);
  return { xPct: (x / 400) * 100, yPct: (y / 400) * 100 };
}

export default function WhyAlenex() {
  const [selected, setSelected] = useState(0);
  const [deviceType, setDeviceType] = useState("desktop");

  // Device detection
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      if (width < 640) setDeviceType("mobile");
      else if (width < 1024) setDeviceType("tablet");
      else setDeviceType("desktop");
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const isMobile = deviceType === "mobile";
  const isTablet = deviceType === "tablet";
  const isDesktop = deviceType === "desktop";

  // Responsive sizing
  const sectionPy = isMobile ? "py-12 sm:py-16" : isTablet ? "py-18 md:py-24" : "py-24 md:py-32";
  const headerMb = isMobile ? "mb-10 sm:mb-12" : isTablet ? "mb-14 md:mb-18" : "mb-20";
  const taglineSize = isMobile ? "text-xs" : isTablet ? "text-xs md:text-xs" : "text-xs";
  const taglineMb = isMobile ? "mb-3 sm:mb-4" : isTablet ? "mb-4 md:mb-4" : "mb-4";
  const headingSize = isMobile ? "text-2xl sm:text-3xl" : isTablet ? "text-4xl md:text-5xl" : "text-4xl md:text-5xl lg:text-6xl";
  const headingMb = isMobile ? "mb-3 sm:mb-4" : isTablet ? "mb-4 md:mb-6" : "mb-6";
  const descriptionSize = isMobile ? "text-sm sm:text-base" : isTablet ? "text-base md:text-lg" : "text-lg md:text-xl";
  const descriptionMaxW = isMobile ? "max-w-xl" : isTablet ? "max-w-2xl" : "max-w-3xl";
  const gridGap = isMobile ? "gap-4" : isTablet ? "gap-6 md:gap-8" : "gap-10";

  return (
    <section
      className={`relative bg-[#0A0A0A] ${sectionPy} border-t border-[#4A1A1F]/40 overflow-hidden`}
      aria-labelledby="why-alenex-title"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(230,57,70,0.4) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(230,57,70,0.4) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Background Glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#E63946] blur-[100px] sm:blur-[130px] md:blur-[160px] opacity-[0.08] pointer-events-none ${
        isMobile ? "w-[350px] h-[350px]" : isTablet ? "w-[450px] h-[450px]" : "w-[600px] h-[600px]"
      }`} />

      <div className="relative container mx-auto px-4 sm:px-6 md:px-6">
        {/* Header - Centered Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className={`text-center max-w-4xl mx-auto ${headerMb}`}
        >
          {/* Tagline */}
          <span className={`${taglineSize} font-medium text-[#E63946] uppercase tracking-wider inline-block ${taglineMb}`}>
            Why ALENEX
          </span>

          {/* Main Heading */}
          <h2
            id="why-alenex-title"
            className={`${headingSize} font-black text-white leading-tight ${headingMb}`}
          >
            We Don&apos;t Just Build Software.
            <br className="hidden sm:block" />
            <span className="block mt-2 sm:mt-3">
              <span className="text-white">We Build </span>
              <span className="text-black bg-gradient-to-r from-[#E63946] to-[#FF3B4E] bg-clip-text text-transparent">
                What&apos;s Next.
              </span>
            </span>
          </h2>

          {/* Subheading Description */}
          <p className={`${descriptionSize} text-[#D0D0D0] ${descriptionMaxW} mx-auto leading-relaxed font-light px-2 sm:px-0`}>
            From intelligent automation to scalable digital products, we combine technology, engineering, and innovation to help businesses move faster, work smarter, and grow stronger.
          </p>
        </motion.div>

        {/* DESKTOP: radial node diagram + side panel */}
        {isDesktop && (
          <div className={`grid grid-cols-[1fr_360px] ${gridGap} items-center`}>
            <RadialDiagram
              selected={selected}
              setSelected={setSelected}
              size="full"
            />
            <SidePanel selected={selected} size="full" />
          </div>
        )}

        {/* TABLET: radial node diagram + side panel (optimized) */}
        {isTablet && (
          <div className={`grid grid-cols-1 md:grid-cols-[1fr_320px] ${gridGap} items-center`}>
            <RadialDiagram
              selected={selected}
              setSelected={setSelected}
              size="medium"
            />
            <SidePanel selected={selected} size="medium" />
          </div>
        )}

        {/* MOBILE: vertical timeline */}
        {isMobile && (
          <MobileTimeline selected={selected} setSelected={setSelected} />
        )}
      </div>

      <style jsx global>{`
        .electric-ring {
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            #ff3b4e 15deg,
            #e63946 40deg,
            transparent 90deg,
            transparent 270deg,
            #e63946 320deg,
            #ff3b4e 345deg,
            transparent 360deg
          );
          animation: electric-rotate 5s linear infinite;
        }
        @keyframes electric-rotate {
          to {
            transform: rotate(360deg);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .electric-ring {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}

function RadialDiagram({
  selected,
  setSelected,
  size,
}: {
  selected: number;
  setSelected: (i: number) => void;
  size: "full" | "medium" | "small";
}) {
  // Responsive sizing
  const diagramSize = size === "full" ? "max-w-[520px]" : size === "medium" ? "max-w-[420px]" : "max-w-[320px]";
  const centerSize = size === "full" ? "w-32 h-32" : size === "medium" ? "w-28 h-28" : "w-24 h-24";
  const centerTagSize = size === "full" ? "text-[10px]" : size === "medium" ? "text-[9px]" : "text-[8px]";
  const centerPulseSize = size === "full" ? "w-2.5 h-2.5" : size === "medium" ? "w-2 h-2" : "w-1.5 h-1.5";
  const nodeSize = size === "full" ? "w-[92px] h-[92px]" : size === "medium" ? "w-[80px] h-[80px]" : "w-[72px] h-[72px]";
  const nodeTagSize = size === "full" ? "text-xs" : size === "medium" ? "text-[11px]" : "text-[10px]";
  const nodeTextSize = size === "full" ? "text-[10px]" : size === "medium" ? "text-[9px]" : "text-[8px]";
  const lineStrokeWidth = size === "full" ? 1.5 : 1.2;

  return (
    <div className={`relative w-full aspect-square ${diagramSize} mx-auto`}>
      {/* Connecting lines */}
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="xMidYMid meet"
      >
        {PRINCIPLES.map((_, i) => {
          const { xPct, yPct } = polarToPercent(i, PRINCIPLES.length);
          const x2 = (xPct / 100) * 400;
          const y2 = (yPct / 100) * 400;
          const isActive = selected === i;
          return (
            <motion.line
              key={i}
              x1={200}
              y1={200}
              x2={x2}
              y2={y2}
              stroke={isActive ? "#E63946" : "#4A1A1F"}
              strokeWidth={isActive ? lineStrokeWidth : lineStrokeWidth * 0.67}
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.08 }}
            />
          );
        })}
      </svg>

      {/* Central node — electric ring + pulsing glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${centerSize} z-10`}>
        <div className="electric-ring absolute inset-[-30%] rounded-full opacity-70" />
        <motion.div
          animate={{
            boxShadow: [
              "0 0 0px rgba(230,57,70,0.3)",
              "0 0 40px rgba(230,57,70,0.5)",
              "0 0 0px rgba(230,57,70,0.3)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-full h-full rounded-full border border-[#E63946]/60 bg-[#141414]/90 backdrop-blur-sm flex flex-col items-center justify-center text-center"
        >
          <span className={`${centerTagSize} tracking-[0.2em] text-[#9A9A9A]`}>
            ALENEX
          </span>
          <span className={`${centerTagSize} tracking-[0.2em] text-[#9A9A9A]`}>
            DIGITAL
          </span>
          <motion.span
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`mt-1 sm:mt-1.5 rounded-full bg-[#E63946] ${centerPulseSize}`}
          />
        </motion.div>
      </div>

      {/* Orbit nodes */}
      {PRINCIPLES.map((p, i) => {
        const { xPct, yPct } = polarToPercent(i, PRINCIPLES.length);
        const isActive = selected === i;
        return (
          <motion.button
            key={p.number}
            onClick={() => setSelected(i)}
            onMouseEnter={() => setSelected(i)}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            whileHover={size === "full" ? { scale: 1.12 } : { scale: 1.08 }}
            style={{
              left: `${xPct}%`,
              top: `${yPct}%`,
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10 active:scale-95 sm:active:scale-100"
          >
            <div className={`relative ${nodeSize}`}>
              {isActive && (
                <div className="electric-ring absolute inset-[-22%] rounded-full opacity-90" />
              )}
              <div
                className={`relative flex flex-col items-center justify-center w-full h-full rounded-full border backdrop-blur-sm transition-all duration-300 ${
                  isActive
                    ? "border-[#E63946] bg-[#141414] shadow-lg shadow-[#E63946]/20"
                    : "border-[#4A1A1F] bg-[#141414]/70"
                }`}
              >
                <span
                  className={`${nodeTagSize} font-bold mb-0.5 sm:mb-1 ${
                    isActive ? "text-[#E63946]" : "text-[#4A1A1F]"
                  }`}
                >
                  {p.number}
                </span>
                <span
                  className={`${nodeTextSize} leading-tight text-center px-1 sm:px-2 whitespace-pre-line ${
                    isActive ? "text-white" : "text-[#9A9A9A]"
                  }`}
                >
                  {p.short}
                </span>
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

function SidePanel({
  selected,
  size,
}: {
  selected: number;
  size: "full" | "medium" | "small";
}) {
  const p = PRINCIPLES[selected];

  // Responsive sizing
  const panelPadding = size === "full" ? "p-8" : size === "medium" ? "p-6" : "p-5";
  const minHeight = size === "full" ? "min-h-[280px]" : size === "medium" ? "min-h-[250px]" : "min-h-[220px]";
  const numberSize = size === "full" ? "text-6xl" : size === "medium" ? "text-5xl" : "text-4xl";
  const titleSize = size === "full" ? "text-2xl" : size === "medium" ? "text-xl" : "text-lg";
  const titleMt = size === "full" ? "mt-4" : size === "medium" ? "mt-3" : "mt-2";
  const titleMb = size === "full" ? "mb-3" : size === "medium" ? "mb-2" : "mb-2";
  const descriptionSize = size === "full" ? "text-[#9A9A9A]" : "text-sm text-[#9A9A9A]";
  const indicatorMt = size === "full" ? "mt-8" : size === "medium" ? "mt-6" : "mt-4";
  const indicatorGap = size === "full" ? "gap-1.5" : size === "medium" ? "gap-1" : "gap-1";
  const indicatorActive = size === "full" ? "w-6" : size === "medium" ? "w-5" : "w-4";
  const indicatorInactive = size === "full" ? "w-1.5" : size === "medium" ? "w-1.5" : "w-1";

  return (
    <div className="relative rounded-lg sm:rounded-xl md:rounded-2xl p-[1.5px] overflow-hidden">
      {/* muted static outline */}
      <div className="pointer-events-none absolute inset-0 rounded-lg sm:rounded-xl md:rounded-2xl border border-[#4A1A1F]/70 z-10" />
      {/* rotating electric border */}
      <div className="electric-ring pointer-events-none absolute inset-[-60%]" />

      <div className={`relative overflow-hidden rounded-[10px] sm:rounded-[15px] bg-[#141414] ${panelPadding} ${minHeight} flex flex-col justify-center`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={p.number}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <span className={`${numberSize} font-bold text-[#E63946]/20 leading-none`}>
              {p.number}
            </span>
            <h3 className={`${titleSize} font-bold text-white ${titleMt} ${titleMb}`}>
              {p.title}
            </h3>
            <p className={`${descriptionSize} leading-relaxed`}>
              {p.description}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className={`flex ${indicatorGap} ${indicatorMt}`}>
          {PRINCIPLES.map((_, i) => (
            <span
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === selected ? `${indicatorActive} bg-[#E63946]` : `${indicatorInactive} bg-[#4A1A1F]`
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileTimeline({
  selected,
  setSelected,
}: {
  selected: number;
  setSelected: (i: number) => void;
}) {
  return (
    <div className="relative pl-6 sm:pl-8">
      <div className="absolute left-[10px] sm:left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-[#E63946]/60 via-[#4A1A1F] to-transparent" />
      <div className="space-y-3 sm:space-y-4">
        {PRINCIPLES.map((p, i) => {
          const isActive = selected === i;
          return (
            <motion.div
              key={p.number}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="relative"
            >
              <span
                className={`absolute -left-[30px] sm:-left-8 top-1 sm:top-1.5 w-5 h-5 sm:w-[22px] sm:h-[22px] rounded-full border flex items-center justify-center text-[8px] sm:text-[9px] font-bold transition-colors duration-300 ${
                  isActive
                    ? "border-[#E63946] bg-[#E63946] text-white"
                    : "border-[#4A1A1F] bg-[#0A0A0A] text-[#9A9A9A]"
                }`}
              >
                {p.number}
              </span>

              <div className="relative rounded-lg sm:rounded-xl p-[1.5px] overflow-hidden">
                {isActive && (
                  <div className="electric-ring pointer-events-none absolute inset-[-60%]" />
                )}
                <button
                  onClick={() => setSelected(isActive ? -1 : i)}
                  className={`relative w-full text-left rounded-[9px] sm:rounded-[10px] border p-3 sm:p-4 transition-colors duration-300 active:scale-95 ${
                    isActive
                      ? "border-[#E63946] bg-[#141414]"
                      : "border-[#4A1A1F] bg-[#141414]/50"
                  }`}
                >
                  <h4 className="text-sm sm:text-base text-white font-semibold">
                    {p.title}
                  </h4>
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="text-xs sm:text-sm text-[#9A9A9A] mt-2 overflow-hidden"
                      >
                        {p.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}