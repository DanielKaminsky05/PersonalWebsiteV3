import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllPosts, getAllTags } from "@/lib/blog";
import BlogList from "@/components/blog/BlogList";

export default function BlogPage() {
  const allPosts = getAllPosts();
  const allTags = getAllTags();

  return (
    <main className="min-h-screen py-20 px-4 bg-[#121212]">
      <div className="max-w-6xl mx-auto">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{color: '#E5E7EB'}}>
            Daniel's Blog
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{color: '#C9CDD3'}}>
            Thoughts on code, career, and building cool stuff
          </p>
        </div>

        {/* Client component for filtering and display */}
        <BlogList posts={allPosts} tags={allTags} />
      </div>
    </main>
  );
}
