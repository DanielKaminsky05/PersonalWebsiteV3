"use client";

import { techStack } from "@/data/techStack";
import { motion } from "framer-motion";

export default function TechStack() {
  return (
    <section className="py-8 relative">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 text-center mb-8 md:mb-16">
          Tech Stack
        </h2>

        {/* 
          Grid Layout Strategy:
          - Mobile (default): 1 column (stack everything)
          - Tablet/Desktop (md): 2 columns
          
          We removed the complex col-span logic to ensure everything fits uniformly.
          Since there are 5 items, the last item (Tools) will be on its own row in a 2-col grid,
          so we can make it span 2 columns to center it nicely if we want, or just let it occupy left.
          
          Let's try making the LAST item span 2 columns on md if it's the 5th item.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-6 gap-6">
          {Object.entries(techStack).map(([key, category]) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`
                flex flex-col p-4 sm:p-6 rounded-2xl border bg-gradient-to-br
                ${category.color} ${category.border} backdrop-blur-sm
                ${key === "languages" || key === "tools" ? "sm:col-span-3" : "sm:col-span-2"}
              `}
                // Explanation:
                // md:col-span-2 -> Spans full width of the container
                // md:w-2/3 md:mx-auto -> Constrains the width to 2/3 and centers it, so it looks like a nice centered bento box instead of a super wide one.
              >
                <h3 className={`text-lg sm:text-xl font-bold mb-4 sm:mb-6 ${category.text}`}>
                  {category.name}
                </h3>

                <div className="flex flex-wrap gap-2 sm:gap-4">
                  {category.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center gap-1.5 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 bg-black/20 rounded-lg border border-white/5 hover:bg-white/10 transition-colors"
                    >
                      <span className="text-base sm:text-lg md:text-xl">
                        {item.icon}
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-gray-300">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
