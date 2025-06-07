'use client';

import { useSearchParams } from 'next/navigation';
import { PostCard } from "@/components/ui/post-card";
import { Search } from "@/components/ui/search";
import { PostGridCard } from "@/components/ui/post-grid-card";

// This is your initial list of posts. 
// In a real application, you would fetch this data from a CMS or database.
const allPosts = [
    {
        title: "Transformando seu negócio em uma loja virtual",
        description: "Se você está buscando uma maneira simples e eficaz de vender seus produtos online...",
        date: "20/12/2024",
        slug: "transformando",
        image: "/assets/primeiro-post.png",
        author: {
            avatar: '/customer-01.png',
            name: 'Aspen Dokidis',
        },
    },
    {
        title: "10 Dicas de SEO para Melhorar seu Ranking",
        description: "Aumente a visibilidade do seu site nos motores de busca com estas dicas essenciais de SEO.",
        date: "15/11/2024",
        slug: "dicas-seo",
        image: "/assets/segundo-post.png", // Example image
        author: {
            avatar: '/customer-02.png', // Example avatar
            name: 'John Doe',
        },
    },
    {
        title: "A Importância do Design Responsivo",
        description: "Garanta que seu site funcione perfeitamente em todos os dispositivos, do desktop ao mobile.",
        date: "01/10/2024",
        slug: "design-responsivo",
        image: "/assets/terceiro-post.png", // Example image
        author: {
            avatar: '/customer-03.png', // Example avatar
            name: 'Jane Smith',
        },
    }
];


export function BlogContent() {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('q')?.toLowerCase() || '';

    // Filter posts based on the search query in the title or description
    const filteredPosts = allPosts.filter(
        (post) =>
            post.title.toLowerCase().includes(searchQuery) ||
            post.description.toLowerCase().includes(searchQuery)
    );

    return (
        <>
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
                    {/* Search Section is now part of this client component */}
                    <div className="flex items-end">
                        <Search />
                    </div>
                </div>
            </header>

            {/* Blog Posts Grid - displays filtered posts */}
            <PostGridCard>
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <PostCard
                            key={post.slug}
                            title={post.title}
                            description={post.description}
                            date={post.date}
                            slug={post.slug}
                            image={post.image}
                            author={post.author}
                        />
                    ))
                ) : (
                    <p className="text-white/80 col-span-full text-center">Nenhum post encontrado para sua busca.</p>
                )}
            </PostGridCard>
        </>
    );
}