"use client"

import type React from "react"
import { Sparkles, Check, ArrowRight, Star, Crown, GraduationCap, Briefcase } from "lucide-react"

// Mock do hook para demonstração
const useMercadoPago = () => ({
    createMercadoPagoCheckout: ({ testeId, userEmail }: { testeId: string; userEmail: string }) => {
        console.log("Checkout criado:", { testeId, userEmail })
    },
})

interface PlanProps {
    name: string
    price: string
    period?: string
    originalPrice?: string
    features: string[]
    delay?: string
    isPopular?: boolean
    isFree?: boolean
    icon: React.ReactNode
    planId: string
    description: string
}

const PlanCard: React.FC<PlanProps> = ({
    name,
    price,
    period,
    originalPrice,
    features,
    delay = "0s",
    isPopular = false,
    isFree = false,
    icon,
    planId,
    description,
}) => {
    const { createMercadoPagoCheckout } = useMercadoPago()

    return (
        <div
            className={`relative bg-white/5 backdrop-blur-sm rounded-3xl border transition-all duration-500 animate-float overflow-hidden group ${isPopular
                    ? "border-blue-400/50 bg-gradient-to-br from-blue-500/10 to-purple-500/10 scale-105 shadow-2xl shadow-blue-500/20"
                    : "border-white/10 hover:bg-white/10 hover:border-white/20"
                }`}
            style={{ animationDelay: delay }}
        >
            {isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                </div>
            )}

            {/* Header Section */}
            <div className="p-8 pb-6 text-center">
                <div className="flex justify-center mb-4">
                    <div
                        className={`p-4 rounded-2xl ${isPopular ? "bg-blue-500/20 border border-blue-400/30" : "bg-white/10 border border-white/20"} backdrop-blur-sm transition-all duration-300 group-hover:scale-110`}
                    >
                        {icon}
                    </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">{name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{description}</p>

                {/* Price Section */}
                <div className="mb-6">
                    {isFree ? (
                        <div className="text-5xl font-bold text-white mb-2">Grátis</div>
                    ) : (
                        <div className="space-y-1">
                            {originalPrice && <div className="text-gray-400 line-through text-lg">{originalPrice}</div>}
                            <div className="flex items-baseline justify-center gap-1">
                                <span className="text-2xl font-semibold text-white">R$</span>
                                <span className="text-5xl font-bold text-white">{price.replace("R$ ", "")}</span>
                                {period && <span className="text-lg text-gray-300 ml-1">{period}</span>}
                            </div>
                        </div>
                    )}
                </div>

                {/* CTA Button */}
                <button
                    className={`w-full font-semibold py-4 px-6 rounded-2xl transition-all duration-300 ease-in-out shadow-lg flex items-center justify-center gap-2 group/btn mb-6 ${isFree
                            ? "bg-gradient-to-r from-gray-600 to-gray-500 text-white hover:from-gray-700 hover:to-gray-600 hover:shadow-xl"
                            : isPopular
                                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105"
                                : "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 hover:shadow-xl hover:shadow-blue-500/20 hover:scale-105"
                        }`}
                    onClick={() => {
                        if (!isFree) {
                            createMercadoPagoCheckout({
                                testeId: planId,
                                userEmail: "usuario@exemplo.com",
                            })
                        }
                    }}
                >
                    <span className="text-base font-medium">{isFree ? "Começar Grátis" : "Assinar Agora"}</span>
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </button>
            </div>

            {/* Features Section */}
            <div className="px-8 pb-8">
                <div className="border-t border-white/10 pt-6">
                    <h4 className="text-white font-semibold mb-4 text-center">O que está incluído:</h4>
                    <ul className="space-y-3">
                        {features.map((feature, idx) => (
                            <li key={idx} className="flex items-start group/feature">
                                <div
                                    className={`rounded-full p-1.5 mr-3 mt-0.5 border transition-all duration-300 ${isPopular
                                            ? "bg-blue-500/30 border-blue-400/50 group-hover/feature:bg-blue-400/40"
                                            : "bg-blue-500/20 border-blue-400/30 group-hover/feature:bg-blue-400/30"
                                        } backdrop-blur-sm`}
                                >
                                    <Check className="w-3 h-3 text-blue-400" />
                                </div>
                                <span className="text-gray-300 group-hover/feature:text-gray-200 transition-colors text-sm leading-relaxed">
                                    {feature}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Decorative gradient overlay */}
            <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${isPopular
                        ? "bg-gradient-to-br from-blue-500/5 to-purple-500/5"
                        : "bg-gradient-to-br from-blue-500/3 to-purple-500/3"
                    }`}
            />
        </div>
    )
}

const AllPricingPlans: React.FC = () => {
    const plans = [
        {
            name: "Estudante",
            price: "Grátis",
            description: "Perfeito para estudantes que estão começando a explorar a plataforma.",
            features: [
                "Até 5 pacientes",
                "Agendamento básico",
                "Prontuários simples",
                "Suporte por email",
                "Acesso por 2 Anos",
            ],
            delay: "0.1s",
            isFree: true,
            icon: <GraduationCap className="w-8 h-8 text-emerald-400" />,
            planId: "student_plan",
        },
        {
            name: "Básico",
            price: "R$ 50",
            period: "/mês",
            description: "Ideal para profissionais autônomos que precisam de funcionalidades essenciais.",
            features: [
                "Até 20 pacientes",
                "Agendamento de sessões",
                "Prontuários eletrônicos",
                "Relatórios mensais",
                "Suporte por email",
                "Backup automático",
            ],
            delay: "0.2s",
            icon: <Briefcase className="w-8 h-8 text-purple-400" />,
            planId: "basic_plan",
        },
        {
            name: "Profissional",
            price: "R$ 80",
            period: "/mês",
            description: "Para profissionais experientes que precisam de recursos avançados e integração.",
            features: [
                "Até 50 pacientes",
                "Tudo do plano Básico",
                "Integração com videoconferência",
                "Relatórios personalizados",
                "Recursos terapêuticos avançados",
                "Suporte prioritário",
                "API de integração",
            ],
            delay: "0.3s",
            isPopular: true,
            icon: <Star className="w-8 h-8 text-blue-300" />,
            planId: "professional_plan",
        },
        {
            name: "Premium",
            price: "R$ 150",
            period: "/mês",
            description: "Solução completa para clínicas e profissionais que precisam do máximo em tecnologia.",
            features: [
                "Pacientes ilimitados",
                "Tudo do plano Profissional",
                "IA para análise de sessões",
                "Relatórios com insights avançados",
                "Integração com laboratórios",
                "Suporte 24/7",
                "Consultoria personalizada",
                "White label disponível",
            ],
            delay: "0.4s",
            icon: <Crown className="Size-8 text-yellow-400" />,
            planId: "premium_plan",
        },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-r from-sky-800 to-purple-800">
            {/* Header Section */}
            <section className="py-24 relative overflow-hidden">
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: "url('/placeholder.svg?height=800&width=1200')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                ></div>

                <div className="absolute inset-0 bg-gradient-to-r from-sky-800/20 to-purple-800/20"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center max-w-4xl mx-auto animate-fadeIn">
                        <div className="inline-flex items-center px-6 py-3 bg-blue-600/80 rounded-full text-white font-medium text-sm mb-8 backdrop-blur-sm border border-blue-500/30">
                            <Sparkles className="h-5 w-5 mr-2" />
                            Todos os Planos
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold mb-8 text-white leading-tight">
                            Escolha o plano ideal para você
                        </h1>

                        <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                            Desde estudantes até grandes empresas, temos a solução perfeita para transformar sua prática profissional.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1 flex items-center justify-center group">
                                Teste Grátis por 14 dias
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </button>
                            <button className="border-2 border-white/20 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 hover:bg-white/10 hover:border-white/30">
                                Falar com Vendas
                            </button>
                        </div>
                    </div>
                </div>

                {/* Animated background elements */}
                <div className="absolute top-20 left-10 w-3 h-3 bg-blue-400 rounded-full animate-ping opacity-60"></div>
                <div
                    className="absolute bottom-20 right-20 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-60"
                    style={{ animationDelay: "1s" }}
                ></div>
                <div
                    className="absolute top-1/2 right-10 w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-60"
                    style={{ animationDelay: "2s" }}
                ></div>
            </section>

            {/* Plans Grid */}
            <section className="py-16 relative">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {plans.map((plan, idx) => (
                            <PlanCard
                                key={idx}
                                name={plan.name}
                                price={plan.price}
                                period={plan.period}
                                features={plan.features}
                                delay={plan.delay}
                                isPopular={plan.isPopular}
                                isFree={plan.isFree}
                                icon={plan.icon}
                                planId={plan.planId}
                                description={plan.description}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ or Additional Info Section */}
            <section className="py-16 relative">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ainda tem dúvidas?</h2>
                        <p className="text-xl text-gray-300 mb-8">
                            Nossa equipe está pronta para ajudar você a escolher o melhor plano para suas necessidades.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105">
                                Agendar Demonstração
                            </button>
                            <button className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                                Ver Perguntas Frequentes
                            </button>
                        </div>
                    </div>
                </div>
            </section>

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
        </div>
    )
}

export default AllPricingPlans
