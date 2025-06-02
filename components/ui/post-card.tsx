"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar, User } from "lucide-react"

const postImagePath = "/images/primeiro-post.jpg"
const authorImagePath = "/images/customer-01.jpg"

export const PostCard = () => {
  return (
    <Link
      href={`/blog/`}
      className="group w-full max-w-2xl rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden transition-all duration-500 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
    >
      {/* Image Container */}
      <div className="relative w-full h-48 md:h-56 overflow-hidden">
        <Image
          src={postImagePath || "/placeholder.svg"}
          alt="Transformando sua mente em um campo fértil para novas ideias"
          fill
          sizes="(max-width: 768px) 100vw, 640px"
          className="object-cover object-center w-full h-full transition-transform duration-700 group-hover:scale-105"
          priority
        />

        {/* Date Badge */}
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-full border border-gray-600/30">
            <Calendar className="w-3 h-3 text-gray-300" />
            <span className="text-xs font-medium text-gray-200">20/12/2024</span>
          </div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <h2 className="text-xl md:text-2xl font-bold text-gray-100 line-clamp-2 group-hover:text-blue-300 transition-colors duration-300 leading-tight">
          Transformando sua mente em um campo fértil para novas ideias
        </h2>

        {/* Description */}
        <p className="text-gray-400 text-sm md:text-base line-clamp-3 leading-relaxed">
          Se você é um profissional que busca inovação e criatividade no seu trabalho, este post é para você. Vamos
          explorar como cultivar uma mentalidade aberta e receptiva a novas ideias, transformando sua mente em um campo
          fértil para a inovação.
        </p>

        {/* Author Section */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
          <div className="flex items-center gap-3">
            <div className="relative h-8 w-8 md:h-10 md:w-10 overflow-hidden rounded-full ring-2 ring-gray-600/50 group-hover:ring-blue-500/50 transition-all duration-300">
              <Image
                src={authorImagePath || "/placeholder.svg"}
                alt="Mariana Takahashi"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <User className="w-3 h-3 text-gray-500" />
                <span className="text-sm font-medium text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                  Mariana Takahashi
                </span>
              </div>
              <span className="text-xs text-gray-500">Autora</span>
            </div>
          </div>

          {/* Read More Indicator */}
          <div className="flex items-center gap-1 text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <span className="text-sm font-medium">Ler mais</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}
