"use client";
import { useState, useEffect } from "react";


import Hero from "@/components/hero";
import Features from "@/components/features";
import Header from "@/components/header";
import Works from "@/components/works";
import Benefits from "@/components/benefits";
import Testimonials from "@/components/testimonials";
import Psychologists from "@/components/psychologists";
import Princing from "@/components/pricing"
import Footer from "@/components/footer";


export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for navbar transparency effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Update active section based on scroll position
      const sections = [
        "inicio",
        "funcionalidades",
        "beneficios",
        "depoimentos",
        "precos",
        "contato",
      ];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  // const { createMercadoPagoCheckout } = useMercadoPago();

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 text-gray-800 overflow-x-hidden">
      <main>

        {/* Header Section */}
        <Header />

        {/* Hero Section */}
        <Hero />

        {/* Features */}
        <Features />

        {/* How It Works */}
        <Works />

        {/* Benefits */}
        <Benefits />

        {/* Testimonials */}
        <Testimonials />

        {/* For Psychologists */}
        <Psychologists />

        {/* Pricing */}
        <Princing />
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
