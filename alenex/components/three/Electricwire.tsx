"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

type ElectricWireProps = {
  orientation?: "vertical" | "horizontal";
  length?: number; // px, height for vertical / width for horizontal
  thickness?: number; // wire cross-length in px
  particleCount?: number;
  sparkCount?: number;
  className?: string;
};

export default function ElectricWire({
  orientation = "vertical",
  length = 64,
  thickness = 34,
  particleCount = 3,
  sparkCount = 2,
  className = "",
}: ElectricWireProps) {
  const isVertical = orientation === "vertical";

  const particles = useMemo(
    () =>
      Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        delay: (i * 1.6) / particleCount,
        duration: 1.6 + (i % 2) * 0.3,
        offset: isVertical ? (thickness / 2) * (i % 2 === 0 ? -0.15 : 0.15) : 0,
      })),
    [particleCount, thickness, isVertical]
  );

  const sparks = useMemo(
    () =>
      Array.from({ length: sparkCount }, (_, i) => ({
        id: i,
        pos: 0.28 + (i * 0.44) / Math.max(sparkCount - 1, 1),
        delay: i * 0.9 + 0.4,
      })),
    [sparkCount]
  );

  const containerStyle = isVertical
    ? { width: thickness, height: length }
    : { width: length, height: thickness };

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={containerStyle}
    >
      {/* Base wire line — dim, always visible */}
      <div
        className={`absolute rounded-full bg-gradient-to-${isVertical ? "b" : "r"} from-[#4A1A1F]/10 via-[#4A1A1F]/70 to-[#4A1A1F]/10`}
        style={
          isVertical
            ? { width: 2, height: "100%", left: "50%", transform: "translateX(-50%)" }
            : { height: 2, width: "100%", top: "50%", transform: "translateY(-50%)" }
        }
      />

      {/* Ambient glow along the wire */}
      <div
        className={`absolute rounded-full bg-[#E63946] blur-[10px] opacity-[0.14]`}
        style={
          isVertical
            ? { width: 6, height: "100%", left: "50%", transform: "translateX(-50%)" }
            : { height: 6, width: "100%", top: "50%", transform: "translateY(-50%)" }
        }
      />

      {/* Flowing current particles (comet-style: gradient streak + glowing head) */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={
            isVertical
              ? { left: `calc(50% + ${p.offset}px)`, top: 0, transform: "translateX(-50%)" }
              : { top: `calc(50% + ${p.offset}px)`, left: 0, transform: "translateY(-50%)" }
          }
          animate={
            isVertical
              ? { y: ["-12%", "112%"], opacity: [0, 1, 1, 0] }
              : { x: ["-12%", "112%"], opacity: [0, 1, 1, 0] }
          }
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeIn",
            times: [0, 0.12, 0.82, 1],
          }}
        >
          {/* streak trail */}
          <div
            className={`bg-gradient-to-${isVertical ? "b" : "r"} from-transparent via-[#FF3B4E]/70 to-[#E63946]`}
            style={
              isVertical
                ? { width: 3, height: 26, borderRadius: 999 }
                : { height: 3, width: 26, borderRadius: 999 }
            }
          />
          {/* glowing head */}
          <div
            className="absolute rounded-full bg-[#FF3B4E]"
            style={
              isVertical
                ? {
                    width: 6,
                    height: 6,
                    left: "50%",
                    bottom: -1,
                    transform: "translateX(-50%)",
                    boxShadow: "0 0 8px 2px #FF3B4E, 0 0 16px 5px rgba(230,57,70,0.6)",
                  }
                : {
                    width: 6,
                    height: 6,
                    top: "50%",
                    right: -1,
                    transform: "translateY(-50%)",
                    boxShadow: "0 0 8px 2px #FF3B4E, 0 0 16px 5px rgba(230,57,70,0.6)",
                  }
            }
          />
        </motion.div>
      ))}

      {/* Electric sparks — small radial bursts at fixed points along the wire */}
      {sparks.map((s) => (
        <motion.div
          key={s.id}
          className="absolute"
          style={
            isVertical
              ? { left: "50%", top: `${s.pos * 100}%`, transform: "translate(-50%, -50%)" }
              : { top: "50%", left: `${s.pos * 100}%`, transform: "translate(-50%, -50%)" }
          }
          animate={{ opacity: [0, 1, 0], scale: [0.3, 1.15, 0.3] }}
          transition={{
            duration: 0.5,
            delay: s.delay,
            repeat: Infinity,
            repeatDelay: 2.6,
            ease: "easeOut",
          }}
        >
          <Spark />
        </motion.div>
      ))}
    </div>
  );
}

function Spark() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="2" fill="#FF3B4E" />
      <g stroke="#FF3B4E" strokeWidth="1.2" strokeLinecap="round" opacity="0.9">
        <line x1="9" y1="0" x2="9" y2="4" />
        <line x1="9" y1="14" x2="9" y2="18" />
        <line x1="0" y1="9" x2="4" y2="9" />
        <line x1="14" y1="9" x2="18" y2="9" />
        <line x1="2.6" y1="2.6" x2="5.4" y2="5.4" />
        <line x1="12.6" y1="12.6" x2="15.4" y2="15.4" />
        <line x1="2.6" y1="15.4" x2="5.4" y2="12.6" />
        <line x1="12.6" y1="5.4" x2="15.4" y2="2.6" />
      </g>
    </svg>
  );
}