"use client";

import AcademicStats from "../stats/AcademicStats";
import LeetCodeStatsContainer from "../stats/LeetCode/LeetCodeStatsContainer";
import GitHubStatsContainer from "../stats/GitHubStatsContainer";

export default function Stats() {
  return (
    <section className="py-12 relative">
        <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 text-center mb-16">
            Stats
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Left Column: Academic Stats */}
                <AcademicStats />

                {/* Right Column: LeetCode & GitHub Stats */}
                <div className="flex flex-col gap-4">
                    <LeetCodeStatsContainer userName="DanielKaminsky" />
                    <GitHubStatsContainer />
                </div>
            </div>
        </div>
    </section>
  );
}
