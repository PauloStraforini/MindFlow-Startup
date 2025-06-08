"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"
import { GrLinkedin } from "react-icons/gr"
import { ArrowRight, Loader2, ShieldCheck, Sparkles, Brain } from "lucide-react"
import { motion } from "framer-motion"

export default function SignIn() {
  const [loading, setLoading] = useState(false)
  const [activeProvider, setActiveProvider] = useState<"google" | "linkedin" | null>(null)

  const onLogin = async (provider: "google" | "linkedin") => {
    setLoading(true)
    setActiveProvider(provider)
    try {
      await signIn(provider, { callbackUrl: "/psicologos/dashboard" })
    } catch (err) {
      console.error("Erro na autenticação:", err)
    } finally {
      setLoading(false)
      setActiveProvider(null)
    }
  }

  return (
    <div className="flex min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
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

      <div className="relative flex flex-col items-center justify-center min-h-screen w-full px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-2xl bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 flex items-center justify-center">
                <Brain className="w-8 h-8 text-blue-400" />
              </div>
              <span className="text-2xl font-bold text-white">MindFlow</span>
            </div>
          </motion.div>

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500"
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-center space-y-3 mb-8"
            >
              <div className="inline-flex items-center px-4 py-2 bg-blue-600/80 rounded-full text-white font-medium text-sm mb-4 backdrop-blur-sm border border-blue-500/30">
                <Sparkles className="h-4 w-4 mr-2" />
                Acesso Seguro
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">Bem-vindo ao MindFlow</h1>
              <p className="text-lg text-gray-300 leading-relaxed">
                Conecte-se com segurança e comece sua jornada de transformação na prática clínica
              </p>
            </motion.div>

            {/* Login Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="space-y-4"
            >
              <button
                type="button"
                disabled={loading}
                onClick={() => onLogin("google")}
                className="group relative w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white font-medium py-4 px-6 rounded-xl border border-white/20 backdrop-blur-sm transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-60 overflow-hidden"
              >
                <span className="relative bg-white p-2 rounded-lg transform group-hover:scale-110 transition-transform duration-300">
                  <FcGoogle size={20} />
                </span>
                <span className="relative flex-1 text-left">
                  {activeProvider === "google" && loading ? (
                    <span className="flex items-center">
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Conectando...
                    </span>
                  ) : (
                    "Entrar com Google"
                  )}
                </span>
                <ArrowRight className="relative w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-blue-400" />
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={() => onLogin("linkedin")}
                className="group relative w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 text-white font-medium py-4 px-6 rounded-xl border border-white/20 backdrop-blur-sm transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-60 overflow-hidden"
              >
                <span className="relative bg-white p-2 rounded-lg transform group-hover:scale-110 transition-transform duration-300">
                  <GrLinkedin size={20} className="text-blue-600" />
                </span>
                <span className="relative flex-1 text-left">
                  {activeProvider === "linkedin" && loading ? (
                    <span className="flex items-center">
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Conectando...
                    </span>
                  ) : (
                    "Entrar com LinkedIn"
                  )}
                </span>
                <ArrowRight className="relative w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-blue-400" />
              </button>
            </motion.div>

            {/* Security Notice */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="mt-8 space-y-4"
            >
              <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-white/20"></div>
                <span className="text-sm font-medium text-gray-300 flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-2 text-green-400" />
                  Proteção garantida
                </span>
                <div className="h-px flex-1 bg-white/20"></div>
              </div>

              <p className="text-sm text-center text-gray-400 leading-relaxed">
                Seu acesso é protegido com autenticação segura e criptografia de ponta a ponta.{" "}
                <span className="hover:text-blue-400 cursor-pointer transition-colors duration-300 underline decoration-dotted underline-offset-2">
                  Saiba mais
                </span>
              </p>
            </motion.div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mt-6 text-center"
          >
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} MindFlow • Todos os direitos reservados
            </p>
          </motion.div>

        </motion.div>
      </div>

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
    </div>
  )
}
