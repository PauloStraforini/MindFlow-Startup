"use client"

import type React from "react"
import { Sparkles, Clock, Lock, Smile, Headphones, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"

interface BeneficioProps {
  icon: React.ElementType
  title: string
  description: string
  delay: string
}

const Beneficio: React.FC<BeneficioProps> = ({ icon: Icon, title, description, delay }) => (
  <div
    className="group bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500 animate-float"
    style={{ animationDelay: delay }}
  >
    <div className="flex items-start">
      <div className="bg-blue-500/20 backdrop-blur-sm rounded-full p-3 mr-6 mt-1 border border-blue-400/30 group-hover:bg-blue-400/30 transition-all duration-300 flex-shrink-0">
        <Icon className="w-6 h-6 text-blue-400" />
      </div>
      <div>
        <h3 className="font-semibold text-white group-hover:text-blue-200 transition-colors text-xl mb-3">{title}</h3>
        <p className="text-gray-300 group-hover:text-gray-200 transition-colors leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
)

interface StatProps {
  value: string
  label: string
  delay: string
}

const Stat: React.FC<StatProps> = ({ value, label, delay }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className="group bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500 text-center animate-float"
      style={{ animationDelay: delay }}
    >
      <div className="text-3xl md:text-4xl font-bold mb-2 text-white group-hover:text-blue-200 transition-colors">
        {value}
      </div>
      <div className="text-gray-300 group-hover:text-gray-200 transition-colors text-sm md:text-base">{label}</div>

      {/* Progress indicator */}
      <div className="mt-3 w-full bg-white/10 rounded-full h-1 overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-1000 ${isVisible ? "w-full" : "w-0"}`}
          style={{ transitionDelay: delay }}
        ></div>
      </div>
    </div>
  )
}

const Benefits: React.FC = () => {
  const beneficios: BeneficioProps[] = [
    {
      icon: Clock,
      title: "Economia de tempo",
      description:
        "Reduza em até 70% o tempo gasto com tarefas administrativas e foque no que realmente importa: seus pacientes.",
      delay: "0.2s",
    },
    {
      icon: Lock,
      title: "Segurança e privacidade",
      description:
        "Seus dados e os de seus pacientes estão protegidos com criptografia de ponta a ponta e conformidade com LGPD.",
      delay: "0.4s",
    },
    {
      icon: Smile,
      title: "Interface intuitiva",
      description:
        "Design pensado para psicólogos, com fluxos de trabalho naturais e fácil adaptação, sem curva de aprendizado.",
      delay: "0.6s",
    },
    {
      icon: Headphones,
      title: "Suporte especializado",
      description:
        "Equipe de suporte dedicada, com conhecimento em psicologia, disponível 7 dias por semana para ajudar você.",
      delay: "0.8s",
    },
  ]

  const stats: StatProps[] = [
    { value: "98%", label: "Satisfação dos usuários", delay: "1.0s" },
    { value: "70%", label: "Redução de tarefas", delay: "1.2s" },
    { value: "5x", label: "Mais produtividade", delay: "1.4s" },
    { value: "24/7", label: "Suporte disponível", delay: "1.6s" },
  ]

  return (
    <section
      id="beneficios"
      className="py-24 relative overflow-hidden bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900"
    >
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
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-16 animate-fadeIn">
          <div className="inline-flex items-center px-4 py-2 bg-blue-600/80 rounded-full text-white font-medium text-sm mb-8 backdrop-blur-sm border border-blue-500/30">
            <Sparkles className="h-4 w-4 mr-2" />
            Benefícios Exclusivos
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white leading-tight">
            Por que escolher nossa plataforma?
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Desenvolvida por psicólogos para psicólogos, nossa solução traz benefícios reais e mensuráveis para sua
            prática profissional.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-20">
          {beneficios.map((b, i) => (
            <Beneficio key={i} {...b} />
          ))}
        </div>

        {/* Stats Section */}
        <div className="relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-purple-600/80 rounded-full text-white font-medium text-sm mb-6 backdrop-blur-sm border border-purple-500/30">
              <TrendingUp className="h-4 w-4 mr-2" />
              Resultados Comprovados
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Números que falam por si só</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((s, i) => (
              <Stat key={i} {...s} />
            ))}
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
      <div
        className="absolute top-1/3 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-60"
        style={{ animationDelay: "3s" }}
      ></div>

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

export default Benefits
