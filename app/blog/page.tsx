import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Suspense } from "react";
import { BlogContent } from "./blog-content"; // Import the new component

// A fallback component to show while the client component is loading
function LoadingSpinner() {
    return (
        <div className="w-full flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
        </div>
    );
}

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
                <Suspense fallback={<LoadingSpinner />}>
                    <BlogContent />
                </Suspense>
            </div>
        </section>
    );
}