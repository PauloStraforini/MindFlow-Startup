"use client"

import Link from "next/link"
import { Sparkles, ArrowRight, Heart, Calendar, Brain, Users, Clock, HeartCrack, HeartIcon, Hand, BrainIcon } from "lucide-react"

const Hero = () => {
  return (
    <section
      id="inicio"
      className="min-h-screen pt-24 pb-20 relative overflow-hidden"
      style={{
        backgroundImage: "url('/background.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-800 to-purple-800"></div>

      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center min-h-[80vh] relative z-10">
        {/* Left Content */}
        <div className="lg:w-1/2 mb-12 lg:mb-0 animate-fadeIn">
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 rounded-full text-white font-medium text-sm mb-8 border border-blue-400/30 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 mr-2" />
            Plataforma para Psicólogos
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
            Transforme sua prática clínica em um único lugar
          </h1>

          <div className="space-y-4 mb-8">
            <div className="flex items-center text-gray-300">
              <Hand className="h-5 w-5 mr-3 text-blue-400" />
              <span>Facilitando a conexão entre psicólogo e paciente</span>
            </div>
            <div className="flex items-center text-gray-300">
              <Heart className="h-5 w-5 mr-3 text-pink-400" />
              <span>Acompanhe e otimize seu negócio online</span>
            </div>
          </div>

          <Link href="/psicologos/login">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1 flex items-center group">
              Seu impacto começa agora
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </Link>
          <div className="mt-12 flex items-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-sm text-gray-400">Psicólogos ativos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">98%</div>
              <div className="text-sm text-gray-400">Satisfação</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-sm text-gray-400">Suporte</div>
            </div>
          </div>
        </div>

        {/* Right Side - Floating Elements */}
        <div className="lg:w-1/2 relative flex justify-center items-center">
          {/* Floating Icons */}
          <div className="relative size-96">
            {/* Central Brain Icon */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-20 bg-blue-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-blue-400/30 animate-pulse">
              <Brain className="h-10 w-10 text-blue-600" />
            </div>

            {/* Floating Calendar */}
            <div
              className="absolute top-8 right-8 size-16 bg-pink-600/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-pink-400/30 animate-float"
              style={{ animationDelay: "0.5s" }}
            >
              <Calendar className="h-8 w-8 text-pink-400" />
            </div>

            {/* Floating Users */}
            <div
              className="absolute bottom-12 size-16 bg-purple-600/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-purple-400/30 animate-float"
              style={{ animationDelay: "1s" }}
            >
              <Users className="h-8 w-8 text-purple-400" />
            </div>

            {/* Floating Heart */}
            <div
              className="absolute top-32 left-2 size-16 bg-red-600/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-red-400/30 animate-float"
              style={{ animationDelay: "1.5s" }}
            >
              <Heart className="h-7 w-7 text-red-400" />
            </div>

            {/* Floating Clock */}
            <div
              className="absolute bottom-8 right-1 size-16 bg-green-600/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-green-400/30 animate-float"
              style={{ animationDelay: "2s" }}
            >
              <Clock className="h-7 w-7 text-green-400" />
            </div>

            {/* Floating Mind */}
            <div
              className="absolute bottom-20 right-56 top-5 size-16 bg-yellow-400/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-yellow-300/30 animate-float"
              style={{ animationDelay: "2s" }}
            >
              <BrainIcon className="h-7 w-7 text-yellow-400" />
            </div>


            {/* Additional decorative elements */}
            <div
              className="absolute top-1/3 left-8 w-3 h-3 bg-blue-400 rounded-full animate-ping"
              style={{ animationDelay: "0.8s" }}
            ></div>
            <div
              className="absolute bottom-1/3 right-4 w-2 h-2 bg-pink-400 rounded-full animate-ping"
              style={{ animationDelay: "1.2s" }}
            ></div>
            <div
              className="absolute top-2/3 right-1/3 w-4 h-4 bg-purple-400 rounded-full animate-ping"
              style={{ animationDelay: "1.8s" }}
            ></div>
          </div>
        </div>
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

export default Hero
