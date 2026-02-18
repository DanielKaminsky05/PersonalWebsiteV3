"use client";

import { motion } from "motion/react";
import ExperienceCard from "../ui/ExperienceCard";
import { Briefcase } from "lucide-react";
// We can import JSON directly in Next.js/Webpack environments
import experienceData from "@/data/experience.json";

export default function WorkExperience() {
  return (
    <section className="py-8 md:py-12 md:pt-16 px-4 relative z-10" id="experience">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 pb-2">
            Work Experience
          </h2>
        </div>

        <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-6 md:p-12 relative">
            <div className="relative border-l border-white/10 ml-3 md:ml-6 space-y-0">
            {experienceData.map((experience, index) => (
                <motion.div
                key={experience.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="mb-12 relative last:mb-0"
                >
                <ExperienceCard experience={experience} />
                </motion.div>
            ))}
            </div>
        </div>
      </div>
    </section>
  );
}
