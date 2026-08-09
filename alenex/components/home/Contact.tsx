"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Mail, User, MessageSquare, XCircle, Phone } from "lucide-react";

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [deviceType, setDeviceType] = useState("desktop");
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

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

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Extract a human-readable error message from a Spring Boot error response.
  // Spring's default validation error responses can come in a few different
  // shapes depending on version/config, so we check several common fields.
  const extractErrorMessage = (data: any, fallback: string): string => {
    if (!data) return fallback;

    // Explicit message field (custom error responses)
    if (typeof data.message === "string" && data.message.trim().length > 0) {
      return data.message;
    }

    // Spring Boot validation errors sometimes come as an "errors" array
    if (Array.isArray(data.errors) && data.errors.length > 0) {
      const first = data.errors[0];
      if (typeof first === "string") return first;
      if (first?.defaultMessage) return first.defaultMessage;
      if (first?.field && first?.defaultMessage) {
        return `${first.field}: ${first.defaultMessage}`;
      }
    }

    // Some setups return a single "error" string (e.g. "Bad Request")
    if (typeof data.error === "string" && data.error.trim().length > 0) {
      return data.error;
    }

    return fallback;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsError(false);
    setErrorMessage("");

    // Client-side validation to match backend rules (avoids an unnecessary
    // round-trip and gives the user a clear reason immediately).
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();

    if (fullName.length < 2) {
      setIsError(true);
      setErrorMessage("Please enter your full name (at least 2 characters).");
      setTimeout(() => setIsError(false), 6000);
      return;
    }

    if (formData.phone.trim().length > 20) {
      setIsError(true);
      setErrorMessage("Phone number is too long (max 20 characters).");
      setTimeout(() => setIsError(false), 6000);
      return;
    }

    if (formData.message.trim().length < 10) {
      setIsError(true);
      setErrorMessage("Your message must be at least 10 characters long.");
      setTimeout(() => setIsError(false), 6000);
      return;
    }

    if (formData.message.trim().length > 500) {
      setIsError(true);
      setErrorMessage("Your message must be under 500 characters.");
      setTimeout(() => setIsError(false), 6000);
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: fullName,
        email: formData.email,
        phone: formData.phone.trim(),
        message: formData.message,
        subject: `Contact from ${fullName}`,
      };

      const response = await fetch("http://localhost:8080/api/contacts/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.status === "SUCCESS") {
        setIsSubmitted(true);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });

        // Reset success message after 8 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 8000);
      } else {
        setIsError(true);
        setErrorMessage(
          extractErrorMessage(data, "Something went wrong. Please try again.")
        );

        setTimeout(() => {
          setIsError(false);
        }, 6000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsError(true);
      setErrorMessage("Network error. Please make sure backend is running on http://localhost:8080");

      setTimeout(() => {
        setIsError(false);
      }, 6000);
    } finally {
      setLoading(false);
    }
  };

  // Responsive sizing
  const sectionPy = isMobile ? "py-16 sm:py-20" : isTablet ? "py-20 md:py-24" : "py-24 md:py-32";
  const headerMb = isMobile ? "mb-8 sm:mb-10" : isTablet ? "mb-10 md:mb-12" : "mb-12";
  const taglineSize = isMobile ? "text-[11px] sm:text-xs" : "text-xs";
  const headingSize = isMobile ? "text-3xl sm:text-4xl" : isTablet ? "text-4xl md:text-5xl" : "text-4xl md:text-5xl";
  const descriptionSize = isMobile ? "text-sm sm:text-base" : isTablet ? "text-base md:text-lg" : "text-lg";

  const formContainerPx = isMobile ? "px-4 sm:px-6" : isTablet ? "px-6 md:px-8" : "p-8 md:p-10";
  const formGap = isMobile ? "gap-4 sm:gap-5" : isTablet ? "gap-5 md:gap-6" : "gap-6";

  const labelSize = isMobile ? "text-xs sm:text-sm" : "text-sm";
  const inputPadding = isMobile ? "px-4 py-3 sm:px-5 sm:py-3.5" : isTablet ? "px-5 py-3.5" : "px-5 py-4";
  const textareaRows = isMobile ? 4 : 5;

  const successIconSize = isMobile ? 64 : isTablet ? 72 : 80;
  const successHeadingSize = isMobile ? "text-2xl sm:text-3xl" : isTablet ? "text-3xl" : "text-3xl";
  const successDescSize = isMobile ? "text-base sm:text-lg" : isTablet ? "text-lg" : "text-lg";
  const successPy = isMobile ? "py-10 sm:py-12" : isTablet ? "py-12" : "py-14";

  const buttonPadding = isMobile ? "px-6 py-3.5 sm:px-8 sm:py-4" : isTablet ? "px-8 py-4" : "px-8 py-4.5";
  const buttonSize = isMobile ? "text-sm sm:text-base" : isTablet ? "text-base" : "text-base";
  const arrowSize = isMobile ? 18 : isTablet ? 19 : 20;

  const glowSize = isMobile ? "w-[400px] h-[400px] blur-[100px]" : isTablet ? "w-[600px] h-[600px] blur-[140px]" : "w-[800px] h-[800px] blur-[180px]";

  return (
    <section
      className={`relative bg-[#0A0A0A] ${sectionPy} border-t border-[#4A1A1F]/40 overflow-hidden`}
      aria-labelledby="contact-title"
    >
      {/* Ambient glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${glowSize} rounded-full bg-[#E63946] opacity-[0.10] pointer-events-none`} />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(230,57,70,0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(230,57,70,0.3) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-3xl mx-auto"
        >
          {/* HEADER SECTION */}
          <div className={`text-center ${headerMb}`}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#4A1A1F] bg-[#141414]/50 backdrop-blur-sm mb-4 sm:mb-5">
              <Mail className="w-3.5 h-3.5 text-[#E63946]" />
              <span className={`${taglineSize} font-medium text-[#E63946] uppercase tracking-[0.2em]`}>
                Get in Touch
              </span>
            </div>
            <h2
              id="contact-title"
              className={`${headingSize} font-bold text-white leading-tight mb-3 sm:mb-4`}
            >
              Let's Work Together
            </h2>
            <p className={`${descriptionSize} text-[#9A9A9A] leading-relaxed max-w-xl mx-auto`}>
              Have a project in mind? Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </div>

          {/* FORM CONTAINER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className={`relative rounded-2xl sm:rounded-3xl border border-[#4A1A1F] bg-[#141414]/40 backdrop-blur-md ${formContainerPx} shadow-2xl shadow-[#E63946]/5`}
          >
            {/* SUCCESS / ERROR MESSAGE */}
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`flex flex-col items-center justify-center ${successPy} text-center space-y-4`}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.15, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <CheckCircle2
                      className="text-[#E63946]"
                      width={successIconSize}
                      height={successIconSize}
                      strokeWidth={1.5}
                    />
                  </motion.div>

                  <h3 className={`${successHeadingSize} font-bold text-white`}>
                    Message Sent! 🎉
                  </h3>
                  <p className={`${successDescSize} text-[#D0D0D0] max-w-md`}>
                    Thank you for reaching out.{' '}
                    <span className="text-white font-semibold">
                      Our team will get in touch with you shortly.
                    </span>
                  </p>

                  <motion.div
                    animate={{ scaleX: [0.8, 1, 0.8], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#E63946] to-transparent rounded-full"
                  />
                </motion.div>
              ) : isError ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`flex flex-col items-center justify-center ${successPy} text-center space-y-4`}
                >
                  <XCircle
                    className="text-red-500"
                    width={successIconSize}
                    height={successIconSize}
                    strokeWidth={1.5}
                  />
                  <h3 className={`${successHeadingSize} font-bold text-white`}>
                    Something Went Wrong! 😕
                  </h3>
                  <p className={`${successDescSize} text-[#D0D0D0] max-w-md`}>
                    {errorMessage}
                  </p>
                  <button
                    onClick={() => setIsError(false)}
                    className="px-6 py-2 rounded-full bg-[#E63946] text-white font-medium hover:bg-[#E63946]/80 transition-colors"
                  >
                    Try Again
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className={`grid grid-cols-1 md:grid-cols-2 ${formGap}`}
                >
                  {/* First Name */}
                  <div className="space-y-2">
                    <label
                      htmlFor="firstName"
                      className={`${labelSize} font-medium text-[#D0D0D0] tracking-wide flex items-center gap-2`}
                    >
                      <User className="w-3.5 h-3.5 text-[#E63946]/60" />
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className={`w-full ${inputPadding} rounded-xl bg-[#0A0A0A]/80 border border-[#4A1A1F] text-white placeholder-[#6A6A6A] focus:outline-none focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/20 transition-all duration-300 text-sm sm:text-base`}
                      placeholder="John"
                      disabled={loading}
                    />
                  </div>

                  {/* Last Name */}
                  <div className="space-y-2">
                    <label
                      htmlFor="lastName"
                      className={`${labelSize} font-medium text-[#D0D0D0] tracking-wide flex items-center gap-2`}
                    >
                      <User className="w-3.5 h-3.5 text-[#E63946]/60" />
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className={`w-full ${inputPadding} rounded-xl bg-[#0A0A0A]/80 border border-[#4A1A1F] text-white placeholder-[#6A6A6A] focus:outline-none focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/20 transition-all duration-300 text-sm sm:text-base`}
                      placeholder="Doe"
                      disabled={loading}
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className={`${labelSize} font-medium text-[#D0D0D0] tracking-wide flex items-center gap-2`}
                    >
                      <Mail className="w-3.5 h-3.5 text-[#E63946]/60" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full ${inputPadding} rounded-xl bg-[#0A0A0A]/80 border border-[#4A1A1F] text-white placeholder-[#6A6A6A] focus:outline-none focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/20 transition-all duration-300 text-sm sm:text-base`}
                      placeholder="john@example.com"
                      disabled={loading}
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className={`${labelSize} font-medium text-[#D0D0D0] tracking-wide flex items-center gap-2`}
                    >
                      <Phone className="w-3.5 h-3.5 text-[#E63946]/60" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      maxLength={20}
                      className={`w-full ${inputPadding} rounded-xl bg-[#0A0A0A]/80 border border-[#4A1A1F] text-white placeholder-[#6A6A6A] focus:outline-none focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/20 transition-all duration-300 text-sm sm:text-base`}
                      placeholder="+91 98765 43210"
                      disabled={loading}
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2 md:col-span-2">
                    <label
                      htmlFor="message"
                      className={`${labelSize} font-medium text-[#D0D0D0] tracking-wide flex items-center gap-2`}
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#E63946]/60" />
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={textareaRows}
                      required
                      minLength={10}
                      maxLength={500}
                      className={`w-full ${inputPadding} rounded-xl bg-[#0A0A0A]/80 border border-[#4A1A1F] text-white placeholder-[#6A6A6A] focus:outline-none focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/20 transition-all duration-300 resize-none text-sm sm:text-base`}
                      placeholder="Tell us about your project, goals, and how we can help... (min. 10 characters)"
                      disabled={loading}
                    />
                    <p className="text-xs text-[#6A6A6A]">
                      {formData.message.trim().length}/500 characters (minimum 10)
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div className="md:col-span-2 pt-1">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`group relative w-full inline-flex items-center justify-center gap-2 ${buttonPadding} rounded-full bg-[#E63946] text-white font-semibold ${buttonSize} overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#E63946]/30 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed`}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {loading ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <ArrowRight
                              size={arrowSize}
                              className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#E63946] to-[#FF3B4E] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                  </div>

                  {/* Status message */}
                  {loading && (
                    <div className="md:col-span-2 text-center text-[#9A9A9A] text-sm animate-pulse">
                      Submitting your message...
                    </div>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}