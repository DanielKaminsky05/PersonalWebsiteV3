"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Briefcase } from "lucide-react";

interface Experience {
  id: string;
  company: string;
  logo: string;
  position: string;
  dates: string;
  shortDescription: string;
  details: string[];
}

export default function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <div 
      id={`experience-${experience.id}`}
      className="w-full max-w-4xl mx-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors duration-300 scroll-mt-24"
    >
      <div className="p-6 flex flex-col md:flex-row gap-6 items-start relative">
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-xl overflow-hidden bg-white/10 flex items-center justify-center relative">
            {experience.logo ? (
              <Image 
                src={experience.logo} 
                alt={experience.company} 
                fill 
                className="object-cover"
              />
            ) : (
              <Briefcase className="w-8 h-8 text-white/50" />
            )}
          </div>
        </div>

        {/* Header Info */}
        <div className="flex-grow space-y-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
            <h3 className="text-xl font-bold text-white">{experience.position}</h3>
            <span className="text-sm font-medium text-gray-400 bg-white/5 px-3 py-1 rounded-full whitespace-nowrap">
              {experience.dates}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <span className="font-semibold text-lg">{experience.company}</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            {experience.shortDescription}
          </p>

          {/* Details List */}
          <ul className="space-y-2 pt-2">
            {experience.details.map((detail, index) => (
              <li key={index} className="text-gray-300 flex items-start gap-2 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-500 mt-2 flex-shrink-0" />
                <span className="leading-relaxed opacity-80">{detail}</span>
              </li>
            ))}
          </ul>

          {/* Deep Dive Button */}
          <div className="pt-4">
            <Link 
              href={`/experience/${experience.id}`}
              className="inline-flex items-center gap-2 px-6 py-2 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform shadow-lg shadow-white/10"
            >
              Read how this system was built
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
