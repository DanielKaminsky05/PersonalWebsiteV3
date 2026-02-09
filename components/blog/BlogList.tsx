"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Search } from "lucide-react";
import BlogPostCard from "@/components/blog/BlogPostCard";
import { BlogPostMetadata } from "@/lib/blog";

interface BlogListProps {
  posts: BlogPostMetadata[];
  tags: string[];
}

export default function BlogList({ posts, tags }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter posts by search query (searches title, excerpt, and tags)
  const filteredPosts = posts.filter((post) => {
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  return (
    <>
      {/* Search Bar */}
      <div className="mb-12 max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search posts by title, topic, or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-full text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/20 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors text-sm"
            >
              Clear
            </button>
          )}
        </div>
        {searchQuery && (
          <p className="text-gray-500 text-sm mt-2 text-center">
            Found {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"}
          </p>
        )}
      </div>

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <BlogPostCard post={post} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">
            {searchQuery
              ? `No posts found matching "${searchQuery}"`
              : "No blog posts yet. Check back soon!"}
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 text-gray-300 hover:text-white hover:underline"
            >
              Clear search
            </button>
          )}
        </div>
      )}
    </>
  );
}

