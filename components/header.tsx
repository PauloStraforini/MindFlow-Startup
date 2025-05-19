// components/Header.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "@/components/images/Logo1.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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

  return (
    <header
      className={`${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-lg border-b border-pink-100"
          : "bg-transparent"
      } text-gray-800 sticky top-0 z-50 transition-all duration-300`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold flex items-center gap-2 transition-transform hover:scale-105"
        >
          <Image src={Logo} alt="MindFlow Logo" width={80} height={80} />
          <span className="bg-gradient-to-r from-rose-500 to-purple-800 bg-clip-text text-transparent font-extrabold">
            MindFlow
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-8" role="navigation">
          {["inicio", "funcionalidades", "beneficios", "depoimentos", "precos", "contato"].map(
            (item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                aria-label={`Ir para seção ${item}`}
                className={`relative py-1 px-2 text-sm font-medium transition-colors duration-300 ${
                  activeSection === item ? "text-pink-600" : "text-gray-600"
                } hover:text-pink-600`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-pink-500 transition-all duration-300 rounded-full ${
                    activeSection === item ? "w-full" : "w-0"
                  }`}
                />
              </button>
            )
          )}
        </nav>

        {/* CTA */}
        <Link href="psicologos/cadastro">
          <button
            className="hidden md:block bg-gradient-to-r from-rose-500 to-purple-800 hover:from-pink-500 hover:to-purple-500 
            text-white font-bold py-2.5 px-6 rounded-full transition-all duration-300 
            hover:shadow-lg hover:shadow-pink-200 transform hover:-translate-y-1"
          >
            Experimente Grátis
          </button>
        </Link>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-pink-600 p-2 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav list */}
      <div
        className={`md:hidden absolute w-full bg-white border-b border-pink-100 shadow-lg transition-all duration-500 ease-in-out overflow-hidden transform ${
          isMenuOpen ? "max-h-screen opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"
        }`}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-4 py-4">
          {["inicio", "funcionalidades", "beneficios", "depoimentos", "preços", "contato"].map(
            (item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`text-left py-2 text-sm transition-colors duration-300 ${
                  activeSection === item ? "text-pink-600 font-medium" : "text-gray-600"
                } hover:text-pink-600`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            )
          )}
          <Link href="psicologos/cadastro">
            <button className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-3 px-6 rounded-full shadow-md transition-all duration-300">
              Experimente Grátis
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
