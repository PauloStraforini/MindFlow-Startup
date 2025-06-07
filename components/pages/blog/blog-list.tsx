"use client"

import { Search } from "@/components/ui/search"
import { allPosts } from "contentlayer/generated"
import { useSearchParams } from "next/navigation"
import { PostCard } from "./components/post-card"
import { PostGridCard } from "./components/post-grid-card"
import { BookOpen, Sparkles, SearchIcon } from "lucide-react"

export function BlogList() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") ?? ""
  const pageTitle = query ? `Resultados de busca para "${query}"` : "Dicas e estratégias para impulsionar seu negócio"

  const posts = allPosts

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
      <div
        className="absolute top-20 left-10 w-3 h-3 bg-blue-400 rounded-full animate-ping"
        style={{ animationDelay: "0.5s" }}
      ></div>
      <div
        className="absolute top-40 right-20 w-2 h-2 bg-pink-400 rounded-full animate-ping"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-40 left-1/4 w-4 h-4 bg-purple-400 rounded-full animate-ping"
        style={{ animationDelay: "1.5s" }}
      ></div>

      <div className="relative z-10">
        <header className="pb-14 animate-fadeIn">
          <div className="container mx-auto px-4 space-y-6 flex flex-col items-start justify-between md:flex-row md:items-end lg:items-end">
            <div className="flex flex-col gap-6 md:px-0">
              {/* TAG */}
              <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 rounded-full text-white font-medium text-sm border border-blue-400/30 backdrop-blur-sm w-fit">
                <BookOpen className="h-4 w-4 mr-2" />
                BLOG
              </div>

              {/* Titulo */}
              <h1 className="text-balance text-start md:text-left text-4xl md:text-5xl lg:text-6xl font-bold max-w-4xl text-white leading-tight">
                {pageTitle}
              </h1>

              {/* Subtitle */}
              <p className="text-gray-300 text-lg max-w-2xl">
                Explore nossos artigos e descubra insights valiosos para transformar sua prática profissional
              </p>
            </div>

            {/* Search with enhanced styling */}
            <div className="relative animate-float" style={{ animationDelay: "0.5s" }}>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-30"></div>
              <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-1">
                <Search />
              </div>
            </div>
          </div>
        </header>

        {/* Enhanced Posts Grid */}
        <div className="container mx-auto px-4 animate-fadeIn" style={{ animationDelay: "0.3s" }}>
          <div className="relative">
            {/* Floating search icon */}
            <div
              className="absolute -top-8 right-8 size-12 bg-blue-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-blue-400/30 animate-float md:flex"
              style={{ animationDelay: "1s" }}
            >
              <SearchIcon className="h-6 w-6 text-blue-400" />
            </div>

            {/* Posts count indicator */}
            <div className="mb-8 flex items-center justify-between">
              <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 rounded-full text-white font-medium text-sm border border-purple-400/30 backdrop-blur-sm">
                <Sparkles className="h-4 w-4 mr-2" />
                {posts.length} artigos encontrados
              </div>
            </div>

            {/* Enhanced PostGridCard wrapper */}
            <div className="relative">
              <PostGridCard>
                {posts.map((post, index) => (
                  <div
                    key={post._id}
                    className="animate-fadeIn hover:scale-105 transition-all duration-300"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative group">
                      {/* Card glow effect */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-300"></div>
                      <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden hover:border-white/20 transition-all duration-300">
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
                    </div>
                  </div>
                ))}
              </PostGridCard>
            </div>
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
    </div>
  )
}
