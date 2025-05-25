"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Shield,
  Lock,
  Linkedin,
  Instagram,
  Facebook,
  Twitter,
  Brain,
  ChevronRight,
} from "lucide-react";

import Hero from "@/components/hero";
import Features from "@/components/features";
import Header from "@/components/header";
import Works from "@/components/works";
import Benefits from "@/components/benefits";
import Testimonials from "@/components/testimonials";
import Psychologists from "@/components/psychologists";
import PricingSection from "@/components/pricing";
import CallToActionSection from "@/components/call";
// import useMercadoPago from "@/hooks/useMercadoPago";

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
        <Header/>

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
        <PricingSection />

        {/* Call to Action */}
        <CallToActionSection />
       
      </main>

      {/* Footer */}
      <footer
        id="contato"
        className="bg-gradient-to-r from-pink-400 via-pink-300 to-purple-300 text-white pt-20 pb-10"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Brain className="h-8 w-8 text-pink-800" />
                <span className="text-2xl font-bold text-pink-800">
                  MindFlow
                </span>
              </div>
              <p className="text-pink-800/80 mb-6 leading-relaxed">
                Transformando a prática clínica dos psicólogos com tecnologia
                inovadora.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: Instagram, href: "#" },
                  { icon: Linkedin, href: "#" },
                  { icon: Facebook, href: "#" },
                  { icon: Twitter, href: "#" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="bg-white/20 hover:bg-white/30 w-10 h-10 rounded-full flex items-center justify-center transition-colors border border-pink-200 hover:border-pink-300 group"
                  >
                    <social.icon className="w-5 h-5 text-pink-800 group-hover:text-pink-900 transition-colors" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-pink-800">
                Links Rápidos
              </h4>
              <ul className="space-y-3">
                {[
                  "Sobre Nós",
                  "Blog",
                  "Carreiras",
                  "Política de Privacidade",
                  "Termos de Uso",
                ].map((item, index) => (
                  <li key={index}>
                    <Link
                      href="#"
                      className="text-pink-800/80 hover:text-pink-900 transition-colors flex items-center group"
                    >
                      <ChevronRight className="h-4 w-4 mr-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>{item}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-pink-800">
                Contato
              </h4>
              <ul className="space-y-3 text-pink-800/80">
                <li className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3 border border-pink-200">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <span>contato@MindFlow.com</span>
                </li>
                <li className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3 border border-pink-200">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 15.5C18.8 15.5 17.5 15.3 16.4 14.9C16.3 14.9 16.2 14.9 16.1 14.9C15.8 14.9 15.6 15 15.4 15.2L13.2 17.4C10.4 15.9 8 13.6 6.6 10.8L8.8 8.6C9.1 8.3 9.2 7.9 9 7.6C8.7 6.5 8.5 5.2 8.5 4C8.5 3.5 8 3 7.5 3H4C3.5 3 3 3.5 3 4C3 13.4 10.6 21 20 21C20.5 21 21 20.5 21 20V16.5C21 16 20.5 15.5 20 15.5ZM19 12H21C21 7 17 3 12 3V5C15.9 5 19 8.1 19 12ZM15 12H17C17 9.2 14.8 7 12 7V9C13.7 9 15 10.3 15 12Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <span>(11) 1234-5678</span>
                </li>
                <li className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3 border border-pink-200">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <span>São Paulo, SP - Brasil</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-pink-800">
                Segurança
              </h4>
              <div className="flex flex-col space-y-3">
                <span className="inline-flex items-center text-pink-800">
                  <Shield className="w-5 h-5 mr-2" />
                  Dados Protegidos
                </span>
                <span className="inline-flex items-center text-pink-800">
                  <Lock className="w-5 h-5 mr-2" />
                  Conexão SSL Segura
                </span>
              </div>
              <div className="mt-6 bg-white/20 p-4 rounded-lg border border-pink-200">
                <h5 className="font-medium mb-2 text-pink-800">Newsletter</h5>
                <p className="text-sm text-pink-800/80 mb-3">
                  Receba dicas e novidades para psicólogos
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Seu email"
                    className="bg-white/20 text-pink-900 px-3 py-2 rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-pink-800 border border-pink-200 placeholder-pink-800/50"
                  />
                  <button className="bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white font-medium px-3 py-2 rounded-r-md transition-colors">
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-pink-200 text-center">
            <p className="text-sm text-pink-800">
              &copy; {new Date().getFullYear()} PsyTech. Todos os direitos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
