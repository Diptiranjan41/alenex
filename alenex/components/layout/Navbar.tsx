"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type NavChild = { name: string; href: string; desc: string };
type NavItem = { name: string; href: string; children?: NavChild[] };

const navigation: NavItem[] = [
  { name: "Home", href: "/" },
  {
    name: "Solutions",
    href: "/#solutions",
    children: [
      { name: "Web Development", href: "/solutions/web-development", desc: "Marketing sites and web apps built for speed." },
      { name: "Mobile Applications", href: "/solutions/mobile", desc: "Native iOS and Android experiences." },
      { name: "AI & Automation", href: "/solutions/ai-automation", desc: "Workflows that run without you." },
      { name: "Custom Software", href: "/solutions/custom-software", desc: "Systems built around how you work." },
      { name: "Cloud Solutions", href: "/solutions/cloud", desc: "Infrastructure that scales with you." },
    ],
  },
  {
    name: "Products",
    href: "/products",
    children: [
      { name: "Your Products", href: "/products/yours", desc: "Manage what you've already shipped." },
      { name: "Featured Product", href: "/products/featured", desc: "This quarter's flagship release." },
      { name: "All Products", href: "/products", desc: "Browse the full catalog." },
    ],
  },
  { name: "Services", href: "/#services" },
  { name: "About", href: "/about" },
  {
    name: "Resources",
    href: "/resources",
    children: [
      { name: "Blog", href: "/blog", desc: "Notes on what we're building." },
      { name: "Case Studies", href: "/case-studies", desc: "Real projects, real results." },
      { name: "Documentation", href: "/docs", desc: "Guides for using our tools." },
    ],
  },
];

function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="38" stroke="#E63946" strokeWidth="2.5" opacity="0.55" />
      <path d="M55 14 L82 78 L67 78 L48 32 Z" fill="#0F0F0F" />
      <path d="M45 14 L18 78 L33 78 L36 70 L54 70 L51 62 L39 62 L52 32 Z" fill="url(#logoRed)" />
      <path d="M40 58 L50 48 L60 58 L52 58 L50 62 L48 58 Z" fill="url(#logoRed)" />
      <defs>
        <linearGradient id="logoRed" x1="18" y1="14" x2="82" y2="78" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FF3B4E" />
          <stop offset="1" stopColor="#E63946" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileGroups, setOpenMobileGroups] = useState<Set<string>>(new Set());
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  const openNow = (name: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(name);
  };

  const closeSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  const toggleMobileGroup = (name: string) => {
    setOpenMobileGroups((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  const isActive = (href: string) => !href.includes("#") && (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-50 flex w-full justify-center px-2 sm:px-3 md:px-4 py-3 sm:py-4"
      >
        {/* ✨ INTENSE AMBIENT GLOW - MATCHES HERO SECTION INTENSITY - ONLY IN HEADER AREA */}
        <div className="absolute inset-0 top-0 pointer-events-none opacity-40">
          {/* Top center glow - primary atmospheric element */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] rounded-full bg-[#FF3B4E] blur-[150px] opacity-50"></div>
          
          {/* Right glow */}
          <div className="absolute top-[-100px] right-[-300px] w-[900px] h-[800px] rounded-full bg-[#E63946] blur-[120px] opacity-35"></div>
          
          {/* Left glow */}
          <div className="absolute top-[-50px] left-[-300px] w-[700px] h-[600px] rounded-full bg-[#FF3B4E] blur-[100px] opacity-30"></div>

          {/* Bottom center glow - Light coming from below */}
          <div className="absolute top-[80px] left-1/2 -translate-x-1/2 w-[1000px] h-[400px] rounded-full bg-[#FF3B4E] blur-[130px] opacity-45"></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none rounded-[16px] sm:rounded-[20px] md:rounded-[22px]">
          <div
            className="absolute inset-0 rounded-[16px] sm:rounded-[20px] md:rounded-[22px]"
            style={{
              backgroundImage: `linear-gradient(rgba(255, 59, 78, 0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255, 59, 78, 0.1) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>

        <motion.nav
          animate={{
            paddingTop: scrolled ? 6 : 8,
            paddingBottom: scrolled ? 6 : 8,
            backgroundColor: scrolled ? "rgba(10,10,10,0.85)" : "rgba(10,10,10,0.45)",
          }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative w-full max-w-[1260px] rounded-[16px] sm:rounded-[20px] md:rounded-[22px] border border-[#4A1A1F]/60 px-2 sm:px-3 md:px-4 backdrop-blur-xl"
          style={{
            boxShadow: "0 8px 40px -12px rgba(230, 57, 70, 0.25), inset 0 1px 0 rgba(255, 59, 78, 0.08), 0 0 60px -20px rgba(230, 57, 70, 0.20)",
          }}
          onMouseLeave={closeSoon}
        >
          <div className="flex h-10 sm:h-11 md:h-12 items-center justify-between gap-2 sm:gap-3 md:gap-4">
            {/* Logo - ALENEX with SOLUTIONS below - Fully responsive */}
            <Link href="/" className="group flex shrink-0 items-center gap-2 sm:gap-2.5 md:gap-3">
              {/* Logo Icon - Responsive sizing */}
              <div className="relative h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 shrink-0 drop-shadow-[0_0_12px_rgba(230,57,70,0.30)] transition-transform duration-300 group-hover:scale-105">
                <LogoMark className="h-full w-full" />
              </div>
              
              {/* Text Section - ALENEX above, SOLUTIONS below */}
              <div className="flex flex-col leading-tight">
                {/* ALENEX - White text, responsive sizing */}
                <span className="text-[11px] sm:text-[13px] md:text-[14px] lg:text-[15px] font-bold tracking-tight text-white">
                  ALENEX
                </span>
                {/* SOLUTIONS - Red text below, responsive sizing */}
                <span className="text-[6px] sm:text-[7px] md:text-[8px] lg:text-[9px] font-semibold tracking-[0.2em] text-[#E63946] -mt-0.5">
                  SOLUTIONS
                </span>
              </div>
            </Link>

            {/* Desktop nav - Hidden on smaller screens */}
            <div className="hidden xl:flex items-center">
              {navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <div key={item.name} className="relative" onMouseEnter={() => item.children && openNow(item.name)}>
                    <Link
                      href={item.href}
                      onClick={(e) => item.children && e.preventDefault()}
                      className="relative flex items-center gap-1 px-2.5 xl:px-3 2xl:px-3.5 py-1.5 xl:py-2 text-[12px] xl:text-[13px] 2xl:text-[13.5px] font-medium text-[#9A9A9A] transition-colors duration-200 hover:text-white whitespace-nowrap"
                    >
                      {active && (
                        <motion.span
                          layoutId="active-pill"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          className="absolute inset-0 rounded-full bg-[#E63946]/10 ring-1 ring-[#E63946]/30"
                        />
                      )}
                      <span className="relative z-10">{item.name}</span>
                      {item.children && (
                        <svg
                          className={`relative z-10 h-2.5 w-2.5 xl:h-3 xl:w-3 transition-transform duration-200 ${openDropdown === item.name ? "rotate-180" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </Link>

                    <AnimatePresence>
                      {item.children && openDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          className="absolute left-1/2 top-[calc(100%+14px)] w-[280px] xl:w-[300px] -translate-x-1/2 rounded-2xl border border-[#4A1A1F]/50 bg-[#0A0A0A]/92 p-2 backdrop-blur-xl"
                          style={{
                            boxShadow: "0 20px 60px -15px rgba(0, 0, 0, 0.7), 0 0 50px -15px rgba(230, 57, 70, 0.20)",
                          }}
                          onMouseEnter={() => openNow(item.name)}
                        >
                          {item.children.map((child) => (
                            <div
                              key={child.name}
                              className="group/item flex flex-col gap-0.5 rounded-xl px-3 xl:px-3.5 py-2 xl:py-2.5 cursor-default"
                            >
                              <span className="flex items-center justify-between text-[12px] xl:text-[13.5px] font-medium text-white">
                                {child.name}
                                <span className="text-[9px] xl:text-[10px] px-1.5 xl:px-2 py-0.5 rounded bg-[#4A1A1F]/50 text-[#9A9A9A] font-mono">
                                  Coming Soon
                                </span>
                              </span>
                              <span className="text-[11px] xl:text-[12px] leading-snug text-[#8A8A8A]">{child.desc}</span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Right section - desktop */}
            <div className="hidden lg:flex shrink-0 items-center gap-1 xl:gap-2">
              <Link
                href="/#contact"
                className="px-3 xl:px-4 py-1.5 xl:py-2 text-[12px] xl:text-[13.5px] font-medium text-[#9A9A9A] transition-colors duration-200 hover:text-white whitespace-nowrap"
              >
                Contact Us
              </Link>

              {/* ✨ CTA BUTTON - PERFECTLY MATCHES HERO */}
              <Link href="/#get-started" className="group relative">
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#E63946]/30 to-[#FF3B4E]/20 blur-lg group-hover:blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
                <span className="relative z-10 flex items-center gap-1.5 rounded-full border border-[#4A1A1F]/70 bg-[#141414]/80 px-3.5 xl:px-5 py-1.5 xl:py-2 text-[12px] xl:text-[13.5px] font-semibold text-white transition-all duration-300 hover:border-[#E63946]/80 hover:bg-[#E63946]/15 hover:shadow-[0_0_24px_-8px_rgba(230,57,70,0.35)] whitespace-nowrap">
                  Get Started
                  <svg className="h-3 w-3 xl:h-3.5 xl:w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
            </div>

            {/* Mobile toggle - Shows on tablet and below */}
            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              className="rounded-lg p-1.5 sm:p-2 text-white transition-colors duration-200 hover:bg-white/5 lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <div className="relative h-4 w-4 sm:h-5 sm:w-5">
                <motion.svg
                  animate={isMenuOpen ? { opacity: 0, rotate: 90 } : { opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute h-4 w-4 sm:h-5 sm:w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </motion.svg>
                <motion.svg
                  animate={isMenuOpen ? { opacity: 1, rotate: 0 } : { opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.25 }}
                  className="absolute h-4 w-4 sm:h-5 sm:w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </motion.svg>
              </div>
            </button>
          </div>
        </motion.nav>
      </motion.header>

      {/* Mobile slide-in menu - Optimized for all mobile devices */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed left-2 sm:left-3 md:left-4 right-2 sm:right-3 md:right-4 top-[72px] sm:top-[80px] md:top-[84px] z-50 max-h-[calc(100vh-88px)] sm:max-h-[calc(100vh-96px)] md:max-h-[calc(100vh-104px)] overflow-y-auto rounded-[16px] sm:rounded-[20px] md:rounded-[22px] border border-[#4A1A1F]/60 bg-[#0A0A0A]/92 p-2 sm:p-3 backdrop-blur-xl lg:hidden"
              style={{
                boxShadow: "0 20px 60px -15px rgba(0, 0, 0, 0.8), 0 0 60px -20px rgba(230, 57, 70, 0.18)",
              }}
            >
              <div className="space-y-0.5 sm:space-y-1">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.children ? (
                      <>
                        <button
                          onClick={() => toggleMobileGroup(item.name)}
                          className="flex w-full items-center justify-between rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-[14px] sm:text-[15px] font-medium text-[#D0D0D0] transition-colors duration-150 hover:bg-[#E63946]/8 hover:text-white"
                        >
                          {item.name}
                          <svg
                            className={`h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-200 ${openMobileGroups.has(item.name) ? "rotate-180" : ""}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        <AnimatePresence>
                          {openMobileGroups.has(item.name) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden pl-1 sm:pl-2"
                            >
                              {item.children.map((child) => (
                                <div
                                  key={child.name}
                                  className="flex items-center justify-between rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-[13px] sm:text-[14px] text-[#9A9A9A] cursor-default"
                                >
                                  <span>{child.name}</span>
                                  <span className="text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded bg-[#4A1A1F]/50 text-[#8A8A8A] font-mono">
                                    Soon
                                  </span>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-[14px] sm:text-[15px] font-medium text-[#D0D0D0] transition-colors duration-150 hover:bg-[#E63946]/8 hover:text-white"
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              <div className="my-2 sm:my-3 h-px bg-gradient-to-r from-transparent via-[#4A1A1F]/40 to-transparent" />

              <Link
                href="/#contact"
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-center text-[14px] sm:text-[15px] font-medium text-[#D0D0D0] hover:bg-[#E63946]/8 hover:text-white"
              >
                Contact Us
              </Link>

              <Link
                href="/#get-started"
                onClick={() => setIsMenuOpen(false)}
                className="relative mt-1.5 sm:mt-2 block rounded-full border border-[#4A1A1F]/70 bg-[#141414]/80 transition-all duration-300 hover:border-[#E63946]/80 hover:bg-[#E63946]/15 hover:shadow-[0_0_24px_-8px_rgba(230,57,70,0.35)]"
              >
                <span className="relative z-10 flex items-center justify-center gap-1.5 rounded-full px-3 sm:px-4 py-2.5 sm:py-3 text-[14px] sm:text-[15px] font-semibold text-white">
                  Get Started
                  <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}