import { BookOpenCheck, CheckCircle2, Clock, GraduationCap } from "lucide-react";

export interface StudentDashboardStats {
  coursesCount: number;
  completedCourses: number;
  activeCourses: number;
  completedLessons: number;
  totalLessons: number;
}

interface StudentStatsGridProps {
  stats: StudentDashboardStats;
}

export function StudentStatsGrid({ stats }: StudentStatsGridProps) {
  const items = [
    { label: "Enrolled Courses", value: stats.coursesCount, icon: BookOpenCheck, color: "text-blue-600 bg-blue-50 dark:bg-blue-900/30" },
    { label: "Completed Courses", value: stats.completedCourses, icon: CheckCircle2, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30" },
    { label: "In Progress", value: stats.activeCourses, icon: Clock, color: "text-amber-600 bg-amber-50 dark:bg-amber-900/30" },
    {
      label: "Lessons Completed",
      value: `${stats.completedLessons} / ${stats.totalLessons}`,
      icon: GraduationCap,
      color: "text-purple-600 bg-purple-50 dark:bg-purple-900/30",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {items.map(({ label, value, icon: Icon, color }) => (
        <div
          key={label}
          className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm"
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
            <Icon size={20} />
          </div>
          <p className="mt-3 text-2xl font-extrabold text-slate-900 dark:text-white">
            {value}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{label}</p>
        </div>
      ))}
    </div>
  );
}
