"use client";

import { ArrowUp, ArrowDown } from "lucide-react";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { calculateStats } from "@/utils/calculateStats";
import { motion, AnimatePresence } from "motion/react";

interface Course {
  code: string;
  name: string;
  units: number;
  grade: number | null;
  average: number | null;
}

interface ChartDataPoint {
  year: string;
  userCumulativeAvg: number;
  classCumulativeAvg: number;
  courses: Course[];
  term: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    // payload[0] is first Line (Class Avg), payload[1] is second Line (User Avg)
    return (
      <div className="bg-black/80 backdrop-blur-md border border-white/10 p-2 rounded-lg shadow-xl pointer-events-none">
        <p className="font-bold text-gray-200 mb-1 text-xs">{payload[0].payload.year} {payload[0].payload.term}</p>
        <div className="space-y-0.5">
          <p className="text-blue-400 text-xs">
            My Avg: <span className="font-mono font-bold text-white">{payload[1]?.value}%</span>
          </p>
          <p className="text-gray-400 text-xs">
            Class Avg: <span className="font-mono font-bold text-gray-200">{payload[0]?.value}%</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default function AcademicStats() {
  const [data, setData] = useState<ChartDataPoint[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const stats = calculateStats();
    const formattedStats = stats.map((point, index) => ({
      ...point,
      index: index // Add explicit index
    }));
    setData(formattedStats);
    if (formattedStats.length > 0) {
      setSelectedIndex(formattedStats.length - 1);
    }
  }, []);

  const selectedYearData = selectedIndex !== null ? data[selectedIndex] : null;

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 h-[720px] flex flex-col">
        {/* Top: Chart */}
        <div className="flex-1 flex flex-col justify-center outline-none [&_.recharts-surface]:outline-none [&_.recharts-cartesian-grid]:outline-none" tabIndex={-1}>
            <h3 className="text-base font-semibold text-gray-200 mb-2 ml-2">Cumulative Average</h3>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    onClick={(e) => {
                        if (e && e.activePayload && e.activePayload.length > 0) {
                          // Use the payload's index property we added
                          const idx = e.activePayload[0].payload.index;
                          if (typeof idx === 'number') {
                              setSelectedIndex(idx);
                          }
                        } else if (e && e.activeTooltipIndex !== undefined) {
                            // Fallback to activeTooltipIndex if available
                            setSelectedIndex(Number(e.activeTooltipIndex));
                        }
                    }}
                    className="cursor-pointer outline-none focus:outline-none academic-chart"
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis 
                        dataKey="yearLabel" 
                        stroke="#666" 
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                        stroke="#666" 
                        tickLine={false}
                        axisLine={false}
                        domain={[70, 100]} 
                        unit="%"
                        tick={{ fontSize: 12 }}
                        width={40}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }} />
                    
                    
                    <Line 
                        name="Class Average"
                        type="linear" 
                        dataKey="classCumulativeAvg" 
                        stroke="#6b7280" 
                        strokeWidth={1} 
                        dot={{ fill: '#6b7280', r: 4, strokeWidth: 0 }}
                        activeDot={{ r: 6, stroke: 'white', strokeWidth: 2 }}
                        strokeDasharray="5 5"
                        isAnimationActive={false}
                    />
                    
                    <Line 
                        name="My Average"
                        type="linear" 
                        dataKey="userCumulativeAvg" 
                        stroke="#3b82f6" 
                        strokeWidth={1} 
                        dot={{ fill: '#3b82f6', r: 6, strokeWidth: 2, stroke: '#1e3a8a' }}
                        activeDot={{ r: 8, stroke: 'white', strokeWidth: 2 }}
                        isAnimationActive={false} 
                    />
                  
                </LineChart>
            </ResponsiveContainer>
            <p className="text-center text-gray-500 text-sm mt-4">Click on a year point to view details</p>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 my-4" />

        {/* Bottom: Details Panel */}
        <div className="flex-1 overflow-hidden flex flex-col">
            <AnimatePresence mode="wait">
                {selectedYearData ? (
                    <motion.div 
                        key={selectedYearData.yearLabel}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="h-full flex flex-col"
                    >
                        <div className="grid grid-cols-[1fr_auto_auto] gap-4 items-end px-2 mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-gray-200">{selectedYearData.year} {selectedYearData.term}</h3>
                                <p className="text-gray-500 text-xs">{selectedYearData.yearLabel}</p>
                            </div>
                            <div className="text-xs text-gray-500 font-mono text-center w-[80px]">My Mark</div>
                            <div className="text-xs text-gray-500 font-mono text-right w-13">Class Avg</div>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                            <div className="space-y-1">
                                {[...selectedYearData.courses]
                                    .sort((a, b) => (b.grade || 0) - (a.grade || 0))
                                    .map((course: any) => {
                                    const showTrend = course.grade !== null && course.average !== null;
                                    const isHigher = showTrend && course.grade >= course.average;
                                    const diff = showTrend ? course.grade - course.average : 0;
                                    
                                    // Determine color based on difference
                                    let textColor = 'text-gray-400';
                                    if (showTrend) {
                                        if (diff < 0) textColor = 'text-red-400';
                                        else if (diff >= 20) textColor = 'text-green-500'; // Darker green for big difference
                                        else if (diff >= 10) textColor = 'text-green-400';
                                        else textColor = 'text-green-300';
                                    }

                                    return (
                                        <div key={course.code} className="grid grid-cols-[1fr_auto_auto] gap-4 items-center py-2 border-b border-white/5 last:border-0 hover:bg-white/5 px-2 rounded-lg transition-colors">
                                            <div className="min-w-0">
                                                <h4 className="font-medium text-gray-300 text-sm truncate" title={course.name}>{course.code}</h4>
                                                <p className="text-xs text-gray-500 truncate">{course.name}</p>
                                            </div>
                                            
                                            <div className="flex items-center justify-end gap-1 w-[80px]">
                                                <div className={`text-sm font-bold ${textColor}`}>
                                                    {course.grade !== null ? `${course.grade}%` : '-'}
                                                </div>

                                                <div className="w-4 flex justify-center">
                                                    {showTrend ? (
                                                        isHigher ? (
                                                            <ArrowUp className={`w-4 h-4 ${textColor}`} />
                                                        ) : (
                                                            <ArrowDown className="w-4 h-4 text-red-400" />
                                                        )
                                                    ) : (
                                                        <span className="w-4 h-4 block"></span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="text-sm font-mono text-gray-400 text-right w-13">
                                                {course.average !== null ? `${course.average}%` : '-'}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <div className="h-full flex items-center justify-center text-gray-500 text-center text-sm">
                        <p>Select a semester to view details</p>
                    </div>
                )}
            </AnimatePresence>
        </div>
    </div>
  );
}
