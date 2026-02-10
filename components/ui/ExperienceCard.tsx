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
  const accentColor = experience.color || "#ffffff";

  return (
    <div 
      id={`experience-${experience.id}`}
      style={{ borderLeftColor: accentColor }}
      className="w-full max-w-4xl mx-auto bg-white/5 backdrop-blur-sm border-y border-r border-l-4 border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors duration-300 scroll-mt-24"
    >
      <div className="p-5 flex flex-col md:flex-row gap-4 items-start relative">
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <div 
            className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center relative shadow-lg"
            style={{ backgroundColor: `${accentColor}20` }}
          >
            {experience.logo ? (
              <Image 
                src={experience.logo} 
                alt={experience.company} 
                fill 
                className="object-cover"
              />
            ) : (
              <Briefcase className="w-6 h-6 text-white/50" />
            )}
          </div>
        </div>

        {/* Header Info */}
        <div className="flex-grow space-y-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
            <div>
              <h3 className="text-lg font-bold text-white">{experience.position}</h3>
              <p className="text-base font-semibold" style={{ color: accentColor }}>{experience.company}</p>
            </div>
            <span 
              className="text-sm font-medium px-3 py-1 rounded-full whitespace-nowrap border w-fit"
              style={{ 
                color: accentColor,
                backgroundColor: `${accentColor}10`,
                borderColor: `${accentColor}20`
              }}
            >
              {experience.dates}
            </span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            {experience.shortDescription}
          </p>

          {/* Details List */}
          <ul className="space-y-2 pt-2">
            {experience.details.map((detail, index) => (
              <li key={index} className="text-gray-300 flex items-start gap-2 text-sm">
                <span 
                  className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" 
                  style={{ backgroundColor: accentColor }}
                />
                <span className="leading-relaxed opacity-80">{detail}</span>
              </li>
            ))}
          </ul>

          {/* Deep Dive Button */}
          <div className="pt-4">
            <Link 
              href={`/experience/${experience.id}`}
              className="inline-flex items-center gap-2 px-5 py-1.5 bg-white text-black font-bold text-sm rounded-full hover:scale-105 transition-transform shadow-lg shadow-white/10"
            >
              Deep Dive
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
