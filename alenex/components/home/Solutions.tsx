"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings2,
  Code2,
  Bot,
  Smartphone,
  BarChart3,
  Cloud,
  Globe,
  Workflow,
  Zap,
  Shield,
  Sparkles,
  ArrowRight,
} from "lucide-react";

// -------- DATA --------
const STEPS = [
  {
    number: "01",
    title: "Business Automation",
    tagline: "Automate. Optimize. Scale.",
    description:
      "Transform repetitive processes into intelligent workflows that improve efficiency, reduce operational costs, and give your team more time to focus on high-value work.",
    tags: ["Workflows", "Efficiency", "Operations"],
    icon: Settings2,
    color: "#FF8A65",
  },
  {
    number: "02",
    title: "Custom Software",
    tagline: "Software built around your business.",
    description:
      "We engineer purpose-built software around your workflows, business logic, and long-term goals — giving you technology that works exactly the way your business needs.",
    tags: ["Custom Systems", "Architecture", "Scalability"],
    icon: Code2,
    color: "#F2603A",
  },
  {
    number: "03",
    title: "AI-Powered Solutions",
    tagline: "Turn data into intelligence.",
    description:
      "Leverage AI and machine learning to automate decisions, uncover valuable insights, and create smarter digital experiences.",
    tags: ["AI / ML", "Automation", "Intelligence"],
    icon: Bot,
    color: "#E63946",
  },
  {
    number: "04",
    title: "Web & Mobile Platforms",
    tagline: "Digital products built for every screen.",
    description:
      "Create fast, scalable, and seamless web and mobile experiences designed to engage users and grow with your business.",
    tags: ["Web", "Mobile", "UX"],
    icon: Smartphone,
    color: "#C22735",
  },
  {
    number: "05",
    title: "Data & Analytics",
    tagline: "Turn complexity into clarity.",
    description:
      "Transform raw data into powerful dashboards, analytics systems, and actionable insights that help your business make smarter decisions.",
    tags: ["Dashboards", "Analytics", "Insights"],
    icon: BarChart3,
    color: "#9A1C28",
  },
  {
    number: "06",
    title: "Cloud & Enterprise Solutions",
    tagline: "Infrastructure that scales with you.",
    description:
      "Scalable cloud architecture built for enterprise-grade reliability, security, and performance as your business grows.",
    tags: ["Cloud", "Infrastructure", "Reliability"],
    icon: Cloud,
    color: "#7A0F18",
  },
];

const WHAT_WE_SOLVE = [
  { title: "Web Development", icon: Globe },
  { title: "AI Systems", icon: Bot },
  { title: "Automation Workflows", icon: Workflow },
];

const BUILT_TO_SCALE = [
  { label: "Performance", icon: Zap },
  { label: "Security", icon: Shield },
  { label: "Cloud", icon: Cloud },
  { label: "Intelligence", icon: Sparkles },
];

export default function SolutionsAdvanced() {
  const [active, setActive] = useState(0);
  const step = STEPS[active];

  return (
    <section className="relative bg-[#0A0A0A] py-20 sm:py-28 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#E63946] blur-[160px] opacity-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#7A0F18] blur-[140px] opacity-10 pointer-events-none" />

      <div className="relative container mx-auto px-4 sm:px-6 md:px-8">
        {/* HERO HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-12 sm:mb-16"
        >
          <span className="font-mono text-xs md:text-sm font-medium text-[#E63946] uppercase tracking-[0.2em]">
            Solutions
          </span>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-3 mb-4 leading-[1.05] tracking-tight"
            style={{ fontFamily: "'Space Grotesk', 'Poppins', sans-serif" }}
          >
            Technology that
            <br />
            moves business forward.
          </h2>
          <p className="text-base sm:text-lg text-[#9A9A9A]">
            Explore our engineering capabilities through an interactive
            solution flow.
          </p>
        </motion.div>

        {/* MAIN PANEL */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-[#232323] bg-[#0D0D0D] overflow-hidden"
        >
          {/* window chrome */}
          <div className="flex items-center gap-2 px-4 sm:px-6 py-3.5 border-b border-[#1E1E1E] bg-[#111111]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF8A65]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#F2603A]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#E63946]" />
            <span className="ml-3 font-mono text-[10px] sm:text-[11px] text-[#6b6b6b] tracking-[0.15em]">
              ALENEX / SOLUTION_NETWORK
            </span>
          </div>

          <div className="grid lg:grid-cols-[1fr_360px]">
            {/* LEFT: node list */}
            <div className="relative p-4 sm:p-8 lg:p-10">
              <div className="relative flex flex-col gap-1.5">
                <div
                  className="absolute left-[31px] sm:left-[35px] top-8 bottom-8 w-px opacity-40"
                  style={{
                    background:
                      "linear-gradient(to bottom, #FF8A65, #E63946, #7A0F18)",
                  }}
                />
                {STEPS.map((s, i) => {
                  const SIcon = s.icon;
                  const isActive = i === active;
                  return (
                    <button
                      key={s.number}
                      type="button"
                      onClick={() => setActive(i)}
                      className={`relative z-10 flex items-center gap-4 rounded-xl px-2 sm:px-3 py-2.5 sm:py-3 text-left transition-colors ${
                        isActive ? "bg-[#161616]" : "hover:bg-[#111111]"
                      }`}
                    >
                      <span
                        className="relative flex items-center justify-center w-14 h-14 rounded-full shrink-0 transition-colors"
                        style={{
                          background: "#141414",
                          border: `2px solid ${
                            isActive ? s.color : "#2A2A2A"
                          }`,
                        }}
                      >
                        {isActive && (
                          <motion.span
                            className="absolute inset-0 rounded-full"
                            style={{ border: `2px solid ${s.color}` }}
                            animate={{
                              scale: [1, 1.3, 1],
                              opacity: [0.6, 0, 0.6],
                            }}
                            transition={{
                              duration: 1.8,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                        )}
                        <SIcon
                          size={22}
                          style={{ color: isActive ? s.color : "#5a5a5a" }}
                          strokeWidth={1.8}
                        />
                      </span>
                      <span className="flex flex-col gap-0.5 min-w-0">
                        <span
                          className="font-mono text-[10px] sm:text-[11px] tracking-wide"
                          style={{ color: isActive ? s.color : "#6b6b6b" }}
                        >
                          {s.number}
                        </span>
                        <span
                          className={`text-sm sm:text-base font-semibold truncate ${
                            isActive ? "text-white" : "text-[#8a8a8a]"
                          }`}
                        >
                          {s.title}
                        </span>
                      </span>
                      {isActive && (
                        <span
                          className="ml-auto hidden sm:inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wider shrink-0"
                          style={{ color: s.color }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: s.color }}
                          />
                          ACTIVE
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RIGHT: current solution detail */}
            <div className="border-t lg:border-t-0 lg:border-l border-[#1E1E1E] bg-[#0B0B0B] p-6 sm:p-8 lg:p-10 flex flex-col">
              <span className="font-mono text-[10px] sm:text-[11px] text-[#6b6b6b] tracking-[0.2em] mb-6 sm:mb-8">
                CURRENT SOLUTION
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col flex-1"
                >
                  <div
                    className="font-mono text-4xl sm:text-5xl font-bold mb-3 sm:mb-4"
                    style={{ color: step.color }}
                  >
                    {step.number}
                  </div>
                  <h3 className="text-white text-xl sm:text-2xl font-bold leading-snug mb-1.5">
                    {step.title}
                  </h3>
                  <p
                    className="text-sm font-medium mb-4"
                    style={{ color: step.color }}
                  >
                    {step.tagline}
                  </p>
                  <p className="text-[#9A9A9A] text-sm sm:text-base leading-relaxed">
                    {step.description}
                  </p>

                  <div className="h-px bg-[#1E1E1E] my-6" />

                  <div className="flex flex-wrap gap-2 mb-8">
                    {step.tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] tracking-wide px-2.5 py-1 rounded-full border"
                        style={{
                          borderColor: `${step.color}55`,
                          color: step.color,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="group inline-flex items-center gap-2 font-semibold text-sm mt-auto w-fit"
                    style={{ color: step.color }}
                  >
                    Explore Solution
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* PROGRESS BAR */}
          <div className="border-t border-[#1E1E1E] px-4 sm:px-8 lg:px-10 py-5 sm:py-6">
            <div className="flex items-center mb-3">
              {STEPS.map((s, i) => (
                <div key={s.number} className="flex items-center flex-1 last:flex-none">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className="font-mono text-[10px] sm:text-[11px] shrink-0 transition-colors"
                    style={{ color: i <= active ? s.color : "#4a4a4a" }}
                  >
                    {s.number}
                  </button>
                  {i < STEPS.length - 1 && (
                    <span
                      className="flex-1 h-px mx-2 sm:mx-3 transition-colors"
                      style={{
                        background: i < active ? STEPS[i + 1].color : "#2A2A2A",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
            <span className="font-mono text-[9px] sm:text-[10px] text-[#5a5a5a] tracking-[0.2em]">
              PROGRESS / SOLUTIONS
            </span>
          </div>
        </motion.div>

        {/* WHAT WE SOLVE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mt-20 sm:mt-28 text-center"
        >
          <h3 className="font-mono text-xs text-[#6b6b6b] tracking-[0.25em] mb-8">
            WHAT WE SOLVE
          </h3>
          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {WHAT_WE_SOLVE.map((w) => {
              const WIcon = w.icon;
              return (
                <div
                  key={w.title}
                  className="rounded-xl border border-[#232323] bg-[#0D0D0D] py-8 px-4 flex flex-col items-center gap-3 hover:border-[#E63946]/50 transition-colors"
                >
                  <WIcon size={22} className="text-[#E63946]" strokeWidth={1.8} />
                  <span className="font-mono text-xs tracking-wide text-white">
                    {w.title.toUpperCase()}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* BUILT TO SCALE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="mt-16 sm:mt-20 rounded-2xl border border-[#232323] bg-[#0D0D0D] py-10 px-6 text-center"
        >
          <h3 className="font-mono text-xs text-[#6b6b6b] tracking-[0.25em] mb-8">
            BUILT TO SCALE
          </h3>
          <div className="flex flex-wrap justify-center gap-8 sm:gap-14">
            {BUILT_TO_SCALE.map((b) => {
              const BIcon = b.icon;
              return (
                <div key={b.label} className="flex items-center gap-2 text-[#9A9A9A]">
                  <BIcon size={16} className="text-[#E63946]" strokeWidth={1.8} />
                  <span className="text-sm">{b.label}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}