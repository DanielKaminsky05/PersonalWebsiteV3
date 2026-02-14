import academicData from "@/data/academic.json";

interface Course {
  code: string;
  name: string;
  units: number;
  grade: number | null;
  average: number | null;
}

interface YearRecord {
  year: string;
  term: string;
  courses: Course[];
  honors?: string[];
}

interface ChartDataPoint {
  year: string;
  yearLabel: string;
  userCumulativeAvg: number;
  classCumulativeAvg: number;
  courses: Course[]; // For the details view
  term: string;
}

export function calculateStats(): ChartDataPoint[] {
  let totalUserPoints = 0;
  let totalClassPoints = 0;
  let totalUnits = 0;
  
  const chartData: ChartDataPoint[] = [];

  const records = academicData.academicRecord as YearRecord[];

  // Helper to determine semester
  const getSemester = (code: string): 'Fall' | 'Winter' => {
      const suffix = code.slice(-1).toUpperCase();
      // Ends in A or F -> Fall
      if (['A', 'F'].includes(suffix)) return 'Fall';
      // Ends in B, G, E, or anything else/number -> Winter
      return 'Winter';
  };

  // Process each year
  records.forEach((record, yearIdx) => {
    const yearNum = yearIdx + 1;
    const courses = record.courses.filter(c => c.grade !== null && c.grade !== undefined);
    
    if (courses.length === 0) return;

    // Group by semester
    const fallCourses = courses.filter(c => getSemester(c.code) === 'Fall');
    const winterCourses = courses.filter(c => getSemester(c.code) === 'Winter');

    // Process Fall
    if (fallCourses.length > 0) {
        fallCourses.forEach(course => {
             if (course.grade === null || course.average === null) return;
             const weight = course.units;
             totalUserPoints += course.grade * weight;
             totalClassPoints += course.average * weight;
             totalUnits += weight;
        });
        
        if (totalUnits > 0) {
             chartData.push({
                year: `Year ${yearNum}`,
                yearLabel: `${yearNum}F`, // 1F, 2F, etc.
                userCumulativeAvg: parseFloat((totalUserPoints / totalUnits).toFixed(1)),
                classCumulativeAvg: parseFloat((totalClassPoints / totalUnits).toFixed(1)),
                courses: fallCourses,
                term: 'Fall'
            });
        }
    }

    // Process Winter
    // Note: Winter includes previous Fall plus this Winter
    if (winterCourses.length > 0) {
        winterCourses.forEach(course => {
             if (course.grade === null || course.average === null) return;
             const weight = course.units;
             totalUserPoints += course.grade * weight;
             totalClassPoints += course.average * weight;
             totalUnits += weight;
        });

         if (totalUnits > 0) {
             chartData.push({
                year: `Year ${yearNum}`,
                yearLabel: `${yearNum}W`, // 1W, 2W
                userCumulativeAvg: parseFloat((totalUserPoints / totalUnits).toFixed(1)),
                classCumulativeAvg: parseFloat((totalClassPoints / totalUnits).toFixed(1)),
                courses: winterCourses,
                term: 'Winter'
            });
        }
    }
  });

  return chartData;
}
