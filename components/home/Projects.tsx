"use client";

import Image from "next/image";
import { Layers, Github, Figma, Presentation } from "lucide-react";
import projectData from "@/data/projects.json";

interface Project {
  id: string;
  title: string;
  description: string[];
  author: string;
  media: string;
  tags?: string[];
  github?: string;
  figma?: string;
  pitch?: string;
}

export default function Projects() {
  return (
    <section className="py-8 md:py-12 relative">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 text-center pb-12">
            Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectData.map((project) => (
            <div
              key={project.id}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
            >
              {/* Image Container */}
              <div className="h-40 w-full relative overflow-hidden bg-white/5">
                 {!project.media ? (
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-black flex items-center justify-center">
                        <Layers className="w-12 h-12 text-white/20 group-hover:text-white/40 transition-colors" />
                    </div>
                 ) : project.media.endsWith(".mp4") ? (
                    <video 
                        src={project.media}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    />
                 ) : (
                    <>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-black flex items-center justify-center">
                            <Layers className="w-12 h-12 text-white/20 group-hover:text-white/40 transition-colors" />
                        </div>
                        <Image 
                            src={project.media} 
                            alt={project.title}
                            fill
                            className="object-cover"
                            onError={(e) => e.currentTarget.style.display = 'none'}
                        />
                    </>
                 )}
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-lg font-bold text-white transition-colors">
                            {project.title}
                        </h3>
                        <p className="text-xs text-gray-400 font-mono mt-1">{project.author}</p>
                    </div>
                </div>
                
                <div className="prose prose-invert prose-sm max-w-none mb-4">
                    {project.description.map((paragraph, index) => (
                        <p key={index} className="text-gray-400 text-sm leading-relaxed mb-4 last:mb-0">
                          {paragraph}
                        </p>
                    ))}
                </div>

                <div className="flex items-center gap-3 mb-4">
                    {project.github && (
                        <a 
                            href={project.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-medium text-white transition-colors"
                        >
                            <Github className="w-3.5 h-3.5" />
                            GitHub
                        </a>
                    )}
                    {project.figma && (
                        <a 
                            href={project.figma} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-medium text-white transition-colors"
                        >
                            <Figma className="w-3.5 h-3.5" />
                            Figma
                        </a>
                    )}
                    {project.pitch && (
                        <a 
                            href={project.pitch} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-medium text-white transition-colors"
                        >
                            <Presentation className="w-3.5 h-3.5" />
                            Pitch
                        </a>
                    )}
                </div>

                <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.tags?.slice(0, 10).map((tag) => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-300 border border-white/5 font-medium tracking-wide">
                            {tag}
                        </span>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
