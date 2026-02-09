"use client";

import { useEffect, useState } from "react";
import { GitBranch, GitCommit, Calendar, Code, Users, UserPlus } from "lucide-react";

interface GitHubStats {
  repositories: number;
  commits: number;
  yearsActive: number;
  topLanguages: string[];
  followers: number;
  following: number;
}

export default function GitHubStats() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/github');
        if (!response.ok) {
          throw new Error('Failed to fetch GitHub stats');
        }
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-2 animate-pulse">
          <div className="w-2 h-2 bg-gray-600 rounded-full" />
          <div className="w-2 h-2 bg-gray-600 rounded-full" />
          <div className="w-2 h-2 bg-gray-600 rounded-full" />
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500 text-sm">Failed to load GitHub stats</p>
      </div>
    );
  }

  const statItems = [
    { icon: GitBranch, label: "Public Repositories", value: stats.repositories, color: "text-purple-400" },
    { icon: GitCommit, label: "Commits", value: stats.commits.toLocaleString(), color: "text-green-400" },
    { icon: Calendar, label: "Years Active", value: stats.yearsActive, color: "text-blue-400" },
    { icon: Users, label: "Followers", value: stats.followers, color: "text-pink-400" },
    { icon: UserPlus, label: "Following", value: stats.following, color: "text-orange-400" },
  ];

  return (
    <div className="w-full h-full flex flex-col">
      
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div className="space-y-3">
          {statItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-4 h-4 ${item.color} flex-shrink-0`} />
                <span className="text-sm text-gray-400">{item.label}</span>
              </div>
              <span className="text-lg font-bold text-gray-200 font-mono">{item.value}</span>
            </div>
          ))}

          {/* Top Languages */}
          <div className="pt-2 mt-2">
            <div className="flex items-center gap-3 mb-3 px-3">
              <Code className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span className="text-sm text-gray-400">Top Languages</span>
            </div>
            <div className="flex gap-2 flex-wrap px-3">
              {stats.topLanguages.map((lang, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-white/5 rounded-lg text-xs font-mono text-gray-200 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
