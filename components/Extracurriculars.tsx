"use client";

import Image from "next/image";
import extracurricularsData from "@/data/extracurriculars.json";

interface ExtracurricularItem {
  role: string;
  organization: string;
  years: string;
  logo: string;
  description: string;
}

interface ExtracurricularGroup {
  category: string;
  items: ExtracurricularItem[];
}

export default function Extracurriculars() {
  const { description, groups } = extracurricularsData.extracurriculars as {
    description: string;
    groups: ExtracurricularGroup[];
  };

  return (
    <section className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 text-center mb-4">
          Extracurriculars
        </h2>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          {description}
        </p>

        <div className="space-y-12">
          {groups.map((group, groupIndex) => (
            <div key={groupIndex}>
              <h3 className="text-xl font-semibold text-gray-200 mb-6 flex items-center gap-2">
                {group.category}
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {group.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group relative"
                  >
                    <div className="flex gap-4">
                      {/* Logo - smaller, on the left */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center relative shadow-lg bg-white/10 group-hover:bg-white/20 transition-colors">
                          <Image
                            src={item.logo}
                            alt={`${item.organization} logo`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-semibold text-gray-200 group-hover:text-white transition-colors">
                          {item.role}
                        </h4>
                        <p className="text-sm text-gray-400 mb-3">
                          {item.organization}
                        </p>
                        <p className="text-sm text-gray-300 leading-relaxed opacity-80">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Year - bottom right */}
                    <div className="absolute bottom-4 right-5">
                      <span className="text-xs font-mono text-gray-500">
                        {item.years}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
