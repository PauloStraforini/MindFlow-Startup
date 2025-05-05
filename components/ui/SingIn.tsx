"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { GrLinkedin } from "react-icons/gr";
import { ArrowRight, Loader2, ShieldCheck } from 'lucide-react';
import { motion } from "framer-motion";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [activeProvider, setActiveProvider] = useState<"google" | "linkedin" | null>(null);

  const onLogin = async (provider: "google" | "linkedin") => {
    setLoading(true);
    setActiveProvider(provider);
    try {
      await signIn(provider, { callbackUrl: "/psicologos/dashboard" });
    } catch (err) {
      console.error("Erro na autenticação:", err);
    } finally {
      setLoading(false);
      setActiveProvider(null);
    }
  };

  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* Animated background with multiple layers */}
      <div className="fixed inset-0 bg-gradient-to-br from-pink-50 via-rose-100 to-purple-100">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-center min-h-screen w-full px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <div className="mb-8">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex justify-center"
            >
              {/* Logo placeholder - you can replace with your actual logo */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-pink-500/30">
                <span className="text-white text-2xl font-bold">M</span>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className=" "
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-center space-y-3 mb-8"
            >
              <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Bem-vindo ao MindFlow
              </h1>
              <p className="text-sm text-gray-600 leading-relaxed">
                Conecte-se com segurança ao{" "}
                <span className="font-semibold text-pink-500">MindFlow</span>{" "}
                e comece sua jornada
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="space-y-6"
            >
              <button
                type="button"
                disabled={loading}
                onClick={() => onLogin("google")}
                className="group relative w-full flex items-center justify-center gap-3 bg-gradient-to-r from-red-500 via-blue-500 to-green-500 text-white font-medium py-3 px-6 rounded-2xl shadow-lg shadow-pink-500/20 hover:shadow-xl hover:shadow-pink-500/30 transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-60 overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r  from-red-600 via-blue-600 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative bg-white p-1.5 rounded-lg transform group-hover:scale-110 transition-transform duration-300">
                  <FcGoogle size={22} />
                </span>
                <span className="relative">
                  {activeProvider === "google" && loading ? (
                    <span className="flex items-center">
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Conectando...
                    </span>
                  ) : (
                    "Entrar com Google"
                  )}
                </span>
                <ArrowRight className="relative w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="space-y-6 mt-6"
            >
              <button
                type="button"
                disabled={loading}
                onClick={() => onLogin("linkedin")}
                className="group relative w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white font-medium py-3 px-6 rounded-2xl shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60 overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative bg-white p-1.5 rounded-lg transform group-hover:scale-110 transition-transform duration-300">
                  <GrLinkedin size={22} className="text-blue-600" />
                </span>
                <span className="relative">
                  {activeProvider === "linkedin" && loading ? (
                    <span className="flex items-center">
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Conectando...
                    </span>
                  ) : (
                    "Entrar com LinkedIn"
                  )}
                </span>
                <ArrowRight className="relative w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="mt-8 space-y-4"
            >
              <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-gray-200"></div>
                <span className="text-xs font-medium text-gray-500 flex items-center">
                  <ShieldCheck className="w-3 h-3 mr-1 text-green-500" />
                  Proteção garantida
                </span>
                <div className="h-px flex-1 bg-gray-200"></div>
              </div>

              <p className="text-xs text-center text-gray-500 leading-relaxed">
                Seu acesso é protegido com autenticação segura.{" "}
                <span className="hover:text-pink-500 cursor-pointer transition-colors duration-300 underline decoration-dotted underline-offset-2">
                  Saiba mais
                </span>
              </p>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="mt-6 text-center"
          >
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} MindFlow • Todos os direitos reservados
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
