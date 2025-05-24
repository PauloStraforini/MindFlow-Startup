"use client"

import type React from "react"

import { Calendar, FileText, Book, Video, BookOpen, Brain, Sparkles, ChevronRight } from "lucide-react"

interface FuncionalidadeCardProps {
  icon: React.ElementType
  title: string
  description: string
  gradient: string
  delay?: string
}

const FuncionalidadeCard: React.FC<FuncionalidadeCardProps> = ({
  icon: IconComponent,
  title,
  description,
  gradient,
  delay = "0s",
}) => {
  return (
    <div
      className="group bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-500 hover:-translate-y-2 hover:border-blue-400/50 animate-float"
      style={{ animationDelay: delay }}
    >
      <div
        className={`bg-gradient-to-r ${gradient} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-white transition-all duration-300 transform group-hover:scale-110 shadow-lg backdrop-blur-sm border border-white/30`}
      >
        <IconComponent className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-200 transition-colors">{title}</h3>
      <p className="text-gray-300 group-hover:text-gray-200 transition-colors leading-relaxed">{description}</p>
      <div className="mt-6 flex items-center text-blue-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span>Saiba mais</span>
        <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  )
}

const Features: React.FC = () => {
  const funcionalidades = [
    {
      icon: Calendar,
      title: "Agendamento inteligente",
      description: "Organize suas sessões com facilidade, envie lembretes automáticos e reduza faltas.",
      gradient: "from-blue-400/80 to-purple-500/80",
      delay: "0.2s",
    },
    {
      icon: FileText,
      title: "Prontuários eletrônicos",
      description: "Gerencie prontuários de forma segura, com templates personalizáveis e acesso rápido.",
      gradient: "from-pink-400/80 to-blue-400/80",
      delay: "0.4s",
    },
    {
      icon: Book,
      title: "Relatórios automáticos",
      description: "Gere relatórios personalizados com um clique, economizando horas de trabalho manual.",
      gradient: "from-purple-500/80 to-pink-500/80",
      delay: "0.6s",
    },
    {
      icon: Video,
      title: "Videoconferência integrada",
      description: "Realize sessões online diretamente na plataforma, sem necessidade de outros aplicativos.",
      gradient: "from-green-400/80 to-blue-400/80",
      delay: "0.8s",
    },
    {
      icon: BookOpen,
      title: "Recursos terapêuticos",
      description: "Acesse uma biblioteca de materiais de apoio, exercícios e recursos especializados.",
      gradient: "from-red-400/80 to-pink-500/80",
      delay: "1.0s",
    },
    {
      icon: Brain,
      title: "Assistente com IA",
      description: "Utilize nossa IA para sugestões de abordagens terapêuticas e análise de padrões.",
      gradient: "from-yellow-400/80 to-orange-500/80",
      delay: "1.2s",
    },
  ]

  return (
    <section
      id="funcionalidades"
      className="py-24 relative overflow-hidden"
      style={{
        backgroundImage: "url('/background.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay for consistency with Hero */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-800 to-purple-800"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fadeIn">
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 rounded-full text-white font-medium text-sm mb-8 border border-blue-400/30 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 mr-2" />
            Funcionalidades
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ferramentas poderosas para sua prática clínica
          </h2>
          <p className="text-lg text-gray-300">
            Nossa plataforma foi desenvolvida especificamente para as necessidades dos psicólogos, com recursos que
            otimizam seu fluxo de trabalho.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {funcionalidades.map((feature, index) => (
            <FuncionalidadeCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              gradient={feature.gradient}
              delay={feature.delay}
            />
          ))}
        </div>

        {/* Decorative floating elements */}
        <div className="absolute top-20 left-10 w-3 h-3 bg-blue-400 rounded-full animate-ping opacity-60"></div>
        <div
          className="absolute bottom-20 right-20 w-2 h-2 bg-pink-400 rounded-full animate-ping opacity-60"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 right-10 w-4 h-4 bg-purple-400 rounded-full animate-ping opacity-60"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-20 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-60"
          style={{ animationDelay: "1.5s" }}
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

export default Features
