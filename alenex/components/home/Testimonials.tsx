"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Star, ChevronRight } from "lucide-react";
import Image from "next/image";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

// --- 10 ODISHA-STYLE SAMPLE TESTIMONIALS ---
const TESTIMONIALS: Testimonial[] = [
  {
    quote: "ALENEX transformed our idea into a clean, professional web application. The development process was smooth and well structured.",
    name: "Aditya Mohanty",
    role: "Bhubaneswar",
  },
  {
    quote: "The UI/UX quality was impressive. Our product now feels much more modern and easier to use.",
    name: "Priyanka Das",
    role: "Cuttack",
  },
  {
    quote: "The team understood our requirements quickly and delivered a scalable solution with great attention to detail.",
    name: "Siddharth Rout",
    role: "Rourkela",
  },
  {
    quote: "From design to development, the communication was excellent. The final product matched our vision very well.",
    name: "Swati Pradhan",
    role: "Bhubaneswar",
  },
  {
    quote: "ALENEX helped us simplify a complex workflow into an easy-to-use digital platform.",
    name: "Abhishek Behera",
    role: "Berhampur",
  },
  {
    quote: "Professional, responsive, and technically strong. The overall experience was excellent.",
    name: "Ananya Patnaik",
    role: "Puri",
  },
  {
    quote: "The application performance and overall design exceeded our expectations. Highly impressed with the execution.",
    name: "Rakesh Sahu",
    role: "Sambalpur",
  },
  {
    quote: "They turned our concept into a polished digital product with a strong focus on user experience.",
    name: "Sneha Mohapatra",
    role: "Balasore",
  },
  {
    quote: "Great technical expertise and a very organized development process. We were happy with the final result.",
    name: "Rahul Jena",
    role: "Angul",
  },
  {
    quote: "ALENEX delivered a modern solution that aligned perfectly with our business requirements.",
    name: "Niharika Mishra",
    role: "Bhubaneswar",
  },
];

const TECH_STACK = [
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "MongoDB",
  "PostgreSQL",
];

export default function TestimonialSection() {
  const [openEnvelopeIndex, setOpenEnvelopeIndex] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0); // 0 = Cards 0-3, 1 = Cards 4-7, 2 = Cards 8-9

  const toggleEnvelope = (idx: number) => {
    setOpenEnvelopeIndex((prev) => (prev === idx ? null : idx));
  };

  const ITEMS_PER_SLIDE = 4;
  const totalSlides = Math.ceil(TESTIMONIALS.length / ITEMS_PER_SLIDE);

  // Next Slide Function
  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      setCurrentSlide(0); // Loop back to start
    }
  };

  // Calculate which cards to show based on the current slide
  const startIndex = currentSlide * ITEMS_PER_SLIDE;
  const endIndex = startIndex + ITEMS_PER_SLIDE;
  const visibleTestimonials = TESTIMONIALS.slice(startIndex, endIndex);

  return (
    <div className="bg-[#0A0A0A] py-24 md:py-32 overflow-hidden relative min-h-[600px]">
      
      {/* Subtle Background Grid */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div className="absolute inset-0 animate-[grid-pan_30s_linear_infinite]" style={{ backgroundImage: `linear-gradient(rgba(230,57,70,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(230,57,70,0.4) 1px, transparent 1px)`, backgroundSize: "44px 44px" }} />
      </div>

      <div className="relative container mx-auto px-4">
        
        {/* --- HEADER --- */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }} className="max-w-4xl mx-auto text-center mb-16 md:mb-20">
          <span className="inline-block text-[10px] md:text-xs font-bold text-[#E63946] uppercase tracking-[0.25em] mb-6 bg-[#E63946]/10 px-5 py-2.5 rounded-full border border-[#E63946]/20">CLIENT STORIES</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mt-2 mb-6 leading-[1.1] tracking-tight">
            Trusted by Teams <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[#E63946] via-[#FF8A65] to-[#E63946] bg-clip-text text-transparent bg-size-200 animate-gradient">Building What’s Next.</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#9A9A9A] font-light leading-relaxed max-w-3xl mx-auto tracking-wide">
            Real experiences from businesses and teams who partnered with ALENEX to turn ambitious ideas into reliable digital products.
          </p>
        </motion.div>

        {/* --- SLIDER CAROUSEL CONTAINER (4 Cards at a time) --- */}
        <div className="relative w-full max-w-6xl mx-auto flex justify-center items-center">
          
          {/* Next Button (Right Side) */}
          <button
            onClick={nextSlide}
            className="absolute -right-2 md:-right-12 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-[#0A0A0A]/90 backdrop-blur-md border border-[#E63946]/30 shadow-lg shadow-[#E63946]/10 hover:bg-[#E63946]/10 hover:border-[#E63946] transition-all duration-300 group"
            aria-label="Next testimonials"
          >
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronRight size={24} className="text-[#E63946] group-hover:scale-110 transition-transform" />
            </motion.div>
          </button>

          {/* Slide Wrapper */}
          <div className="w-full overflow-hidden px-1">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${Math.min(visibleTestimonials.length, 4)} gap-6 w-full`}
            >
              {visibleTestimonials.map((t, i) => {
                const originalIndex = startIndex + i;
                const isOpen = openEnvelopeIndex === originalIndex;

                return (
                  <div key={originalIndex} className="flex flex-col items-center relative w-full max-w-[350px] mx-auto mx-auto justify-self-center">
                    
                    {/* --- 1. CLOSED ENVELOPE (Top Section) --- */}
                    <motion.div
                      onClick={() => toggleEnvelope(originalIndex)}
                      className={`relative w-full z-20 cursor-pointer transition-all duration-500`}
                      animate={{ scale: isOpen ? 0.95 : 1 }}
                    >
                      <div className="relative w-full h-[200px] rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] border border-[#4A1A1F] shadow-xl overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#E63946]/10 to-transparent opacity-50" />
                        
                        {/* Envelope Info */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                          <Mail className="text-[#E63946]/40 mb-2" size={32} />
                          <h4 className="text-white font-bold text-xl tracking-wide uppercase">CLIENT</h4>
                          <p className="text-[#9A9A9A] text-base font-medium mt-1">{t.name}</p>
                          <p className="text-[#6A6A6A] text-sm">{t.role}</p>
                        </div>

                        {/* Flap with Logo */}
                        <motion.div
                          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#252525] to-[#141414] border border-[#4A1A1F] origin-top flex flex-col items-center justify-center overflow-hidden z-20 shadow-sm"
                          animate={{ rotateX: isOpen ? -180 : 0, transformOrigin: "top center" }}
                          transition={{ duration: 0.6, ease: [0.25, 0.8, 0.5, 1] }}
                        >
                          <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#1A1A1A]/20" style={{ clipPath: "polygon(0 100%, 50% 0, 100% 100%)" }} />
                          <div className="relative w-36 h-24 mt-4">
                            <Image src="/alenex.png" alt="ALENEX Logo" fill className="object-contain drop-shadow-[0_0_20px_rgba(230,57,70,0.4)]" priority />
                          </div>
                          {!isOpen && (
                            <motion.div initial={{ opacity: 0.6 }} whileHover={{ opacity: 1 }} className="absolute bottom-6 left-0 right-0 flex items-center justify-center">
                              <p className="text-[#9A9A9A]/70 text-xs font-medium tracking-[0.2em] uppercase">Click to Open</p>
                            </motion.div>
                          )}
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* --- 2. OPEN REVIEW CARD (Bottom Section) --- */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -20, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -20, scale: 0.95 }}
                          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                          className="relative w-full z-10 p-6 rounded-2xl bg-[#141414]/90 backdrop-blur-sm border border-[#4A1A1F] shadow-2xl shadow-[#E63946]/10 h-auto"
                        >
                          {/* RED ELECTRIC FRAME ANIMATION */}
                          <div className="absolute -inset-[2px] rounded-2xl overflow-hidden pointer-events-none -z-10">
                            <motion.div
                              className="absolute inset-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_60%,#E63946_70%,#FF8A65_80%,transparent_90%)]"
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            />
                            <div className="absolute inset-[2px] rounded-2xl bg-[#141414]/95" />
                            <div className="absolute -inset-[10px] rounded-2xl bg-[#E63946]/20 blur-[15px] opacity-50" />
                          </div>

                          {/* Content */}
                          <div className="flex gap-1 mb-4 relative z-10">
                            {[...Array(5)].map((_, star) => (<Star key={star} size={18} className="fill-[#E63946] text-[#E63946]" />))}
                          </div>

                          <p className="text-[16px] text-[#C9C9C9] leading-relaxed italic relative z-10">
                            &ldquo;{t.quote}&rdquo;
                          </p>

                          <div className="flex items-center justify-end gap-3 border-t border-[#4A1A1F]/40 pt-4 mt-4 relative z-10">
                            <div className="w-10 h-10 rounded-full bg-[#E63946]/10 border border-[#4A1A1F] flex items-center justify-center text-[#E63946] font-bold text-sm">
                              {t.name.charAt(0)}
                            </div>
                            <div className="text-right">
                              <p className="text-white font-semibold text-sm">{t.name}</p>
                              <p className="text-[#9A9A9A] text-xs">{t.role}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                  </div>
                );
              })}
            </motion.div>
          </div>
          
          {/* Slide Indicators (Dots under the container) */}
          <div className="absolute -bottom-12 left-0 right-0 flex justify-center gap-2 z-20">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? "w-8 bg-[#E63946]" : "w-1.5 bg-[#4A1A1F] hover:bg-[#E63946]/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ---------- Bottom Tech Stack Strip ---------- */}
        <div className="mt-20 pt-8 border-t border-[#4A1A1F]/40">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {TECH_STACK.map((tech, i) => (
              <span key={tech} className="flex items-center gap-x-10">
                <span className="text-sm md:text-base text-[#9A9A9A] tracking-wide">{tech}</span>
                {i < TECH_STACK.length - 1 && <span className="text-[#4A1A1F]">•</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}