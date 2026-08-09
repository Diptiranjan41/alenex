"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative bg-[#0A0A0A] py-24 md:py-36 border-t border-[#4A1A1F]/40 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#E63946] blur-[160px] opacity-[0.12]" />
      <div className="absolute top-0 left-0 w-[300px] h-[300px] rounded-full bg-[#FF3B4E] blur-[120px] opacity-[0.08]" />

      {/* Subtle grid */}
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

      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="inline-block text-xs font-medium text-[#E63946] uppercase tracking-[0.2em] mb-6">
            Ready to Build?
          </span>

          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Ready to Start Your Project?
          </h2>

          <p className="text-xl text-white/90 mb-4">
            Let&apos;s bring your ideas to life with Alenex.
          </p>

          <p className="text-lg text-[#9A9A9A] leading-relaxed mb-10 max-w-xl mx-auto">
            Whether you have a complete project plan or just an idea,
            let&apos;s discuss how we can turn it into a scalable digital
            solution.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            
            {/* 🚀 SCROLL TO CONTACT SECTION (Form) */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#E63946] text-white font-semibold text-base overflow-hidden transition-shadow duration-300 hover:shadow-2xl hover:shadow-[#E63946]/30"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start a Conversation
                <Mail
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#E63946] to-[#FF3B4E] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>

            {/* 🚀 WHATSAPP DIRECT LINK (For immediate chat) */}
            <motion.a
              href="https://chat.whatsapp.com/Kafv2pSHzhzIl0v1uoEkIh"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[#4A1A1F] text-white font-semibold text-base transition-all duration-300 hover:border-[#E63946] hover:bg-[#141414] hover:shadow-lg hover:shadow-[#E63946]/10"
            >
              <span className="flex items-center justify-center gap-2">
                Chat on WhatsApp
                <MessageCircle
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </motion.a>

            {/* 🚀 LINK TO PORTFOLIO SECTION */}
            <motion.a
              href="#portfolio"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[#4A1A1F] text-white font-semibold text-base transition-all duration-300 hover:border-[#E63946] hover:bg-[#141414]"
            >
              View Our Work
            </motion.a>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-2.5 text-sm text-[#9A9A9A]"
          >
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-[#E63946]"
            />
            Let&apos;s build something meaningful together
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}