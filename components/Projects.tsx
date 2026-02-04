"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ExternalLink, Github, Layers } from "lucide-react";
import projectData from "@/data/projects.json";

interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  author: string;
  media: string;
  tags?: string[];
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">
          Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectData.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]"
            >
              {/* Image Container */}
              <div className="h-48 w-full relative overflow-hidden bg-white/5">
                 {/* Fallback for missing images/gifs using a pattern/gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-black flex items-center justify-center">
                    <Layers className="w-12 h-12 text-white/20 group-hover:text-white/40 transition-colors" />
                </div>
                {/* 
                  Using non-optimized Image for "gifs" to ensure they play if they are actual .gif files, 
                  or standard Image if they were static. Current mock data points to non-existent files 
                  so the fallback gradient above will be visible primarily or we check for error.
                  Ideally, we'd have real images. For now, we render the Image component 
                  but expect it might fail if files don't exist. 
                  Let's assume the user might add files later. 
                */}
                 {/* 
                   NOTE: Since the files don't exist, Next/Image might throw or show broken icon.
                   To make it look "dummy" but clean, I'll rely on the background above if no source,
                   but the data has sources. 
                   I'll conditionally render Image if we were sure, but let's try to render it.
                 */}
                 {/* <Image 
                    src={project.media} 
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                 /> */}
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-white transition-colors">
                            {project.title}
                        </h3>
                        <p className="text-xs text-gray-400 font-mono mt-1">{project.author}</p>
                    </div>
                </div>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                  {project.shortDescription}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags?.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-300 border border-white/5">
                            {tag}
                        </span>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedProject && (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            role="dialog"
            aria-modal="true"
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => setSelectedProject(null)}
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col md:flex-row h-full overflow-hidden">
                {/* Visual Side */}
                <div className="w-full md:w-1/2 bg-white/5 relative min-h-[200px] md:min-h-full">
                     <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black flex items-center justify-center">
                        <Layers className="w-24 h-24 text-white/10" />
                     </div>
                     {/* Replace with actual Image when assets exist
                     <Image
                        src={selectedProject.media}
                        alt={selectedProject.title}
                        fill
                        className="object-cover"
                     />
                     */}
                </div>

                {/* Content Side */}
                <div className="w-full md:w-1/2 p-8 overflow-y-auto">
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h2>
                        <div className="flex items-center gap-3 text-sm">
                            <span className="text-gray-300 font-mono">{selectedProject.author}</span>
                            <span className="text-white/20">•</span>
                             <div className="flex gap-2">
                                {selectedProject.tags?.map((tag) => (
                                    <span key={tag} className="px-2 py-0.5 rounded-full bg-white/10 text-gray-300 border border-white/10 text-xs">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="prose prose-invert prose-sm max-w-none">
                        <p className="text-lg text-gray-300 leading-relaxed mb-6">
                            {selectedProject.shortDescription}
                        </p>
                        <div className="space-y-4 text-gray-400">
                            <p>{selectedProject.fullDescription}</p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/10 flex gap-4">
                        <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors">
                            <ExternalLink className="w-4 h-4" />
                            Live Demo
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white/5 text-white font-bold rounded-xl hover:bg-white/10 border border-white/10 transition-colors">
                            <Github className="w-4 h-4" />
                            Source Code
                        </button>
                    </div>
                </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
