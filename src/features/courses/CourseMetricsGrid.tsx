import { motion } from "framer-motion";
import { Users, Clock, Star, Award } from "lucide-react";
import type { FullCourseType } from "../../types";

interface CourseMetricsGridProps {
  course: FullCourseType;
}

export function CourseMetricsGrid({ course }: CourseMetricsGridProps) {
  const rating = Number(course.rating) || 0;
  const duration = Number(course.duration) || 0;
  const enrolledCount = course.enrolledstudents?.length || 0;

  const metrics = [
    {
      icon: Users,
      label: "Enrolled Students",
      value: enrolledCount,
      color: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30",
    },
    {
      icon: Clock,
      label: "Total Duration",
      value: `${duration}h`,
      color: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30",
    },
    {
      icon: Star,
      label: "Course Rating",
      value: rating.toFixed(1),
      color: "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30",
    },
    {
      icon: Award,
      label: "Difficulty Level",
      value: course.level,
      color: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 shadow-sm"
    >
      <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
        Key Metrics
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {metrics.map(({ icon: Icon, label, value, color }) => (
          <div
            key={label}
            className="bg-gray-50 dark:bg-gray-800/70 border border-gray-100 dark:border-gray-800 rounded-xl p-3.5 flex flex-col gap-1.5"
          >
            <div className="flex items-center justify-between">
              <span className={`p-1.5 rounded-lg ${color}`}>
                <Icon className="w-4 h-4" />
              </span>
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-gray-50">
              {value}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
