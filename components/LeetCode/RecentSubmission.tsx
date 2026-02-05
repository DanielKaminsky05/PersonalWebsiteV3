import { forwardRef, memo, useCallback } from "react";
import { useFetch } from "./hooks";
import leetcodeQuery from "./LeetcodeQuery";
import { RecentSubmission as TRecentSubmission } from "./Types";
import LoadingOrError from "./LoadingOrError";
import { ExternalLink } from "lucide-react";

export type Props = {
    userName: string,
    loadingComponent?: React.ReactNode,
}

/**
 * Component for displaying recent submissions of a user.
 */
const RecentSubmission = forwardRef<HTMLDivElement, Props>(({
    userName,
    loadingComponent,
}, ref) => {

    const fetchData = useCallback(() => {
        return leetcodeQuery.fetchUserRecentSubmissions(userName);
    }, [userName])

    const { data, loading: isLoading, error } = useFetch<TRecentSubmission[]>(fetchData);

    if (isLoading || error || !data) {
        return (
            <LoadingOrError
                loading={isLoading}
                error={error}
                loadingComponent={loadingComponent}
            />
        )
    }

    return (
        <div
            id="recent-submissions_container"
            ref={ref}
            className="w-full h-full flex flex-col"
        >
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <div className="space-y-2">
                    {data.map((submission: TRecentSubmission, i: number) => (
                        <a
                            key={i}
                            href={`https://leetcode.com/problems/${submission.titleSlug}/`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between w-full px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5 group cursor-pointer"
                        >
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${submission.statusDisplay === "Accepted" ? "bg-green-500" : "bg-red-500"}`} />
                                <p className="text-sm text-gray-200 truncate group-hover:text-white transition-colors">{submission.title}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`text-xs font-mono ml-2 flex-shrink-0 ${submission.statusDisplay === "Accepted" ? "text-green-400" : "text-red-400"}`}>
                                    {submission.statusDisplay}
                                </span>
                                <ExternalLink className="w-3 h-3 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
})

const MemoizedRecentSubmission = memo(RecentSubmission);

export default MemoizedRecentSubmission;