import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Briefcase, Calendar } from "lucide-react";
import Image from "next/image";
import { getAllExperiences, getExperienceById } from "@/lib/experience";
import { MDXRemote } from "next-mdx-remote/rsc";

// Required for static site generation with dynamic routes
export async function generateStaticParams() {
  const experiences = getAllExperiences();
  return experiences.map((experience: any) => ({
    id: experience.id,
  }));
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const experience = getExperienceById(id);

  if (!experience) {
    notFound();
  }

  return (
    <main className="min-h-screen py-12 px-4 bg-[#121212]">
      <article className="max-w-4xl mx-auto">
        <Link 
          href={`/#experience`}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
          {/* Large Logo */}
          <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white/10 flex items-center justify-center relative flex-shrink-0">
            {experience.logo ? (
              <Image 
                src={experience.logo} 
                alt={experience.company} 
                fill 
                className="object-cover"
              />
            ) : (
              <Briefcase className="w-12 h-12 text-white/50" />
            )}
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold text-white">
              {experience.position}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-lg">
              <span className="font-semibold text-gray-200 text-xl">{experience.company}</span>
              <span className="text-gray-500">•</span>
              <div className="flex items-center gap-2 text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>{experience.dates}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-12" />

        <div className="space-y-8">
          <div className="prose prose-invert prose-lg max-w-none [&_pre]:!bg-white/5 [&_pre]:!border-0">
             <MDXRemote
                source={experience.content}
                components={{
                  h1: (props) => <h1 className="text-4xl font-bold mt-8 mb-4" style={{color: '#E5E7EB'}} {...props} />,
                  h2: (props) => <h2 className="text-3xl font-bold mt-8 mb-4" style={{color: '#E5E7EB'}} {...props} />,
                  h3: (props) => <h3 className="text-2xl font-bold mt-6 mb-3" style={{color: '#E5E7EB'}} {...props} />,
                  h4: (props) => <h4 className="text-xl font-bold mt-4 mb-2" style={{color: '#E5E7EB'}} {...props} />,
                  p: (props) => <div className="mb-4 leading-relaxed" style={{color: '#C9CDD3'}} {...props} />,
                  a: (props) => <a className="text-blue-400 hover:text-blue-300 underline transition-colors" {...props} />,
                  strong: (props) => <strong className="font-semibold" style={{color: '#E5E7EB'}} {...props} />,
                  ul: (props) => <ul className="list-disc list-inside mb-4 space-y-2" style={{color: '#C9CDD3'}} {...props} />,
                  ol: (props) => <ol className="list-decimal list-inside mb-4 space-y-2" style={{color: '#C9CDD3'}} {...props} />,
                  li: (props) => <li style={{color: '#C9CDD3'}} {...props} />,
                  blockquote: (props) => <blockquote className="border-l-4 border-white/20 pl-4 italic text-gray-400 my-6" {...props} />,
                  hr: (props) => <hr className="border-white/10 my-8" {...props} />,
                  img: (props) => (
                    <figure className="my-8">
                      <img 
                        {...props} 
                        className="rounded-xl border border-white/10 w-full h-auto" 
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
        </div>
      </article>
    </main>
  );
}
