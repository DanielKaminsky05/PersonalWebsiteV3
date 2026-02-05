import { useState } from "react";
type Props = {
    totalQuestions: number,
    totalSolved: number,
    acceptanceRate: number,
    primaryColor?: string,
    secondaryColor?: string
}

/**
 * Component for displaying overall progress of solving problems.
 */
function OverallProgress({
    totalQuestions,
    totalSolved,
    acceptanceRate,
    primaryColor = "rgba(34,211,238,1)",
    secondaryColor = "rgba(209,213,219,1)"
}: Props) {

    const [showAcceptance, setShowAcceptance] = useState(false);

    const radius = 55;
    const circumference = 2 * Math.PI * radius
    // Calculate progress based on solved / total available questions
    // Make sure we handle 0 to avoid NaNs
    const percentage = totalQuestions > 0 ? (totalSolved / totalQuestions) * 100 : 0;
    const offset = circumference * ((100 - percentage)/100)

    const formattedAcceptance = acceptanceRate.toFixed(1);

    return (
        <svg
            id="circular_progress_container"
            onMouseOver={() => setShowAcceptance(true)}
            onMouseOut={() => setShowAcceptance(false)} 
            viewBox="0 0 160 160" 
            style={{transform:"rotate(-90deg)"}}
            className="h-[160px] w-[160px] cursor-pointer transition-transform duration-500 ease-out hover:scale-110" // Added hover scale and transition
        >
            <circle id="base_circle" r={radius} cx="80" cy="80" 
                fill="transparent" 
                stroke="#374151" // gray-700
                strokeWidth="8px" 
                opacity={0.5}
            />
            <circle 
                id="progress_circle"
                r={radius} cx="80" cy="80" 
                fill="transparent" stroke={"rgb(202,138,4)"} // yellow-600 default
                strokeWidth="8px" 
                strokeDasharray={circumference} 
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="text-yellow-500"
            >
               <animate attributeName="stroke-dashoffset" from={circumference} to={offset} dur="1.5s" fill="freeze" />
            </circle>

            {/* Solved State Group */}
            <g className={`transition-opacity duration-500 ease-in-out ${showAcceptance ? "opacity-0" : "opacity-100"}`}>
                <text
                    x="50%" y="50%" 
                    fill={primaryColor} 
                    fontSize="32px" 
                    textAnchor="middle" 
                    dy="10px"
                    fontWeight="bold"
                    style={{transform:"rotate(90deg) translate(0, -160px)"}}
                >   
                    {totalSolved}
                </text>
                <text
                    x="50%" y="50%"
                    dy="30px"
                    fill={secondaryColor} 
                    fontSize="12px" 
                    textAnchor="middle"
                    style={{transform:"rotate(90deg) translate(0, -160px)"}}
                >   
                    Solved
                </text>
            </g>

            {/* Acceptance State Group */}
            <g className={`transition-opacity duration-500 ease-in-out ${showAcceptance ? "opacity-100" : "opacity-0"}`}>
                <text
                    x="50%" y="50%" 
                    fill={primaryColor} 
                    fontSize="18px" 
                    textAnchor="middle" 
                    dy="-5px"
                    fontWeight="bold"
                    style={{transform:"rotate(90deg) translate(0, -160px)"}}
                >   
                    {formattedAcceptance}%
                </text>
                <text
                    x="50%" y="50%"
                    dy="15px"
                    fill={secondaryColor} 
                    fontSize="12px" 
                    textAnchor="middle"
                    style={{transform:"rotate(90deg) translate(0, -160px)"}}
                >   
                    Acceptance
                </text>
            </g>
        </svg>
    )
}

export default OverallProgress