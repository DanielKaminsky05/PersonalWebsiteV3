import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import rehypeHighlight from "rehype-highlight";
import BlogBackButton from "@/components/blog/BlogBackButton";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Daniel Kaminsky`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen py-12 px-4 bg-[#121212]">
      <article className="max-w-4xl mx-auto">
        {/* Back Button */}
        <BlogBackButton />

        {/* Post Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6" style={{color: '#E5E7EB'}}>
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-12" />

        {/* Post Content */}
        <div className="prose prose-invert prose-lg max-w-none [&_pre]:!bg-white/5 [&_pre]:!border-0">
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                rehypePlugins: [rehypeHighlight],
              },
            }}
            components={{
              h1: (props) => <h1 className="text-4xl font-bold mt-8 mb-4" style={{color: '#E5E7EB'}} {...props} />,
              h2: (props) => <h2 className="text-3xl font-bold mt-8 mb-4" style={{color: '#E5E7EB'}} {...props} />,
              h3: (props) => <h3 className="text-2xl font-bold mt-6 mb-3" style={{color: '#E5E7EB'}} {...props} />,
              h4: (props) => <h4 className="text-xl font-bold mt-4 mb-2" style={{color: '#E5E7EB'}} {...props} />,
              p: (props) => <p className="mb-4 leading-relaxed" style={{color: '#C9CDD3'}} {...props} />,
              a: (props) => <a className="text-blue-400 hover:text-blue-300 underline transition-colors" {...props} />,
              strong: (props) => <strong className="font-semibold" style={{color: '#E5E7EB'}} {...props} />,
              code: (props) => {
                // Check if code is inside a pre (code block) or standalone (inline code)
                const isInline = !props.className?.includes('language-');
                if (isInline) {
                  return <code className="px-2 py-0.5 rounded text-sm font-mono text-green-300" {...props} />;
                }
                // Code inside pre blocks (syntax highlighted) - no extra styling needed
                return <code {...props} />;
              },
              pre: (props) => <pre className="bg-white/5 rounded-xl p-4 overflow-x-auto my-6" {...props} />,
              ul: (props) => <ul className="list-disc list-inside mb-4 space-y-2" style={{color: '#C9CDD3'}} {...props} />,
              ol: (props) => <ol className="list-decimal list-inside mb-4 space-y-2" style={{color: '#C9CDD3'}} {...props} />,
              li: (props) => <li style={{color: '#C9CDD3'}} {...props} />,
              blockquote: (props) => <blockquote className="border-l-4 border-white/20 pl-4 italic text-gray-400 my-6" {...props} />,
              hr: (props) => <hr className="border-white/10 my-8" {...props} />,
              img: (props) => (
                <figure className="my-8 mx-auto">
                  <img 
                    {...props} 
                    className="rounded-xl border border-white/10 w-full max-h-[800px]" 
                    alt={props.alt || ""} 
                  />
                  {props.alt && (
                    <figcaption className="text-center text-sm text-gray-500 mt-2 italic">
                      {props.alt}
                    </figcaption>
                  )}
                </figure>
              ),
            }}
          />
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-12" />

        {/* Back to Blog CTA */}
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-gray-200 hover:text-white transition-all duration-200 hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Read More Posts</span>
          </Link>
        </div>
      </article>
    </main>
  );
}
