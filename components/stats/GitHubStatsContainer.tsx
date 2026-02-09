"use client";

import { useState } from "react";
import GitHubStats from "./GitHubStats";
import RecentCommits from "./RecentCommits";
import { BarChart3, GitCommit } from "lucide-react";

export default function GitHubStatsContainer() {
  const [showCommits, setShowCommits] = useState(false);

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 h-[350px] flex flex-col">
      {/* Header with Toggle */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-base font-semibold text-gray-200">
          {showCommits ? "Recent Commits" : "GitHub Stats"}
        </span>
        
        {/* Toggle Button */}
        <button
          onClick={() => setShowCommits(!showCommits)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 group"
          aria-label={showCommits ? "Show Stats" : "Show Commits"}
        >
          {showCommits ? (
            <>
              <BarChart3 className="w-4 h-4 text-gray-400 group-hover:text-gray-200 transition-colors" />
              <span className="text-xs text-gray-400 group-hover:text-gray-200 transition-colors">Stats</span>
            </>
          ) : (
            <>
              <GitCommit className="w-4 h-4 text-gray-400 group-hover:text-gray-200 transition-colors" />
              <span className="text-xs text-gray-400 group-hover:text-gray-200 transition-colors">Recent Commits</span>
            </>
          )}
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {showCommits ? (
          <RecentCommits />
        ) : (
          <GitHubStats />
        )}
      </div>
    </div>
  );
}
