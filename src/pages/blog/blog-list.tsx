"use client"

import { Search } from "@/components/ui/search"
import type { Post } from "contentlayer/generated"
import { Inbox, Sparkles, BookOpen, TrendingUp, Zap } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { PostCard } from "./components/post-card"
import { PostGridCard } from "./components/post-grid-card"

export type BlogListProps = {
  posts: Post[]
}

export function BlogList({ posts }: BlogListProps) {
  const searchParams = useSearchParams()
  const query = searchParams?.get("q") ?? ""
  const pageTitle = query ? `Resultados de busca para "${query}"` : "Dicas e estratégias para impulsionar seu negócio"

  const postList = query
    ? posts.filter((post) => post.title.toLocaleLowerCase()?.includes(query.toLocaleLowerCase()))
    : posts
  const hasPosts = postList?.length > 0

  return (
    <div
      className="flex flex-col py-24 flex-grow h-full min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: "url('/background.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-800 to-purple-800"></div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 right-20 w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-60"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute top-40 left-10 w-3 h-3 bg-pink-400 rounded-full animate-ping opacity-40"
          style={{ animationDelay: "1.2s" }}
        ></div>
        <div
          className="absolute bottom-40 right-40 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-50"
          style={{ animationDelay: "1.8s" }}
        ></div>

        {/* Floating icons */}
        <div
          className="absolute top-32 left-1/4 size-12 bg-blue-500/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-blue-400/20 animate-float"
          style={{ animationDelay: "0.8s" }}
        >
          <BookOpen className="h-6 w-6 text-blue-400/60" />
        </div>
        <div
          className="absolute bottom-32 right-1/4 size-12 bg-purple-500/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-purple-400/20 animate-float"
          style={{ animationDelay: "1.5s" }}
        >
          <TrendingUp className="h-6 w-6 text-purple-400/60" />
        </div>
        <div
          className="absolute top-1/2 right-10 size-12 bg-pink-500/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-pink-400/20 animate-float"
          style={{ animationDelay: "2.2s" }}
        >
          <Zap className="h-6 w-6 text-pink-400/60" />
        </div>
      </div>

      {/* Back arrow to home */}
      <div className="relative z-20">
        <a
          href="/"
          className="absolute left-4 top-4 flex items-center gap-2 text-white/80 hover:text-white transition-colors text-base font-medium bg-black/30 rounded-full px-3 py-2 backdrop-blur-sm shadow-lg border border-white/10"
          aria-label="Voltar para a página inicial"
        >
          <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
          >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Voltar
        </a>
      </div>

      <div className="relative z-10">
        <header className="pb-14 animate-fadeIn">
          <div className="container mx-auto px-4 md:px-8">
        {/* Centralized BLOG tag */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full text-white font-bold text-sm border border-cyan-400/30 backdrop-blur-sm shadow-lg shadow-cyan-500/10 w-fit animate-pulse">
            <Sparkles className="h-4 w-4 mr-2 text-cyan-300" />
            BLOG
          </div>
        </div>

        {/* Title aligned to left and Search centered */}
        <div className="space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            {/* Title on the left */}
            <div className="flex-1">
          <h1 className="text-balance text-left text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg max-w-4xl">
            {pageTitle}
          </h1>
            </div>

            {/* Search on the right for large screens, centered for small */}
            <div className="flex justify-center lg:justify-end">
          <div className="transform hover:scale-105 transition-transform duration-300">
            <Search />
          </div>
            </div>
          </div>
        </div>
          </div>
        </header>

        {/* Enhanced Posts Grid */}
        {hasPosts && (
          <div className="animate-fadeIn" style={{ animationDelay: "0.3s" }}>
        <div className="container mx-auto px-4 md:px-8">
          <PostGridCard>
            {postList.map((post, index) => (
          <div
            key={post._id}
            className="animate-slideUp hover:transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <PostCard
              title={post.title}
              description={post.description}
              date={new Date(post.date).toLocaleDateString("pt-BR")}
              slug={post.slug}
              image={post.image}
              author={{
            avatar: post.author.avatar,
            name: post.author.name,
              }}
            />
          </div>
            ))}
          </PostGridCard>
        </div>
          </div>
        )}

        {/* Enhanced Empty State */}
        {!hasPosts && (
          <div className="flex justify-center animate-fadeIn" style={{ animationDelay: "0.5s" }}>
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="flex flex-col items-center justify-center gap-8 border-dashed border-2 border-white/20 p-12 md:p-16 rounded-2xl bg-white/5 backdrop-blur-sm shadow-2xl relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl"></div>

            {/* Floating elements around empty state */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-60"></div>
            <div
          className="absolute bottom-4 left-4 w-3 h-3 bg-purple-400 rounded-full animate-ping opacity-40"
          style={{ animationDelay: "1s" }}
            ></div>

            {/* Enhanced icon */}
            <div className="relative">
          <div className="size-20 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-cyan-400/30 shadow-lg animate-pulse">
            <Inbox className="h-10 w-10 text-cyan-300" />
          </div>
          <div className="absolute -top-2 -right-2 size-6 bg-pink-500/20 rounded-full flex items-center justify-center border border-pink-400/30">
            <Sparkles className="h-3 w-3 text-pink-400" />
          </div>
            </div>

            <div className="text-center space-y-2 relative z-10">
          <p className="text-white text-xl font-semibold">Nenhum post encontrado</p>
          <p className="text-gray-300 text-sm max-w-md">
            {query
              ? `Não encontramos resultados para "${query}". Tente uma busca diferente.`
              : "Ainda não há posts disponíveis. Volte em breve para conferir nosso conteúdo!"}
          </p>
            </div>
          </div>
        </div>
          </div>
        )}
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

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
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

        .animate-slideUp {
          animation: slideUp 0.8s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
