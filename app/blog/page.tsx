import { PostCard } from "@/components/ui/post-card";
import { Search } from "@/components/ui/search";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BlogPage() {
    return (
        <section
            className="min-h-screen pt-24 pb-20 relative overflow-hidden"
            style={{
                backgroundImage: "url('/background.svg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-sky-800 to-purple-800"></div>
            <div className="absolute top-8 left-8 z-20">
                <Link
                    href="/"
                    className="flex items-center gap-2 px-3 py-2 bg-white/80 hover:bg-white rounded-full shadow transition-colors text-sky-900 font-medium"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Voltar
                </Link>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <header className="mb-16">
                    <div className="space-y-6 flex flex-col items-start justify-between md:flex-row md:items-end lg:items-end">
                        <div className="flex flex-col gap-4 md:px-0">
                            {/* TAG */}
                            <div className="inline-flex items-center px-4 py-2 bg-purple-500/30 rounded-full text-white font-medium text-sm border border-purple-400/30 backdrop-blur-sm w-fit">
                                BLOG
                            </div>

                            {/* Titulo */}
                            <h1 className="text-balance text-start md:text-left text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-2xl text-white">
                                Explore insights, tendências e dicas exclusivas
                            </h1>
                        </div>

                        {/* Search Section - Positioned on the right */}
                        <div className="flex items-end">
                            <Search />
                        </div>
                    </div>
                </header>

                {/* Blog Posts Grid */}
                <PostCard />

            </div>
        </section>
    )
}
