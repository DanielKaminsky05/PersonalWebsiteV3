"use client";

import { motion } from "motion/react";
import ExperienceCard from "./ExperienceCard";
// We can import JSON directly in Next.js/Webpack environments
import experienceData from "@/data/experience.json";

export default function WorkExperience() {
  return (
    <section className="py-8 md:py-12 md:pt-16 px-4 relative z-10" id="experience">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4 text-center mb-8 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Work Experience
          </h2>
        </div>

        <div className="space-y-6">
          {experienceData.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ExperienceCard experience={experience} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
