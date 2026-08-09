"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// Custom Icon Component for WhatsApp
function WhatsAppIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

// Custom Icon Component for Email
function MailIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </svg>
  );
}

const FOOTER_COLUMNS = [
  {
    heading: "EXPLORE",
    links: [
      { label: "Solutions", href: "#solutions" },
      { label: "Services", href: "#services" },
      { label: "Process", href: "#process" },
    ],
  },
  {
    heading: "SERVICES",
    links: [
      { label: "Web Dev", href: "#services" },
      { label: "Mobile", href: "#services" },
      { label: "UI/UX", href: "#services" },
      { label: "AI", href: "#services" },
    ],
  },
  {
    heading: "COMPANY",
    links: [
      { label: "About", href: "#why-alenex" },
      { label: "Contact", href: "#contact" },
      { label: "Process", href: "#process" },
    ],
  },
  {
    heading: "CONNECT",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/company/139544353/admin/dashboard/" },
      { label: "Email", href: "mailto:alenexpvt@gmail.com" },
      { label: "WhatsApp Community", href: "https://chat.whatsapp.com/Kafv2pSHzhzIl0v1uoEkIh" },
    ],
  },
];

const SOCIALS = [
  { icon: WhatsAppIcon, href: "https://chat.whatsapp.com/Kafv2pSHzhzIl0v1uoEkIh", label: "WhatsApp" },
];

const LEGAL_LINKS = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Cookies", href: "#" },
];

export default function Footer() {
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
  const containerPx = isMobile ? "px-4 sm:px-6" : isTablet ? "px-6 md:px-6" : "px-4";

  // CTA Panel
  const ctaPanelPy = isMobile ? "py-8 sm:py-12" : isTablet ? "py-14 md:py-20" : "py-16 md:py-24";
  const ctaPanelMt = isMobile ? "mt-12 sm:mt-16" : isTablet ? "mt-16 md:mt-20" : "mt-24";
  const ctaPanelMb = isMobile ? "mb-12 sm:mb-16" : isTablet ? "mb-14 md:mb-18" : "mb-20";
  const ctaPanelPx = isMobile ? "px-4 sm:px-6" : isTablet ? "px-6 md:px-8" : "px-8";
  const ctaPanelRounded = isMobile ? "rounded-2xl sm:rounded-3xl" : isTablet ? "rounded-3xl md:rounded-[32px]" : "rounded-[32px]";
  const ctaPanelGlowSize = isMobile ? "w-[300px] h-[200px] blur-[80px]" : isTablet ? "w-[400px] h-[250px] blur-[110px]" : "w-[500px] h-[300px] blur-[130px]";

  const ctaHeadingSize = isMobile ? "text-3xl sm:text-4xl" : isTablet ? "text-5xl md:text-6xl" : "text-5xl md:text-7xl lg:text-8xl";
  const ctaHeadingMb = isMobile ? "mb-4 sm:mb-6" : isTablet ? "mb-6 md:mb-8" : "mb-8";
  const ctaDescSize = isMobile ? "text-sm sm:text-base" : isTablet ? "text-base md:text-lg" : "text-lg md:text-xl";
  const ctaDescMb = isMobile ? "mb-6 sm:mb-8" : isTablet ? "mb-8 md:mb-10" : "mb-10";
  const ctaButtonPadding = isMobile ? "px-6 py-2.5 sm:px-8 sm:py-3" : isTablet ? "px-8 py-3 md:py-3.5" : "px-8 py-4";
  const ctaButtonSize = isMobile ? "text-sm sm:text-base" : "text-base";
  const ctaArrowSize = isMobile ? 16 : isTablet ? 17 : 18;

  // Link columns
  const columnGridCols = isMobile ? "grid-cols-1 sm:grid-cols-2" : isTablet ? "grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]" : "md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]";
  const columnGap = isMobile ? "gap-6 sm:gap-8" : isTablet ? "gap-8 md:gap-10" : "gap-10";
  const columnPb = isMobile ? "pb-8 sm:pb-12" : isTablet ? "pb-12 md:pb-16" : "pb-16";

  const logoSize = isMobile ? "text-2xl sm:text-3xl" : isTablet ? "text-3xl" : "text-3xl";
  const logoMb = isMobile ? "mb-2 sm:mb-3" : isTablet ? "mb-3" : "mb-3";
  const logoDescSize = isMobile ? "text-xs sm:text-sm" : isTablet ? "text-sm" : "text-sm";
  const logoMaxW = isMobile ? "max-w-[180px]" : "max-w-[220px]";

  const colHeadingSize = isMobile ? "text-[10px] sm:text-xs" : "text-xs";
  const colHeadingMb = isMobile ? "mb-3 sm:mb-4" : isTablet ? "mb-4 md:mb-5" : "mb-5";
  const colLinkSize = isMobile ? "text-xs sm:text-sm" : "text-sm";
  const colSpacing = isMobile ? "space-y-2 sm:space-y-3" : isTablet ? "space-y-3" : "space-y-3";

  // Bottom bar
  const bottomBarPy = isMobile ? "py-6 sm:py-7" : isTablet ? "py-7 md:py-8" : "py-8";
  const bottomBarGap = isMobile ? "gap-4 sm:gap-6" : isTablet ? "gap-6" : "gap-6";
  const statusIndicatorSize = isMobile ? "w-1.5 h-1.5" : "w-2 h-2";
  const statusTextSize = isMobile ? "text-[9px] sm:text-xs" : "text-xs";
  const copyrightSize = isMobile ? "text-[9px] sm:text-xs" : "text-xs";
  const legalLinkSize = isMobile ? "text-[9px] sm:text-xs" : "text-xs";
  const bottomGap = isMobile ? "gap-3 sm:gap-4" : isTablet ? "gap-4 md:gap-5" : "gap-5";
  const socialIconSize = isMobile ? "w-8 h-8 sm:w-9 sm:h-9" : isTablet ? "w-9 h-9" : "w-9 h-9";

  const backgroundGlowTop = isMobile ? "w-[350px] h-[250px] blur-[80px]" : isTablet ? "w-[500px] h-[350px] blur-[110px]" : "w-[700px] h-[500px] blur-[160px]";
  const backgroundGlowBottom = isMobile ? "w-[250px] h-[250px] blur-[80px]" : isTablet ? "w-[300px] h-[300px] blur-[100px]" : "w-[400px] h-[400px] blur-[140px]";

  return (
    <footer className="relative bg-[#0A0A0A] overflow-hidden">
      {/* Ambient background layers */}
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

      {/* Animated crimson orb - responsive */}
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute top-0 left-1/2 -translate-x-1/2 ${backgroundGlowTop} rounded-full bg-[#E63946] opacity-[0.14] pointer-events-none`}
      />
      <div className={`absolute bottom-0 right-0 ${backgroundGlowBottom} rounded-full bg-[#FF3B4E] opacity-[0.08] pointer-events-none`} />

      <div className={`relative container mx-auto ${containerPx}`}>
        {/* CTA PANEL */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className={`relative ${ctaPanelRounded} border border-[#4A1A1F] bg-[#141414]/40 backdrop-blur-md ${ctaPanelPx} ${ctaPanelPy} ${ctaPanelMt} ${ctaPanelMb} text-center overflow-hidden`}
        >
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${ctaPanelGlowSize} rounded-full bg-[#E63946] opacity-[0.15] pointer-events-none`} />

          <h2 className={`relative ${ctaHeadingSize} font-bold leading-[1.05] tracking-tight text-white ${ctaHeadingMb}`}>
            LET&apos;S BUILD
            <br />
            <span className="text-[#E63946]">WHAT&apos;S NEXT.</span>
          </h2>

          <p className={`relative ${ctaDescSize} text-[#9A9A9A] mb-1 sm:mb-2`}>
            Have a project in mind?
          </p>
          <p className={`relative ${ctaDescSize} text-[#9A9A9A] ${ctaDescMb} max-w-xl mx-auto px-2 sm:px-0`}>
            Let&apos;s turn your idea into a digital product built for growth.
          </p>

          <motion.a
            href="#contact"
            whileHover={isDesktop ? { scale: 1.05 } : { scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`group relative inline-flex items-center gap-2 ${ctaButtonPadding} rounded-full bg-[#E63946] text-white font-semibold ${ctaButtonSize} overflow-hidden transition-shadow duration-300 hover:shadow-2xl hover:shadow-[#E63946]/30 active:scale-95 sm:active:scale-100`}
          >
            <span className="relative z-10 flex items-center gap-2">
              Start a Project
              <ArrowUpRight
                size={ctaArrowSize}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#E63946] to-[#FF3B4E] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.a>
        </motion.div>

        {/* LINK COLUMNS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className={`grid ${columnGridCols} ${columnGap} ${columnPb} border-b border-[#4A1A1F]/40`}
        >
          {/* Logo Section */}
          <div className={isMobile ? "sm:col-span-2 md:col-span-1" : ""}>
            <h3 className={`${logoSize} font-bold text-white tracking-tight ${logoMb}`}>
              ALENEX
            </h3>
            <p className={`${logoDescSize} text-[#9A9A9A] leading-relaxed ${logoMaxW}`}>
              Digital solutions for businesses ready to grow.
            </p>
          </div>

          {/* Footer Columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h4 className={`${colHeadingSize} font-semibold text-[#E63946] tracking-[0.15em] ${colHeadingMb}`}>
                {col.heading}
              </h4>
              <ul className={colSpacing}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink href={link.href} small={isMobile}>
                      {link.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* BOTTOM BAR */}
        <div className={`flex flex-col items-center justify-center ${bottomBarGap} ${bottomBarPy} gap-4 sm:gap-6`}>
          {/* Status Indicator */}
          <div className="flex items-center gap-2">
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`${statusIndicatorSize} rounded-full bg-[#E63946]`}
            />
            <span className={`${statusTextSize} font-medium text-[#9A9A9A] tracking-[0.15em] uppercase`}>
              AVAILABLE FOR NEW PROJECTS
            </span>
          </div>

          {/* Centered Copyright */}
          <div className="flex flex-col items-center gap-3">
            <span className={`${copyrightSize} text-[#9A9A9A] text-center`}>
              © {new Date().getFullYear()} ALENEX Solutions. All Rights Reserved
            </span>

            {/* Legal Links - Hidden on mobile, shown on sm+ */}
            <div className="hidden sm:flex items-center gap-3 md:gap-4">
              {LEGAL_LINKS.map((link) => (
                <FooterLink key={link.label} href={link.href} small>
                  {link.label}
                </FooterLink>
              ))}
            </div>
          </div>

          {/* Social Icons */}
          <div className={`flex items-center gap-2 md:gap-2`}>
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className={`group ${socialIconSize} rounded-full border border-[#4A1A1F] flex items-center justify-center text-[#9A9A9A] transition-all duration-300 hover:text-white hover:border-[#E63946] hover:shadow-[0_0_16px_rgba(230,57,70,0.4)]`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Legal Links - Mobile Only - Shown below on mobile */}
        {isMobile && (
          <div className="flex flex-wrap items-center justify-center gap-2 py-4 border-t border-[#4A1A1F]/40">
            {LEGAL_LINKS.map((link, i) => (
              <div key={link.label} className="flex items-center gap-2">
                <FooterLink href={link.href} small>
                  {link.label}
                </FooterLink>
                {i < LEGAL_LINKS.length - 1 && <span className="text-[#4A1A1F]">•</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
  small,
}: {
  href: string;
  children: React.ReactNode;
  small?: boolean;
}) {
  return (
    <a
      href={href}
      className={`group relative inline-block text-[#9A9A9A] hover:text-white transition-colors duration-300 ${
        small ? "text-xs" : "text-sm"
      }`}
    >
      {children}
      <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-[#E63946] transition-all duration-300 group-hover:w-full" />
    </a>
  );
}