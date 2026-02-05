"use client";

import AcademicStats from "./AcademicStats";
import SolvedProblemsStats from "./LeetCode/SolvedProblemsStats";

export default function Stats() {
  return (
    <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 text-center mb-16">
            Stats
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Left Column: Academic Stats */}
                <AcademicStats />

                {/* Right Column: Temp Placeholders */}
                <div className="flex flex-col gap-4">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 h-[350px] flex items-center justify-center">
                        <SolvedProblemsStats userName="DanielKaminsky" />
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 h-[350px] flex items-center justify-center">
                         <p className="text-gray-500">Temp Component 2</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}
