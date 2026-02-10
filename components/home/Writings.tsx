"use client";

import { BlogPostMetadata } from "@/lib/blog";
import BlogPostCard from "@/components/blog/BlogPostCard";
import { motion } from "motion/react";

interface WritingsProps {
  posts: BlogPostMetadata[];
}

export default function Writings({ posts }: WritingsProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="py-12 relative">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 text-center pb-12">
          Writings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <BlogPostCard post={post} from="home" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
