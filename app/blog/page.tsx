import { getAllPosts, getAllTags } from "@/lib/blog";
import BlogList from "@/components/BlogList";

export default function BlogPage() {
  const allPosts = getAllPosts();
  const allTags = getAllTags();

  return (
    <main className="min-h-screen py-20 px-4 bg-[#121212]">
      <div className="max-w-6xl mx-auto">
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
