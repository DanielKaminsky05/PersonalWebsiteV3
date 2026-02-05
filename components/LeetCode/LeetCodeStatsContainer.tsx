import { useState } from "react";
import SolvedProblemsStats from "./SolvedProblemsStats";
import RecentSubmission from "./RecentSubmission";
import { BarChart3, Clock } from "lucide-react";

export type Props = {
    userName: string;
    loadingComponent?: React.ReactNode;
}

/**
 * Container component that manages toggle between Solved Problems Stats and Recent Submissions
 */
export default function LeetCodeStatsContainer({ userName, loadingComponent }: Props) {
    const [showSubmissions, setShowSubmissions] = useState(false);

    return (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 h-[350px] flex flex-col relative">
            {/* Header with Toggle */}
            <div className="flex justify-between items-center mb-4">
                <span className="text-base font-semibold text-gray-200">
                    {showSubmissions ? "Recent Submissions" : "Leetcode Stats"}
                </span>
                
                {/* Toggle Button */}
                <button
                    onClick={() => setShowSubmissions(!showSubmissions)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300 group"
                    aria-label={showSubmissions ? "Show Stats" : "Show Submissions"}
                >
                    {showSubmissions ? (
                        <>
                            <BarChart3 className="w-4 h-4 text-gray-400 group-hover:text-gray-200 transition-colors" />
                            <span className="text-xs text-gray-400 group-hover:text-gray-200 transition-colors">Stats</span>
                        </>
                    ) : (
                        <>
                            <Clock className="w-4 h-4 text-gray-400 group-hover:text-gray-200 transition-colors" />
                            <span className="text-xs text-gray-400 group-hover:text-gray-200 transition-colors">Recent Submissions</span>
                        </>
                    )}
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden">
                {showSubmissions ? (
                    <RecentSubmission 
                        userName={userName}
                        loadingComponent={loadingComponent}
                    />
                ) : (
                    <SolvedProblemsStats 
                        userName={userName}
                        loadingComponent={loadingComponent}
                        showUserName={false}
                    />
                )}
            </div>

            {/* Rank Badge - Bottom Right */}
            {!showSubmissions && (
                <div className="absolute bottom-4 right-6">
                    <span className="text-xs font-mono text-gray-500">
                        Rank: #900714
                    </span>
                </div>
            )}
        </div>
    );
}
