"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Briefcase } from "lucide-react";

interface Experience {
  id: string;
  company: string;
  logo: string;
  color?: string;
  position: string;
  dates: string;
  shortDescription: string;
  details: string[];
}

export default function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <div 
      id={`experience-${experience.id}`}
      className="pl-8 md:pl-12 relative group"
    >
      {/* Timeline Dot / Logo */}
      <div className="absolute -left-5 md:-left-6 top-0 flex items-center justify-center">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-[#121212] bg-[#121212] relative z-10">
           {experience.logo ? (
              <Image 
                src={experience.logo} 
                alt={experience.company} 
                fill 
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white/50" />
              </div>
            )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col items-start gap-1">
        
        <span className="text-xs md:text-sm text-gray-500 font-mono mb-1">
          {experience.dates}
        </span>
        
        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
          {experience.company}
        </h3>
        
        <p className="text-base md:text-lg text-gray-400 font-medium mb-3">
          {experience.position}
        </p>
        
        <ul className="space-y-2 mb-4">
            {experience.details.map((detail, index) => (
              <li key={index} className="text-gray-300 text-sm md:text-base leading-relaxed flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-white/20" />
                <span className="opacity-90" dangerouslySetInnerHTML={{ __html: detail }} />
              </li>
            ))}
        </ul>

          {/* Deep Dive Button */}
          {experience.id !== "1" && (
            <div>
              <Link 
                href={`/experience/${experience.id}`}
                className="inline-flex items-center gap-2 px-5 py-2 bg-white text-black font-bold text-sm rounded-full hover:scale-105 transition-transform shadow-lg shadow-white/10"
              >
                Deep Dive
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </Link>
            </div>
          )}
      </div>
    </div>
  );
}
