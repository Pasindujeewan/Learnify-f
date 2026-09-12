import { BookOpen, FileText, Users, Star } from "lucide-react";
import type { InstructorProfileType } from "../../types";

interface InstructorStatsGridProps {
  instructor: InstructorProfileType;
  totalLessons: number;
  totalStudents: number;
}

export function InstructorStatsGrid({
  instructor,
  totalLessons,
  totalStudents,
}: InstructorStatsGridProps) {
  const stats = [
    { label: "Created Courses", value: instructor.courses?.length || 0, icon: BookOpen },
    { label: "Total Lessons", value: totalLessons, icon: FileText },
    { label: "Total Students", value: totalStudents, icon: Users },
    { label: "Instructor Rating", value: instructor.rating ?? "N/A", icon: Star },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {stats.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
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
