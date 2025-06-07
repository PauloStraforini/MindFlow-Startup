"use client"

import type { Post } from "contentlayer/generated"
import Image from "next/image"
import Link from "next/link"
import { Share2, BookOpen, Clock, Eye, Heart } from "lucide-react"

import { Avatar } from "@/components/avatar"
import { Markdown } from "@/components/markdown"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { PostShare } from "./components/post-share"

export type PostPageProps = {
  post: Post
}

export const PostPage = ({ post }: PostPageProps) => {
  const publishedDate = new Date(post?.date).toLocaleDateString("pt-BR")
  const postUrl = `https://site.set/blog/${post.slug}`

  return (
    <main
      className="py-20 text-gray-100 min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: "url('/background.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-800/90 via-purple-800/90 to-slate-900/90"></div>

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-20 right-20 w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-blue-400/30 animate-float"
          style={{ animationDelay: "0.5s" }}
        >
          <BookOpen className="h-8 w-8 text-blue-400" />
        </div>

        <div
          className="absolute top-1/3 left-10 w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-pink-400/30 animate-float"
          style={{ animationDelay: "1s" }}
        >
          <Heart className="h-6 w-6 text-pink-400" />
        </div>

        <div
          className="absolute bottom-1/4 right-10 w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-purple-400/30 animate-float"
          style={{ animationDelay: "1.5s" }}
        >
          <Eye className="h-7 w-7 text-purple-400" />
        </div>

        <div
          className="absolute top-1/2 left-5 w-3 h-3 bg-blue-400 rounded-full animate-ping"
          style={{ animationDelay: "0.8s" }}
        ></div>
        <div
          className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-pink-400 rounded-full animate-ping"
          style={{ animationDelay: "1.2s" }}
        ></div>
        <div
          className="absolute top-2/3 left-1/3 w-4 h-4 bg-purple-400 rounded-full animate-ping"
          style={{ animationDelay: "1.8s" }}
        ></div>
      </div>

      <div className="container space-y-8 px-4 md:px-8 relative z-10 animate-fadeIn">
        {/* Enhanced Breadcrumb */}
        <Breadcrumb className="bg-blue-500/20 backdrop-blur-sm p-4 rounded-2xl border border-blue-400/30 shadow-lg">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                asChild
                className="text-action-sm hover:text-blue-300 transition-all duration-300 transform hover:scale-105"
              >
                <Link href="/blog">Blog</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-blue-300" />
            <BreadcrumbItem>
              <span className="text-blue-300 text-action-sm font-medium">{post?.title}</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 lg:gap-12">
          {/* Enhanced Article */}
          <article className="bg-slate-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl transform hover:scale-[1.01] transition-all duration-500">
            {/* Cover image with enhanced styling */}
            <figure className="relative aspect-[16/10] w-full overflow-hidden">
              <Image
                src={post?.image ?? ""}
                alt={post?.title ?? ""}
                fill
                className="object-cover transition-transform hover:scale-110 duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent"></div>

              {/* Floating stats on image */}
              <div className="absolute top-4 right-4 flex gap-2">
                <div className="bg-blue-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-blue-400/30 flex items-center gap-1">
                  <Clock className="h-3 w-3 text-blue-400" />
                  <span className="text-xs text-white">5 min</span>
                </div>
              </div>
            </figure>

            {/* Enhanced Header */}
            <header className="p-6 md:p-8 lg:p-12 pb-0 mt-6 md:mt-8 relative">
              <h1 className="mb-8 text-balance text-heading-lg md:text-heading-xl lg:text-heading-xl font-bold text-white leading-tight animate-fadeIn">
                {post?.title}
              </h1>

              {/* Enhanced Avatar Container */}
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-6 rounded-2xl border border-blue-400/30 backdrop-blur-sm shadow-lg">
                <Avatar.Container>
                  <Avatar.Image src={post?.author.avatar} alt={post?.title} size="sm" />
                  <Avatar.Content>
                    <span className="text-white font-semibold">
                      <Avatar.Title>{post?.author.name}</Avatar.Title>
                    </span>
                    <Avatar.Description>
                      <span className="text-slate-300">
                        Publicado em{" "}
                        <time dateTime={post?.date} className="text-blue-300 font-medium">
                          {publishedDate}
                        </time>
                      </span>
                    </Avatar.Description>
                  </Avatar.Content>
                </Avatar.Container>
              </div>
            </header>

            {/* Enhanced Content */}
            <div className="prose prose-invert prose-slate max-w-none px-6 py-12 md:px-8 lg:px-12 prose-headings:text-blue-200 prose-a:text-blue-300 prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-blockquote:border-blue-400 prose-blockquote:bg-blue-500/10 prose-blockquote:backdrop-blur-sm">
              <Markdown content={post?.body.raw} />
            </div>
          </article>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Share Component with floating effect */}
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm p-6 rounded-2xl border border-purple-400/30 shadow-2xl sticky top-6 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-purple-400/30">
                <Share2 className="h-5 w-5 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">Compartilhar</h3>
              </div>
              <PostShare url={postUrl} title={post?.title} description={post?.description} />
            </div>

            {/* Reading Stats */}
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm p-6 rounded-2xl border border-blue-400/30 shadow-lg">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-400" />
                Estatísticas
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">5</div>
                  <div className="text-sm text-gray-400">min leitura</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">1.2k</div>
                  <div className="text-sm text-gray-400">visualizações</div>
                </div>
              </div>
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
    </main>
  )
}
