"use client"

import Image from "next/image"
import { Sparkles, Heart, Shield, Calendar } from "lucide-react"
import User1 from "@/public/assets/primeiro-post.png";


interface SectionPsicologosProps {
  Psico?: string
}

export default function SectionPsicologos({ Psico }: SectionPsicologosProps) {
  return (
    <section className="relative py-28 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 overflow-hidden">
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

      {/* Background Flutuante */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute top-12 left-12 w-72 h-72 rounded-full bg-blue-400/30 blur-[72px] animate-pulse"></div>
        <div
          className="absolute bottom-12 right-12 w-96 h-96 rounded-full bg-purple-400/30 blur-[96px] animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Texto */}
          <div className="animate-fadeIn">
            <div className="inline-flex items-center gap-2 bg-blue-600/80 px-4 py-2 rounded-full text-white font-semibold text-sm mb-8 backdrop-blur-sm border border-blue-500/30">
              <Sparkles className="h-5 w-5" />
              Para Psicólogos
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-8 max-w-xl">
              Transforme sua prática com tecnologia inteligente
            </h2>

            <p className="max-w-lg text-xl text-gray-300 mb-12 leading-relaxed">
              O MindFlow foi desenvolvido especialmente para profissionais de psicologia, com ferramentas que facilitam
              o acompanhamento emocional e o progresso terapêutico dos seus pacientes.
            </p>

            <div className="space-y-8 max-w-md">
              {[
                {
                  icon: <Heart className="h-7 w-7 text-blue-400" />,
                  title: "Acompanhamento Emocional",
                  description:
                    "Visualize e acompanhe as emoções dos seus pacientes com gráficos intuitivos e relatórios detalhados.",
                  delay: "0.2s",
                },
                {
                  icon: <Shield className="h-7 w-7 text-blue-400" />,
                  title: "Segurança e Privacidade",
                  description:
                    "Todos os dados são protegidos com criptografia de ponta a ponta, garantindo a confidencialidade das informações.",
                  delay: "0.4s",
                },
                {
                  icon: <Calendar className="h-7 w-7 text-blue-400" />,
                  title: "Organização Simplificada",
                  description:
                    "Gerencie sua agenda, prontuários e anotações em um único lugar, economizando tempo e aumentando sua produtividade.",
                  delay: "0.6s",
                },
              ].map(({ icon, title, description, delay }, i) => (
                <div key={i} className="flex gap-5 group animate-float" style={{ animationDelay: delay }}>
                  <div className="flex-shrink-0 bg-blue-500/20 backdrop-blur-sm rounded-3xl p-4 flex items-center justify-center border border-blue-400/30 group-hover:bg-blue-400/30 transition-all duration-300">
                    {icon}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-xl mb-2 group-hover:text-blue-200 transition-colors">
                      {title}
                    </h3>
                    <p className="text-gray-300 text-base leading-relaxed group-hover:text-gray-200 transition-colors">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Imagem */}
          <div className="relative group animate-fadeIn" style={{ animationDelay: "0.3s" }}>
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl transform rotate-6 transition-transform duration-500 group-hover:rotate-3"></div>
            <div className="relative rounded-3xl overflow-hidden bg-white/5 backdrop-blur-md p-12 border border-white/10 shadow-2xl transition-transform duration-500 hover:scale-[1.07] hover:rotate-1">
              <Image
                src={User1 || "/placeholder.svg"}
                alt="Psicóloga usando o MindFlow"
                width={500}
                height={100}
                className="rounded-2xl object-cover"
                priority
              />
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
    </section>
  )
}
