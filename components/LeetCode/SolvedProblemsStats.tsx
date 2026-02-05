import { forwardRef, memo, useCallback } from "react";
import { useFetch } from "./hooks";
import leetcodeQuery from "./LeetcodeQuery";
import { SubmitStats } from "./Types";
import LoadingOrError from "./LoadingOrError";
import OverallProgress from "./OverallProgess";

export type Props = {
    userName: string,
    loadingComponent?: React.ReactNode,
    showUserName?: boolean;
}

/**
 * Component for displaying statistics of solved problems by a user.
 */
const SolvedProblemsStats = forwardRef<HTMLDivElement, Props>(({
    userName,
    loadingComponent,
    showUserName = true
}, ref) => {

    const fetchData = useCallback(() => {
        return leetcodeQuery.fetchUserSolvedProblemsStats(userName);
    }, [userName])

    const { data, loading: isLoading, error } = useFetch<SubmitStats>(fetchData);

    if (isLoading || error || !data) {
        return (
            <LoadingOrError
                loading={isLoading}
                error={error}
                loadingComponent={loadingComponent}
            />
        )
    }

    const [totalQuestions, ...difficultyWiseTotal] = data.allQuestionsCount || [];
    const [totalSolved, ...sectionWiseSolved] = data.acSubmissionNum || [];
    
    // We get "All" in the first position, usually. Calculate acceptance rate from All.
    // data.totalSubmissionNum matches the order of acSubmissionNum
    const totalSubmissionsAll = data.totalSubmissionNum?.find(s => s.difficulty === "All")?.submissions || 0;
    const acSubmissionsAll = data.acSubmissionNum?.find(s => s.difficulty === "All")?.submissions || 0;
    
    const acceptanceRate = totalSubmissionsAll > 0 ? (acSubmissionsAll / totalSubmissionsAll) * 100 : 0;

    const difficultyColorMap: Record<string, { bg: string, text: string, track: string }> = {
        "Easy": { bg: "bg-green-500", text: "text-green-500", track: "bg-green-500/20" },
        "Medium": { bg: "bg-yellow-500", text: "text-yellow-500", track: "bg-yellow-500/20" },
        "Hard": { bg: "bg-red-500", text: "text-red-500", track: "bg-red-500/20" }
    };

    return (
        <div
            id="solved_problems_stats_container"
            ref={ref}
            className="w-full h-full flex flex-col justify-between"
        >

            <div id="solved_problems_stats_label" className="w-full flex justify-between items-center mb-4">
                {showUserName && <span className="text-xs font-mono text-gray-400">Rank: #{data.rank}</span>}
            </div>

            <div id="solved_problems_stats_progress_deails" className="w-full flex-1 flex gap-6 items-center">
                <div className="flex-shrink-0">
                    <OverallProgress
                        totalQuestions={totalQuestions.count!}
                        totalSolved={totalSolved.count!}
                        acceptanceRate={acceptanceRate}
                        primaryColor="white"
                        secondaryColor="#9ca3af" // text-gray-400
                    />
                </div>

                <div id="linear_progress_container" className="flex-1 flex flex-col justify-center gap-4">
                    {
                        ["Easy", "Medium", "Hard"].map((difficultyLevel) => {
                            // Find matching data
                            const sectionSolved = sectionWiseSolved.find(s => s.difficulty === difficultyLevel);
                            const beatsData = data.problemsSolvedBeatsStats?.find(s => s.difficulty === difficultyLevel);
                            
                            const count = sectionSolved?.count || 0;
                            const beatsPercentage = beatsData?.percentage || 0;
                            
                            const colors = difficultyColorMap[difficultyLevel] || { bg: "bg-gray-500", text: "text-gray-500", track: "bg-gray-500/20" };

                            return (
                                <div id={`progress_bar_${difficultyLevel}`} key={difficultyLevel} className="w-full">
                                    <div className="flex justify-between px-1 mb-1">
                                        <span className="text-xs text-gray-400">{difficultyLevel}</span>
                                        <div className="flex flex-col items-end">
                                            <span className="text-xs font-mono font-semibold text-gray-200">
                                                <span className={colors.text}>{count}</span>
                                                <span className="text-gray-500"> / {data.allQuestionsCount?.find(q => q.difficulty === difficultyLevel)?.count}</span>
                                            </span>
                                            <span className="text-[10px] text-gray-500">
                                                Beats {beatsPercentage.toFixed(1)}%
                                            </span>
                                        </div>
                                    </div>
                                    <div className={`w-full rounded-full h-2 ${colors.track}`}>
                                        <div 
                                            className={`h-2 rounded-full ${colors.bg} transition-all duration-1000`}
                                            style={{ width: `${beatsPercentage}%` }}
                                        />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
})

const MemoizedSolvedProblemsStats = memo(SolvedProblemsStats);

export default MemoizedSolvedProblemsStats;