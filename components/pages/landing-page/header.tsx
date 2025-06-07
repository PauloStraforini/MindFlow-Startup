"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Menu, X, ArrowRight, Sparkles, Brain } from "lucide-react"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("inicio")
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      const sections = ["inicio", "funcionalidades", "beneficios", "depoimentos", "precos", "contato"]
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      })
    }
  }

  const navigationItems = [
    { id: "inicio", label: "Início" },
    { id: "funcionalidades", label: "Funcionalidades" },
    { id: "beneficios", label: "Benefícios" },
    { id: "Testimonials", label: "Depoimentos" },
    { id: "PlanCard", label: "Preços" },
    { id: "contato", label: "Contato" },
  ]

  return (
    <header
      className={`${
        isScrolled ? "bg-white/95 backdrop-blur-xl shadow-xl border-b border-slate-200/50" : "bg-transparent"
      } sticky top-0 z-50 transition-all duration-500 ease-out`}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3 transition-all duration-300 hover:scale-105">
            <div className="relative">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 p-0.5 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center">
                  <Brain className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600 group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
            </div>
            <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-purple-700 bg-clip-text text-transparent">
              MindFlow
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" role="navigation">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                aria-label={`Ir para seção ${item.label}`}
                className={`group relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                  activeSection === item.id
                    ? "text-blue-700 bg-blue-50"
                    : "text-slate-600 hover:text-blue-700 hover:bg-slate-50"
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                <div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 transition-all duration-300 ${
                    activeSection === item.id ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                />
                <div
                  className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300 ${
                    activeSection === item.id ? "w-6" : "w-0 group-hover:w-4"
                  }`}
                />
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/psicologos/login">
              <button className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5">
                <span className="relative z-10 flex items-center gap-2">
                  Experimente Grátis
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative p-2 rounded-xl text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <div className="relative w-6 h-6">
              <Menu
                className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                  isMenuOpen ? "opacity-0 rotate-180" : "opacity-100 rotate-0"
                }`}
              />
              <X
                className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                  isMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-180"
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-1 border-t border-slate-200/50">
            {navigationItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 ${
                  activeSection === item.id
                    ? "text-blue-700 bg-blue-50"
                    : "text-slate-600 hover:text-blue-700 hover:bg-slate-50"
                }`}
                style={{
                  animationDelay: isMenuOpen ? `${index * 50}ms` : "0ms",
                }}
              >
                <div className="flex items-center justify-between">
                  <span>{item.label}</span>
                  {activeSection === item.id && (
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                  )}
                </div>
              </button>
            ))}

            {/* Mobile CTA */}
            <div className="pt-4 mt-4 border-t border-slate-200/50">
              <Link href="/psicologos/login">
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25">
                  <span className="flex items-center justify-center gap-2">
                    Experimente Grátis
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
