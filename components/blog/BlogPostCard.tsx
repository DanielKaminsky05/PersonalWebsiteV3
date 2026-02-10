import Link from "next/link";
import { Calendar, Clock, Tag } from "lucide-react";
import { BlogPostMetadata } from "@/lib/blog";

interface BlogPostCardProps {
  post: BlogPostMetadata;
  from?: string;
}

export default function BlogPostCard({ post, from }: BlogPostCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const href = from ? `/blog/${post.slug}?from=${from}` : `/blog/${post.slug}`;

  return (
    <Link href={href}>
      <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] hover:border-white/20 h-full flex flex-col">
        {/* Header */}
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-3 group-hover:opacity-90 transition-colors" style={{color: '#E5E7EB'}}>
            {post.title}
          </h3>
          
          <p className="text-sm leading-relaxed mb-4 line-clamp-3" style={{color: '#C9CDD3'}}>
            {post.excerpt}
          </p>
        </div>

        {/* Meta Info */}
        <div className="space-y-3 pt-4 border-t border-white/5">
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Read More Indicator */}
        <div className="mt-4 flex items-center gap-2 text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
          <span>Read more</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </Link>
  );
}
