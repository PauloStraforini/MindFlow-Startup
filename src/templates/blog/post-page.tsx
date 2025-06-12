"use client"

import { Post } from 'contentlayer/generated';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, Brain, Users, Heart, Sparkles } from 'lucide-react';

import { Avatar } from '@/src/components/avatar';
import { Markdown } from '@/src/components/markdown';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/src/components/ui/breadcrumb';
import { PostShare } from './components/post-share';

export type PostPageProps = {
  post: Post;
};

export const PostPage = ({ post }: PostPageProps) => {
  const publishedDate = new Date(post?.date).toLocaleDateString('pt-BR');
  const postUrl = `https://site.set/blog/${post.slug}`;

  return (
    <main 
      className="min-h-screen py-20 relative overflow-hidden"
      style={{
        backgroundImage: "url('/background.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Gradient overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-800 to-purple-800 opacity-90"></div>
      
      <div className="container relative z-10 space-y-8 px-4 md:px-8 mx-auto">
        {/* Breadcrumb with updated styling */}
        <Breadcrumb className="backdrop-blur-sm py-2 px-4 rounded-full inline-flex border border-blue-400/30 bg-blue-500/10">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild className="text-white hover:text-blue-200 transition-colors">
                <Link href="/blog">Blog</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-blue-300" />
            <BreadcrumbItem>
              <span className="text-blue-200">
                {post?.title}
              </span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 lg:gap-12 relative">
          {/* Floating decorative elements */}
          <div className="absolute -top-10 right-10 w-16 h-16 bg-pink-600/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-pink-400/30 animate-float">
            <Calendar className="h-8 w-8 text-pink-400" />
          </div>
          
          <div className="absolute -bottom-10 left-10 w-16 h-16 bg-purple-600/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-purple-400/30 animate-float" style={{ animationDelay: "1s" }}>
            <Brain className="h-8 w-8 text-purple-400" />
          </div>
          
          <div className="absolute top-1/2 -right-5 w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-blue-400/30 animate-float" style={{ animationDelay: "1.5s" }}>
            <Users className="h-6 w-6 text-blue-400" />
          </div>

          {/* Main article with updated styling */}
          <article className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border-white/20 border-[1px] shadow-xl animate-fadeIn">
            <figure className="relative aspect-[16/10] w-full overflow-hidden">
              <Image
                src={post?.image ?? ''}
                alt={post?.title ?? ''}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </figure>

            <header className="p-4 md:p-6 lg:p-12 pb-0 mt-8 md:mt-12">
              <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 rounded-full text-white font-medium text-sm mb-8 border border-blue-400/30 backdrop-blur-sm">
                <Sparkles className="h-4 w-4 mr-2" />
                Blog Post
              </div>
              
              <h1 className="mb-8 text-balance text-heading-lg md:text-heading-xl lg:text-heading-xl text-white">
                {post?.title}
              </h1>

              <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/20">
                <Avatar.Container>
                  <Avatar.Image
                    src={post?.author.avatar}
                    alt={post?.title}
                    size="sm"
                  />
                  <Avatar.Content>
                    <Avatar.Title>{post?.author.name}</Avatar.Title>
                    <Avatar.Description>
                      Publicado em {''}
                      <time dateTime={post?.date}>{publishedDate}</time>
                    </Avatar.Description>
                  </Avatar.Content>
                </Avatar.Container>
              </div>
            </header>

            <div className="prose prose-invert max-w-none px-4 mt-12 md:px-6 lg:px-12 pb-12 text-white">
              <Markdown content={post?.body.raw} />
            </div>
          </article>

          {/* PostShare with updated styling */}
          <div className="animate-fadeIn" style={{ animationDelay: "0.3s" }}>
            <PostShare
              url={postUrl}
              title={post?.title}
              description={post?.description}
            />
            
            {/* Additional engagement metrics */}
            <div className="mt-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center">
                <Heart className="mr-2 h-5 w-5 text-pink-400" />
                Engagement
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white/5 rounded-xl">
                  <div className="text-2xl font-bold text-white">500+</div>
                  <div className="text-sm text-blue-200">Leituras</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-xl">
                  <div className="text-2xl font-bold text-white">98%</div>
                  <div className="text-sm text-blue-200">Aprovação</div>
                </div>
              </div>
              
              <Link href="/blog" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-base transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1 flex items-center justify-center group w-full">
                Mais artigos
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Animation styles */}
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
  );
};
