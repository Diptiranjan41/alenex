import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Solutions from "@/components/home/Solutions";
import Services from "@/components/home/Services";
import Process from "@/components/home/Process";

import WhyAlenex from "@/components/home/WhyAlenex";
import Testimonials from "@/components/home/Testimonials";
import Contact from "@/components/home/Contact"; // ✅ Ensure Contact.tsx exists here

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="pt-16">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Solutions Section */}
        <section id="solutions">
          <Solutions />
        </section>

        {/* 3. Services Section */}
        <section id="services">
          <Services />
        </section>

        {/* 4. Process Section */}
        <section id="process">
          <Process />
        </section>

     
        {/* 6. Why Alenex Section */}
        <section id="why-alenex">
          <WhyAlenex />
        </section>

        {/* 7. Testimonials Section */}
        <section id="testimonials">
          <Testimonials />
        </section>

        {/* 8. Contact / Form Section */}
        <section id="contact">
          <Contact />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}