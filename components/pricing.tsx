"use client"

import type React from "react"
import { Sparkles, Check, ArrowRight } from "lucide-react"

interface PlanProps {
  name: string
  price: string
  period: string
  features: string[]
  delay?: string
}

const PlanCard: React.FC<PlanProps> = ({ name, price, period, features, delay = "0s" }) => (
  <div
    className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500 animate-float"
    style={{ animationDelay: delay }}
  >
    <div className="mb-6">
      <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-bold text-white">{price}</span>
        {period && <span className="text-lg text-gray-300">{period}</span>}
      </div>
    </div>

    <ul className="space-y-4 mb-8">
      {features.map((feature, idx) => (
        <li key={idx} className="flex items-start group">
          <div className="bg-blue-500/20 backdrop-blur-sm rounded-full p-1 mr-3 mt-1 border border-blue-400/30 group-hover:bg-blue-400/30 transition-all duration-300">
            <Check className="w-3 h-3 text-blue-400" />
          </div>
          <span className="text-gray-300 group-hover:text-gray-200 transition-colors">{feature}</span>
        </li>
      ))}
    </ul>

    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1 flex items-center justify-center group">
      Escolher Plano
      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
    </button>
  </div>
)

const PricingSection: React.FC = () => {
  const plans = [
    {
      name: "Básico",
      price: "R$ 199",
      period: "/mês",
      features: [
        "Agendamento de sessões",
        "Prontuários eletrônicos básicos",
        "Relatórios mensais",
        "Suporte por email",
        "Até 20 pacientes",
      ],
      delay: "0.2s",
    },
    {
      name: "Profissional",
      price: "R$ 299",
      period: "/mês",
      features: [
        "Tudo do plano Básico",
        "Integração com videoconferência",
        "Relatórios semanais personalizados",
        "Recursos terapêuticos avançados",
        "Suporte prioritário",
        "Até 50 pacientes",
      ],
      delay: "0.4s",
    },
  ]

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="animate-fadeIn">
            <div className="inline-flex items-center px-4 py-2 bg-blue-600/80 rounded-full text-white font-medium text-sm mb-8 backdrop-blur-sm border border-blue-500/30">
              <Sparkles className="h-4 w-4 mr-2" />
              Preços
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white leading-tight">
              Planos que cabem no seu bolso
            </h2>

            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Escolha o plano ideal para o seu perfil profissional e comece a transformar sua prática hoje mesmo.
            </p>

            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1 flex items-center group mb-12">
              Ver Todos os Planos
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Right Content - Plans */}
          <div className="relative">
            <div className="space-y-6">
              {plans.map((plan, idx) => (
                <PlanCard
                  key={idx}
                  name={plan.name}
                  price={plan.price}
                  period={plan.period}
                  features={plan.features}
                  delay={plan.delay}
                />
              ))}
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

export default PricingSection
