import { getAllPosts, getAllTags } from "@/lib/blog";
import BlogList from "@/components/BlogList";

export default function BlogPage() {
  const allPosts = getAllPosts();
  const allTags = getAllTags();

  return (
    <main className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-4">
            Blog & Tutorials
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Thoughts on code, career, and building cool stuff
          </p>
        </div>

        {/* Client component for filtering and display */}
        <BlogList posts={allPosts} tags={allTags} />
      </div>
    </main>
  );
}
