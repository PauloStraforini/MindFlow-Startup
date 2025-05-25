"use client"
import {
  Brain,
  Instagram,
  Linkedin,
  Facebook,
  Twitter,
  ChevronRight,
  Shield,
  Lock,
  Sparkles,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

const Footer = () => {
  const socialLinks = [
    { icon: Instagram, href: "#" },
    { icon: Linkedin, href: "#" },
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
  ]

  const quickLinks = ["Sobre Nós", "Blog", "Carreiras", "Política de Privacidade", "Termos de Uso"]

  const contactItems = [
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z" />
        </svg>
      ),
      text: "contato@MindFlow.com",
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 15.5C18.8 15.5 17.5 15.3 16.4 14.9C16.3 14.9 16.2 14.9 16.1 14.9C15.8 14.9 15.6 15 15.4 15.2L13.2 17.4C10.4 15.9 8 13.6 6.6 10.8L8.8 8.6C9.1 8.3 9.2 7.9 9 7.6C8.7 6.5 8.5 5.2 8.5 4C8.5 3.5 8 3 7.5 3H4C3.5 3 3 3.5 3 4C3 13.4 10.6 21 20 21C20.5 21 21 20.5 21 20V16.5C21 16 20.5 15.5 20 15.5Z" />
        </svg>
      ),
      text: "(11) 1234-5678",
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" />
        </svg>
      ),
      text: "São Paulo, SP - Brasil",
    },
  ]

  return (
    <footer className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
      {/* Decorative SVG */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url('/image.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-800 to-purple-800"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="animate-fadeIn">
            <div className="inline-flex items-center px-4 py-2 bg-blue-600/80 rounded-full text-white font-medium text-sm mb-8 backdrop-blur-sm border border-blue-500/30">
              <Sparkles className="h-4 w-4 mr-2" />
              Conecte-se Conosco
            </div>

            <div className="flex items-center gap-3 mb-6">
              <Brain className="h-10 w-10 text-blue-400" />
              <span className="text-3xl font-bold text-white">MindFlow</span>
            </div>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-lg">
              Transformando a prática clínica dos psicólogos com tecnologia inovadora e soluções inteligentes.
            </p>

            <div className="flex space-x-4 mb-12">
              {socialLinks.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="bg-blue-500/20 hover:bg-blue-400/30 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 border border-blue-400/30 backdrop-blur-sm group hover:scale-110"
                >
                  <item.icon className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors" />
                </a>
              ))}
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1 flex items-center group">
              Entre em Contato
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Right Content */}
          <div className="relative">
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Quick Links */}
                <div>
                  <h4 className="text-xl font-bold mb-6 text-white">Links Rápidos</h4>
                  <ul className="space-y-4">
                    {quickLinks.map((link, index) => (
                      <li key={index} className="group animate-float" style={{ animationDelay: `${index * 0.1}s` }}>
                        <Link
                          href="#"
                          className="text-gray-300 hover:text-white transition-colors flex items-center group-hover:translate-x-1 duration-300"
                        >
                          <ChevronRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                          <span>{link}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact */}
                <div>
                  <h4 className="text-xl font-bold mb-6 text-white">Contato</h4>
                  <ul className="space-y-4">
                    {contactItems.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center group animate-float"
                        style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
                      >
                        <div className="w-10 h-10 rounded-2xl bg-blue-500/20 flex items-center justify-center mr-4 border border-blue-400/30 backdrop-blur-sm group-hover:bg-blue-400/30 transition-all duration-300">
                          {item.icon}
                        </div>
                        <span className="text-gray-300 group-hover:text-white transition-colors">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Security & Newsletter */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Security */}
                  <div>
                    <h5 className="font-semibold mb-4 text-white">Segurança</h5>
                    <div className="space-y-3">
                      <span className="inline-flex items-center text-gray-300">
                        <Shield className="w-4 h-4 mr-2 text-blue-400" />
                        Dados Protegidos
                      </span>
                      <span className="inline-flex items-center text-gray-300">
                        <Lock className="w-4 h-4 mr-2 text-blue-400" />
                        Conexão SSL Segura
                      </span>
                    </div>
                  </div>

                  {/* Newsletter */}
                  <div>
                    <h5 className="font-semibold mb-2 text-white">Newsletter</h5>
                    <p className="text-sm text-gray-300 mb-4">Receba dicas e novidades para psicólogos</p>
                    <div className="flex">
                      <input
                        type="email"
                        placeholder="Seu email"
                        className="bg-white/10 text-white px-3 py-2 rounded-l-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-white/20 placeholder-gray-400 backdrop-blur-sm"
                      />
                      <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-r-lg transition-colors">
                        Enviar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating decorative elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500/20 rounded-2xl backdrop-blur-sm border border-blue-400/30 flex items-center justify-center animate-float">
              <Sparkles className="w-8 h-8 text-blue-400" />
            </div>
            <div
              className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-500/20 rounded-xl backdrop-blur-sm border border-purple-400/30 animate-float"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-12 mt-12 border-t border-white/10 text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} PsyTech. Todos os direitos reservados.</p>
        </div>

        {/* Decorative floating elements */}
        <div className="absolute top-20 left-10 w-3 h-3 bg-blue-400 rounded-full animate-ping opacity-60"></div>
        <div
          className="absolute bottom-20 right-20 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-60"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 right-10 w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-60"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </footer>
  )
}

export default Footer
