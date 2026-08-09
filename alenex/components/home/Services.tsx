"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Smartphone,
  Palette,
  Building2,
  Bot,
  Database,
  Cloud,
  Wrench,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

type ServiceItem = {
  icon: typeof Code2;
  title: string;
  description: string;
};

const SERVICES: ServiceItem[] = [
  {
    icon: Code2,
    title: "Web Development",
    description: "Modern, responsive business & web applications.",
  },
  {
    icon: Smartphone,
    title: "App Development",
    description: "Android/iOS apps and cross-platform apps.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "User research, wireframes, prototypes, modern interfaces.",
  },
  {
    icon: Building2,
    title: "Custom Software Development",
    description: "Business-specific software and internal platforms.",
  },
  {
    icon: Bot,
    title: "AI & Automation",
    description:
      "AI integration, intelligent workflows, chatbots, automation.",
  },
  {
    icon: Database,
    title: "API & Backend Development",
    description: "APIs, databases, authentication, scalable backend.",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description: "Cloud deployment, CI/CD, monitoring and scalability.",
  },
  {
    icon: Wrench,
    title: "Software Maintenance & Support",
    description: "Bug fixing, optimization, updates and ongoing support.",
  },
];

const COLORS = [
  "#FF8A65",
  "#F2703F",
  "#E63946",
  "#D42E3D",
  "#C22735",
  "#A3202C",
  "#851A24",
  "#5C1119",
];

const ROW_TOP = { low: 300, high: 60 };
const COL_WIDTH = 190;

export default function Services() {
  const [revealed, setRevealed] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // --- Perfect Forward/Backward Logic ---
  const handleClick = (index: number) => {
    // Turn OFF the light if clicked again (Go back 1 step)
    if (index === revealed) {
      setRevealed((r) => Math.max(r - 1, 0));
      return;
    }
    // Turn ON the next light (Go forward 1 step)
    if (index === revealed + 1) {
      setRevealed((r) => Math.min(r + 1, SERVICES.length));
    }
  };

  // Function to scroll container smoothly
  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400; 
      const currentScroll = scrollContainerRef.current.scrollLeft;
      
      scrollContainerRef.current.scrollTo({
        left: direction === "right" ? currentScroll + scrollAmount : currentScroll - scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section 
      className="relative bg-[#0A0A0A] py-20 md:py-28 overflow-hidden min-h-screen flex flex-col justify-center"
      aria-labelledby="services-title"
    >
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-[420px] h-[420px] rounded-full bg-[#E63946] blur-[140px] opacity-10 pointer-events-none" />

      <div className="relative container mx-auto px-4 md:px-6 pb-16 flex flex-col h-full">
        
        {/* --- NEW PROFESSIONAL HEADER --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center mb-12 md:mb-20 flex-shrink-0"
        >
          {/* Tagline */}
          <span className="inline-block text-[10px] md:text-xs font-bold text-[#E63946] uppercase tracking-[0.25em] mb-5 bg-[#E63946]/10 px-5 py-2.5 rounded-full border border-[#E63946]/20">
            OUR SERVICES
          </span>

          {/* Main Heading */}
          <h1 id="services-title" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mt-2 mb-5 leading-[1.1] tracking-tight">
            Technology built for <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[#E63946] via-[#FF8A65] to-[#E63946] bg-clip-text text-transparent bg-size-200 animate-gradient">
              what’s next.
            </span>
          </h1>

          {/* Subheading Description */}
          <p className="text-base sm:text-lg md:text-xl text-[#9A9A9A] font-light leading-relaxed max-w-3xl mx-auto tracking-wide">
            From intelligent software to scalable digital products, we design, build, and transform ideas into solutions that move businesses forward.
          </p>
        </motion.div>


        {/* --- Torch-lit Flow (Services Carousel) --- */}
        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto overflow-y-hidden pb-8 -mx-4 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth flex-grow"
        >
          <div
            className="relative"
            style={{ height: 460, minWidth: SERVICES.length * COL_WIDTH }}
          >
            {/* Connecting Beams SVG */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ overflow: "visible" }}
            >
              <defs>
                {SERVICES.slice(0, -1).map((_, i) => (
                  <linearGradient
                    key={i}
                    id={`svc-seg-${i}`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor={COLORS[i]} />
                    <stop offset="100%" stopColor={COLORS[i + 1]} />
                  </linearGradient>
                ))}
              </defs>
              {SERVICES.slice(0, -1).map((_, i) => {
                const ax = COL_WIDTH * i + COL_WIDTH / 2;
                const bx = COL_WIDTH * (i + 1) + COL_WIDTH / 2;
                const ay = (i % 2 === 0 ? ROW_TOP.low : ROW_TOP.high) + 34;
                const by = ((i + 1) % 2 === 0 ? ROW_TOP.low : ROW_TOP.high) + 34;
                const lit = revealed > i + 1;
                return (
                  <motion.line
                    key={i}
                    x1={ax}
                    y1={ay}
                    x2={bx}
                    y2={by}
                    stroke={`url(#svc-seg-${i})`}
                    strokeWidth={3}
                    strokeLinecap="round"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: lit ? 0.85 : 0 }}
                    transition={{ duration: 0.5 }}
                  />
                );
              })}
            </svg>

            {SERVICES.map((service, i) => {
              const Icon = service.icon;
              const color = COLORS[i];
              const isLow = i % 2 === 0;
              const topPx = isLow ? ROW_TOP.low : ROW_TOP.high;
              const beamHeight = topPx + 34;

              const isOpen = i < revealed;
              const isCurrent = i === revealed;
              const isDark = i > revealed;

              return (
                <div
                  key={service.title}
                  className="absolute"
                  style={{ left: COL_WIDTH * i, width: COL_WIDTH, top: 0 }}
                >
                  {/* torch spotlight */}
                  {!isDark && (
                    <motion.div
                      className="absolute left-1/2 -translate-x-1/2 pointer-events-none rounded-full"
                      style={{
                        top: topPx - 60,
                        width: 260,
                        height: 260,
                        background: `radial-gradient(circle, ${color}33 0%, ${color}14 40%, transparent 70%)`,
                      }}
                      initial={{ opacity: 0, scale: 0.3 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  )}

                  {/* light beam */}
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 top-0 pointer-events-none"
                    style={{
                      width: 60,
                      height: beamHeight,
                      background: `linear-gradient(to bottom, transparent, ${color}55 55%, ${color}CC 100%)`,
                      filter: "blur(10px)",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isDark ? 0 : 1 }}
                    transition={{ duration: 0.5 }}
                  />

                  <button
                    type="button"
                    onClick={() => handleClick(i)}
                    className="relative flex flex-col items-center text-left w-full"
                    style={{ cursor: "pointer" }}
                  >
                    {/* pedestal group */}
                    <div
                      className="relative"
                      style={{ marginTop: topPx, width: 96, height: 68 }}
                    >
                      {/* glow ring */}
                      <motion.span
                        className="absolute left-1/2 -translate-x-1/2 bottom-0 rounded-full"
                        style={{
                          width: 92,
                          height: 40,
                          border: `3px solid ${isDark ? "#2A1114" : color}`,
                        }}
                        animate={{
                          boxShadow: isDark
                            ? "0 0 0 0 transparent"
                            : `0 0 26px 4px ${color}66, inset 0 0 20px ${color}33`,
                          scale: isCurrent ? [1, 1.06, 1] : 1,
                        }}
                        transition={{
                          boxShadow: { duration: 0.5 },
                          scale: {
                            duration: 1.4,
                            repeat: isCurrent ? Infinity : 0,
                            ease: "easeInOut",
                          },
                        }}
                      />
                      {/* pedestal side */}
                      <span
                        className="absolute left-1/2 -translate-x-1/2 bottom-1 rounded-full"
                        style={{ width: 54, height: 20, background: "#1C1C1C" }}
                      />
                      {/* inner white door */}
                      <div
                        className="absolute left-1/2 -translate-x-1/2 bottom-3 overflow-hidden"
                        style={{ width: 54, height: 18, borderRadius: 999 }}
                      >
                        <motion.span
                          className="absolute inset-0 origin-left"
                          style={{
                            background:
                              "linear-gradient(to bottom, #ffffff, #e9e9e9)",
                          }}
                          initial={false}
                          animate={{ scaleX: isDark ? 0 : 1 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        />
                      </div>

                      {/* icon */}
                      <motion.span
                        className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center rounded-full"
                        style={{
                          bottom: 30,
                          width: 40,
                          height: 40,
                          background: "#141414",
                          border: `2px solid ${isDark ? "#2A1114" : color}`,
                        }}
                        initial={{ scale: 0.3, opacity: 0 }}
                        animate={{
                          scale: isDark ? 0.6 : 1,
                          opacity: isDark ? 0.25 : 1,
                          boxShadow: isDark
                            ? "0 0 0 0 transparent"
                            : `0 0 18px ${color}77`,
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        <Icon
                          size={18}
                          style={{ color: isDark ? "#3A1F22" : color }}
                          strokeWidth={2}
                        />
                      </motion.span>
                    </div>

                    {/* number */}
                    <span
                      className="mt-3 text-2xl font-black leading-none"
                      style={{
                        WebkitTextStroke: `1.5px ${
                          isDark ? "#2A1114" : color
                        }`,
                        color: "transparent",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </button>

                  {/* title + description */}
                  <AnimatePresence>
                    {!isDark && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.15 }}
                        className="mt-2 px-2 text-center"
                      >
                        <h3
                          className="font-semibold text-[13px] leading-tight mb-1"
                          style={{
                            color: "#fff",
                            textShadow: `0 0 12px ${color}88`,
                          }}
                        >
                          {service.title}
                        </h3>
                        {isOpen && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            className="text-[11px] text-[#9A9A9A] leading-relaxed"
                          >
                            {service.description}
                          </motion.p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* --- RESPONSIVE DUAL SCROLL INDICATORS --- */}
      <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 flex justify-center gap-4 z-20 px-4">
        <button
          onClick={() => handleScroll("left")}
          aria-label="Scroll services to the left"
          title="Scroll Left"
          className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#E63946]/30 bg-[#0A0A0A]/90 backdrop-blur-sm hover:bg-[#E63946]/10 transition-all duration-300 group shadow-[0_0_15px_rgba(230,57,70,0.15)]"
        >
          <ArrowLeft 
            size={20} 
            className="text-[#E63946] group-hover:scale-110 transition-transform" 
            strokeWidth={2}
          />
        </button>

        <button
          onClick={() => handleScroll("right")}
          aria-label="Scroll services to the right"
          title="Scroll Right"
          className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#E63946]/30 bg-[#0A0A0A]/90 backdrop-blur-sm hover:bg-[#E63946]/10 transition-all duration-300 group shadow-[0_0_15px_rgba(230,57,70,0.15)]"
        >
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowRight 
              size={20} 
              className="text-[#E63946] group-hover:scale-110 transition-transform" 
              strokeWidth={2}
            />
          </motion.div>
        </button>
      </div>

    </section>
  );
}