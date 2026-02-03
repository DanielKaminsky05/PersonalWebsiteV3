import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Briefcase, Calendar } from "lucide-react";
import Image from "next/image";
import experienceData from "@/data/experience.json";

// Required for static site generation with dynamic routes
export function generateStaticParams() {
  return experienceData.map((experience) => ({
    id: experience.id,
  }));
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const experience = experienceData.find((e) => e.id === id);

  if (!experience) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-24 px-4 pb-12 relative z-10 max-w-4xl mx-auto">
      <Link 
        href={`/#experience-${id}`}
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Home
      </Link>

      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden p-8 md:p-12">
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

        <div className="h-px w-full bg-white/10 mb-12" />

        <div className="space-y-8">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-white mb-6">Overview</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              {experience.shortDescription}
            </p>
            
            <h2 className="text-2xl font-bold text-white mt-12 mb-6">Key Contributions</h2>
            <ul className="space-y-4">
              {experience.details.map((detail, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-300">
                  <span className="w-2 h-2 rounded-full bg-blue-400 mt-2.5 flex-shrink-0" />
                  <span className="text-lg leading-relaxed">{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
