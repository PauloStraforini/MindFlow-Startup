"use client";

import { Sparkles, Star } from "lucide-react";
import Image from "next/image";
import User2 from "@/components/images/user_2.jpg";
import User3 from "@/components/images/user_3.jpg";
import User4 from "@/components/images/user_4.jpg";
import Link from "next/link";

export default function Testimonials() {
    const depoimentos = [
        {
            name: "Dra. Mariana Takahashi",
            role: "Psicóloga Clínica",
            image: User2,
            quote:
                "Esta plataforma revolucionou minha prática clínica. Reduzi em 60% o tempo gasto com tarefas administrativas e agora posso me dedicar mais aos meus pacientes.",
            stars: 5,
        },
        {
            name: "Dr. Carlos Mendes",
            role: "Psicoterapeuta",
            image: User3,
            quote:
                "A facilidade de uso e a integração com videoconferência tornaram minhas sessões online muito mais eficientes. Meus pacientes adoraram a experiência.",
            stars: 5,
        },
        {
            name: "Dra. Juliana Santos",
            role: "Psicóloga Infantil",
            image: User4,
            quote:
                "Os recursos terapêuticos disponíveis são excelentes e me ajudam a tornar as sessões com crianças mais dinâmicas e produtivas. Recomendo fortemente!",
            stars: 4,
        },
    ];

    return (
        <section className="py-24 relative overflow-hidden bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-sky-800 to-purple-800"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center px-4 py-2 bg-blue-600/80 rounded-full text-white font-medium text-sm mb-4 backdrop-blur-sm border border-blue-500/30">
                        <Sparkles className="h-4 w-4 mr-2" />
                        Depoimentos
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        O que os psicólogos estão dizendo?
                    </h2>
                    <p className="text-lg text-gray-300">
                        Profissionais já transformaram sua prática com nossa plataforma.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {depoimentos.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500 relative group animate-float"
                            style={{ animationDelay: `${0.2 * index}s` }}
                        >
                            <div className="absolute -top-4 -right-4 w-10 h-10 bg-blue-500/20 rounded-2xl backdrop-blur-sm border border-blue-400/30 flex items-center justify-center animate-float">
                                <Sparkles className="w-6 h-6 text-blue-400" />
                            </div>
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${i < item.stars
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-gray-500"
                                            }`}
                                    />
                                ))}
                            </div>
                            <p className="text-gray-300 italic mb-6 leading-relaxed">
                                &ldquo;{item.quote}&rdquo;
                            </p>
                            <div className="flex items-center">
                                <div className="rounded-full mr-4 border-2 border-white shadow-md overflow-hidden">
                                    <Image
                                        src={item.image || "/placeholder.svg"}
                                        alt={item.name}
                                        width={60}
                                        height={60}
                                        className="rounded-full"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">{item.name}</h3>
                                    <p className="text-sm text-gray-300">{item.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-12">
                    <Link
                        href="/blog"
                        className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-blue-500/30"
                    >
                        Veja O que os Psicólogos Estão Dizendo
                    </Link>
                </div>
            </div>

            {/* Floating decorative elements */}
            <div className="absolute top-20 left-10 w-3 h-3 bg-blue-400 rounded-full animate-ping opacity-60"></div>
            <div
                className="absolute bottom-20 right-20 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-60"
                style={{ animationDelay: "1s" }}
            ></div>
            <div
                className="absolute top-1/2 right-10 w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-60"
                style={{ animationDelay: "2s" }}
            ></div>

            <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
        </section>
    );
}
