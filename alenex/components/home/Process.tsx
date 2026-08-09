"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Compass,
  PenTool,
  Code2,
  Bug,
  Rocket,
  LifeBuoy,
  Plus,
} from "lucide-react";
import ElectricWire from "../three/Electricwire";

type Step = {
  number: string;
  title: string;
  description: string;
  icon: typeof Search;
  includes: string[];
};

const STEPS: Step[] = [
  {
    number: "01",
    title: "Discover",
    description:
      "Understanding your business objectives, target users, and identifying key challenges to define project scope.",
    icon: Search,
    includes: [
      "Business requirements",
      "User needs",
      "Existing system analysis",
      "Project goals",
    ],
  },
  {
    number: "02",
    title: "Strategy",
    description: "Converting business requirements into a comprehensive technical roadmap and architecture strategy.",
    icon: Compass,
    includes: [
      "Project roadmap",
      "Technology selection",
      "Architecture planning",
      "Timeline & milestones",
    ],
  },
  {
    number: "03",
    title: "Design",
    description:
      "Creating intuitive and scalable user experiences that align with business goals and user expectations.",
    icon: PenTool,
    includes: ["UX research", "Wireframes", "UI design", "Prototypes"],
  },
  {
    number: "04",
    title: "Develop",
    description: "Building robust, production-ready software using modern frameworks and best practices.",
    icon: Code2,
    includes: [
      "Frontend development",
      "Backend development",
      "API integration",
      "Database",
      "Third-party integrations",
    ],
  },
  {
    number: "05",
    title: "Test",
    description: "Comprehensive testing to ensure quality, performance, security, and reliability before launch.",
    icon: Bug,
    includes: [
      "Functional testing",
      "Performance testing",
      "Security testing",
      "Bug fixing",
      "Cross-device testing",
    ],
  },
  {
    number: "06",
    title: "Launch",
    description: "Deploying applications to production environments with continuous monitoring and optimization.",
    icon: Rocket,
    includes: [
      "Cloud deployment",
      "Domain & hosting",
      "CI/CD",
      "Production monitoring",
    ],
  },
  {
    number: "07",
    title: "Support & Scale",
    description: "Maintaining, optimizing, and scaling applications to support growth and evolving business needs.",
    icon: LifeBuoy,
    includes: [
      "Maintenance",
      "Security updates",
      "Performance optimization",
      "New features",
      "Technical support",
    ],
  },
];

const ROW_ONE = STEPS.slice(0, 3);
const ROW_TWO = STEPS.slice(3, 6);

export default function Process() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
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

  const toggle = (number: string) =>
    setOpenIndex((prev) => (prev === number ? null : number));

  // Responsive sizing
  const sectionPy = isMobile ? "py-12 sm:py-16" : isTablet ? "py-20 md:py-24" : "py-24 md:py-32";
  const headerMb = isMobile ? "mb-8 sm:mb-12" : isTablet ? "mb-14 md:mb-18" : "mb-16 md:mb-24";
  const gapSize = isMobile ? "gap-3 sm:gap-4" : isTablet ? "gap-4 md:gap-5" : "gap-6";
  const cardPadding = isMobile ? "p-4 sm:p-5" : isTablet ? "p-5 md:p-6" : "p-6";
  const iconSize = isMobile ? 16 : isTablet ? 17 : 18;
  const plusSize = isMobile ? 16 : isTablet ? 17 : 18;
  const titleSize = isMobile ? "text-base sm:text-lg" : isTablet ? "text-lg md:text-lg" : "text-lg";
  const descriptionSize = isMobile ? "text-xs sm:text-sm" : isTablet ? "text-sm" : "text-sm";
  const wireLength = isMobile ? 48 : isTablet ? 60 : 72;
  const wireThickness = isMobile ? 16 : isTablet ? 22 : 30;
  const wireParticles = isMobile ? 1 : isTablet ? 2 : 3;
  const wireSparks = isMobile ? 1 : isTablet ? 1 : 2;
  const wireVerticalPy = isMobile ? "py-2 sm:py-2.5" : isTablet ? "py-3" : "py-3 md:py-4";

  return (
    <section
      className={`relative bg-[#0A0A0A] ${sectionPy} border-t border-[#4A1A1F]/40 overflow-hidden min-h-screen flex flex-col justify-center`}
      aria-labelledby="process-title"
    >
      {/* Background Glow */}
      <div className="absolute top-1/3 right-0 w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[420px] md:h-[420px] lg:w-[500px] lg:h-[500px] rounded-full bg-[#E63946] blur-[80px] sm:blur-[110px] md:blur-[140px] lg:blur-[160px] opacity-10 pointer-events-none" />

      <div className="relative container mx-auto px-4 sm:px-6 md:px-6 flex flex-col items-center">
        
        {/* CENTERED & PROFESSIONAL HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`max-w-4xl mx-auto text-center ${headerMb} flex-shrink-0`}
        >
          {/* Tagline */}
          <span className="inline-block text-[9px] sm:text-[10px] md:text-xs font-bold text-[#E63946] uppercase tracking-[0.2em] sm:tracking-[0.25em] mb-3 sm:mb-4 md:mb-6 bg-[#E63946]/10 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-full border border-[#E63946]/20">
            OUR PROCESS
          </span>

          {/* Main Heading */}
          <h2
            id="process-title"
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mt-1 sm:mt-2 mb-3 sm:mb-4 md:mb-6 leading-[1.2] sm:leading-[1.15] md:leading-[1.1] tracking-tight"
          >
            From Vision to Reality, <br className="hidden xs:block" />
            <span className="bg-gradient-to-r from-[#E63946] via-[#FF8A65] to-[#E63946] bg-clip-text text-transparent bg-size-200 animate-gradient">
              Engineered End to End.
            </span>
          </h2>

          {/* Subheading Description */}
          <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-[#9A9A9A] font-light leading-relaxed md:leading-relaxed max-w-2xl md:max-w-3xl mx-auto tracking-wide px-2">
            A structured, collaborative approach that transforms ideas into scalable, high-performance digital solutions—built with precision at every stage.
          </p>
        </motion.div>

        {/* CARDS LAYOUT */}
        
        {/* Row 1: Discover -> Strategy -> Design */}
        <StepRow
          steps={ROW_ONE}
          openIndex={openIndex}
          toggle={toggle}
          showArrows={isDesktop}
          gapSize={gapSize}
          cardPadding={cardPadding}
          iconSize={iconSize}
          plusSize={plusSize}
          titleSize={titleSize}
          descriptionSize={descriptionSize}
          wireLength={wireLength}
          wireThickness={wireThickness}
          wireParticles={wireParticles}
          wireSparks={wireSparks}
        />

        {/* Electric connector down to row 2 */}
        <div className={`flex justify-center ${wireVerticalPy} z-10`}>
          <ElectricWire
            orientation="vertical"
            length={wireLength}
            thickness={wireThickness}
            particleCount={wireParticles}
            sparkCount={wireSparks}
          />
        </div>

        {/* Row 2: Develop -> Test -> Launch */}
        <StepRow
          steps={ROW_TWO}
          openIndex={openIndex}
          toggle={toggle}
          showArrows={isDesktop}
          gapSize={gapSize}
          cardPadding={cardPadding}
          iconSize={iconSize}
          plusSize={plusSize}
          titleSize={titleSize}
          descriptionSize={descriptionSize}
          wireLength={wireLength}
          wireThickness={wireThickness}
          wireParticles={wireParticles}
          wireSparks={wireSparks}
        />

        {/* Electric connector down to Support */}
        <div className={`flex justify-center ${wireVerticalPy} z-10`}>
          <ElectricWire
            orientation="vertical"
            length={wireLength}
            thickness={wireThickness}
            particleCount={wireParticles}
            sparkCount={wireSparks}
          />
        </div>

        {/* Row 3: Support & Scale (Perfectly centered & responsive) */}
        <div className="flex justify-center w-full">
          <div className={isMobile ? "w-full sm:w-full" : isTablet ? "w-full md:w-[65%]" : "w-full md:w-[32%]"}>
            <StepCard
              step={STEPS[6]}
              isOpen={openIndex === STEPS[6].number}
              onToggle={() => toggle(STEPS[6].number)}
              cardPadding={cardPadding}
              iconSize={iconSize}
              plusSize={plusSize}
              titleSize={titleSize}
              descriptionSize={descriptionSize}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* SUB COMPONENTS */

function StepRow({
  steps,
  openIndex,
  toggle,
  showArrows = false,
  gapSize,
  cardPadding,
  iconSize,
  plusSize,
  titleSize,
  descriptionSize,
  wireLength,
  wireThickness,
  wireParticles,
  wireSparks,
}: {
  steps: Step[];
  openIndex: string | null;
  toggle: (n: string) => void;
  showArrows?: boolean;
  gapSize: string;
  cardPadding: string;
  iconSize: number;
  plusSize: number;
  titleSize: string;
  descriptionSize: string;
  wireLength: number;
  wireThickness: number;
  wireParticles: number;
  wireSparks: number;
}) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${gapSize} items-stretch relative w-full`}>
      {steps.map((step, i) => (
        <div key={step.number} className="relative flex">
          <StepCard
            step={step}
            isOpen={openIndex === step.number}
            onToggle={() => toggle(step.number)}
            cardPadding={cardPadding}
            iconSize={iconSize}
            plusSize={plusSize}
            titleSize={titleSize}
            descriptionSize={descriptionSize}
          />
          {showArrows && i < steps.length - 1 && (
            <div className="hidden md:flex absolute top-6 -right-[26px] z-10 -translate-y-1/2 rotate-90">
              <ElectricWire
                orientation="vertical"
                length={wireLength}
                thickness={wireThickness}
                particleCount={wireParticles}
                sparkCount={wireSparks}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function StepCard({
  step,
  isOpen,
  onToggle,
  cardPadding,
  iconSize,
  plusSize,
  titleSize,
  descriptionSize,
}: {
  step: Step;
  isOpen: boolean;
  onToggle: () => void;
  cardPadding: string;
  iconSize: number;
  plusSize: number;
  titleSize: string;
  descriptionSize: string;
}) {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      onClick={onToggle}
      className={`group cursor-pointer relative rounded-lg sm:rounded-xl md:rounded-2xl border bg-[#141414]/70 backdrop-blur-sm ${cardPadding} transition-all duration-300 flex flex-col h-full w-full active:scale-95 sm:active:scale-100 ${
        isOpen
          ? "border-[#E63946] shadow-lg shadow-[#E63946]/10"
          : "border-[#4A1A1F] hover:border-[#E63946]/60"
      }`}
    >
      <div className="flex items-start justify-between mb-3 sm:mb-4 md:mb-5">
        <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
          <span className="text-xs sm:text-xs md:text-sm font-bold text-[#E63946] tracking-wider shrink-0">
            {step.number}
          </span>
          <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg bg-[#E63946]/10 border border-[#4A1A1F] flex items-center justify-center group-hover:bg-[#E63946]/20 transition-colors duration-300 shrink-0">
            <Icon size={iconSize} className="text-[#E63946]" />
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-[#9A9A9A] group-hover:text-white shrink-0"
        >
          <Plus size={plusSize} />
        </motion.div>
      </div>

      {/* Title */}
      <h3 className={`text-white font-semibold ${titleSize} mb-1 sm:mb-1.5 md:mb-1.5 text-balance leading-tight min-h-[2rem] sm:min-h-[2rem] md:min-h-[2.5rem]`}>
        {step.title}
      </h3>

      {/* Description */}
      <p className={`${descriptionSize} text-[#9A9A9A] leading-relaxed`}>
        {step.description}
      </p>

      {/* Expandable Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden flex-grow mt-auto"
          >
            <ul className="mt-4 sm:mt-4 md:mt-5 pt-4 sm:pt-4 md:pt-5 border-t border-[#4A1A1F]/60 space-y-2 sm:space-y-2 md:space-y-2.5">
              {step.includes.map((inc) => (
                <li
                  key={inc}
                  className={`flex items-center gap-1.5 sm:gap-2 md:gap-2.5 ${descriptionSize} text-[#C9C9C9]`}
                >
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-1.5 md:h-1.5 rounded-full bg-[#E63946] shrink-0" />
                  {inc}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}