"use client";

import { useEffect, useState } from "react";
import { GitCommit } from "lucide-react";

interface Commit {
  message: string;
  date: string;
  repository: string;
  additions: number;
  deletions: number;
}

export default function RecentCommits() {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCommits() {
      try {
        const response = await fetch('/api/github/commits');
        if (!response.ok) {
          throw new Error('Failed to fetch commits');
        }
        const data = await response.json();
        setCommits(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchCommits();
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

  if (error || !commits) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500 text-sm">Failed to load commits</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const truncateMessage = (message: string) => {
    const firstLine = message.split('\n')[0];
    return firstLine.length > 50 ? firstLine.substring(0, 50) + '...' : firstLine;
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div className="space-y-2">
          {commits.map((commit, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <GitCommit className="w-3 h-3 text-green-400 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-200 truncate">{truncateMessage(commit.message)}</p>
                  <p className="text-xs text-gray-500">{commit.repository}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                <span className="text-xs text-green-400">+{commit.additions}</span>
                <span className="text-xs text-red-400">-{commit.deletions}</span>
                <span className="text-xs text-gray-500">{formatDate(commit.date)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
