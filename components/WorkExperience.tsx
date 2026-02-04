"use client";

import { useEffect, useState } from "react";
import ExperienceCard from "./ExperienceCard";
// We can import JSON directly in Next.js/Webpack environments
import experienceData from "@/data/experience.json";

export default function WorkExperience() {
  return (
    <section className="py-12 md:py-20 px-4 relative z-10" id="experience">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4 text-center mb-8 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Work Experience
          </h2>
        </div>

        <div className="space-y-6">
          {experienceData.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      </div>
    </section>
  );
}
