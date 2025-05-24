"use client"

import type React from "react"
import { Sparkles, Check, ArrowRight } from "lucide-react"
import Link from "next/link"

interface ItemProps {
    title: string
    description: string
    delay?: string
}

const Item: React.FC<ItemProps> = ({ title, description, delay = "0s" }) => (
    <li className="flex items-start group animate-float" style={{ animationDelay: delay }}>
        <div className="bg-blue-500/20 backdrop-blur-sm rounded-full p-2 mr-4 mt-1 border border-blue-400/30 group-hover:bg-blue-400/30 transition-all duration-300">
            <Check className="w-4 h-4 text-blue-400" />
        </div>
        <div>
            <h4 className="font-semibold text-white group-hover:text-blue-200 transition-colors text-lg mb-2">{title}</h4>
            <p className="text-gray-300 group-hover:text-gray-200 transition-colors leading-relaxed">{description}</p>
        </div>
    </li>
)

const Works: React.FC = () => {
    const itens = [
        {
            title: "Gerenciamento de Pacientes",
            description:
                "Visualize e organize todos os seus pacientes com facilidade, com acesso rápido aos seus perfis e históricos.",
            delay: "0.2s",
        },
        {
            title: "Mood Flower",
            description:
                "Uma visualização única que permite acompanhar o progresso emocional dos seus pacientes ao longo do tempo.",
            delay: "0.4s",
        },
        {
            title: "Calendário Inteligente",
            description: "Organize suas sessões com um calendário visual que facilita o planejamento do seu dia a dia.",
            delay: "0.6s",
        },
        {
            title: "Acompanhamento de Progresso",
            description:
                "Métricas visuais que mostram a evolução do tratamento, facilitando ajustes na abordagem terapêutica.",
            delay: "0.8s",
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
                            Como Funciona
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white leading-tight">
                            Uma interface intuitiva para sua prática
                        </h2>

                        <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                            Conheça a plataforma que está transformando a forma como psicólogos gerenciam seus pacientes e sessões.
                        </p>

                        <Link href="/psicologos/login">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1 flex items-center group mb-12">
                                Experimente Grátis
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </button>
                        </Link>

                    </div>

                    {/* Right Content */}
                    <div className="relative">
                        <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500">
                            <h3 className="text-2xl font-bold mb-8 text-white">Tudo o que você precisa em um só lugar</h3>
                            <ul className="space-y-8">
                                {itens.map((item, idx) => (
                                    <Item key={idx} title={item.title} description={item.description} delay={item.delay} />
                                ))}
                            </ul>
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

export default Works
