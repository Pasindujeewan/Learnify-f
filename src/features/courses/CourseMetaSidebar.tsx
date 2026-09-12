import { motion } from "framer-motion";
import { User, BookOpen, BarChart2, Clock, Globe } from "lucide-react";
import type { FullCourseType } from "../../types";

interface CourseMetaSidebarProps {
  course: FullCourseType;
}

export function CourseMetaSidebar({ course }: CourseMetaSidebarProps) {
  const duration = Number(course.duration) || 0;

  const items = [
    { icon: User, label: "Instructor", value: course.instructorName || course.instructor || "Instructor" },
    { icon: BookOpen, label: "Category", value: course.category },
    { icon: BarChart2, label: "Level", value: course.level },
    { icon: Clock, label: "Duration", value: `${duration} hours` },
    { icon: Globe, label: "Language", value: course.language },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 shadow-sm"
    >
      <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
        Course Details
      </h2>
      <ul className="divide-y divide-gray-50 dark:divide-gray-800">
        {items.map(({ icon: Icon, label, value }) => (
          <li key={label} className="flex items-center gap-3 py-2.5">
            <Icon className="w-4 h-4 text-gray-400 dark:text-gray-500 shrink-0" />
            <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
            <span className="ml-auto text-sm font-medium text-gray-800 dark:text-gray-100 text-right truncate">
              {value}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
