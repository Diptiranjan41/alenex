import NetworkSphere from "./NetworkSphere";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-[#0A0A0A] overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#FF3B4E] blur-[120px]"></div>
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-[#E63946] blur-[100px] opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#FF3B4E] blur-[80px] opacity-30"></div>
      </div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 59, 78, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255, 59, 78, 0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#4A1A1F] bg-[#141414]/50 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-[#E63946] animate-pulse"></span>
            <span className="text-xs font-medium text-[#9A9A9A] uppercase tracking-wider">
              Software & Technology Solutions
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6">
            Build. Automate.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#E63946] to-[#FF3B4E]">
              Scale with Alenex
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-[#9A9A9A] max-w-2xl mb-10 leading-relaxed">
            We build web, mobile, and AI-powered software that helps
            businesses move faster and scale further.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="group relative px-8 py-4 rounded-full bg-[#E63946] text-white font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#E63946]/30 overflow-hidden">
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#E63946] to-[#FF3B4E] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <button className="group px-8 py-4 rounded-full border border-[#4A1A1F] text-white font-semibold text-lg transition-all duration-300 hover:border-[#E63946] hover:bg-[#141414] hover:shadow-lg hover:shadow-[#E63946]/10">
              <span className="flex items-center gap-2">
                Learn More
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 flex flex-wrap gap-8 md:gap-12">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white">50+</div>
              <div className="text-sm text-[#9A9A9A] mt-1">Projects Delivered</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white">4.9</div>
              <div className="text-sm text-[#9A9A9A] mt-1">Client Rating</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white">99%</div>
              <div className="text-sm text-[#9A9A9A] mt-1">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Network Sphere — right side decorative element */}
      <div className="hidden lg:block absolute right-[-40px] top-1/2 -translate-y-1/2 z-0 w-[550px] h-[550px]">
        <NetworkSphere />
      </div>
    </section>
  );
}