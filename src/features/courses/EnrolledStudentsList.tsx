import { motion } from "framer-motion";
import { Users, BookMarked } from "lucide-react";
import type { EnrolledStudentShort } from "../../types";
import { getInitials } from "../../utils/initials";

const AVATAR_COLORS = [
  { light: "bg-violet-100 text-violet-700", dark: "dark:bg-violet-900/60 dark:text-violet-200" },
  { light: "bg-teal-100 text-teal-700", dark: "dark:bg-teal-900/60 dark:text-teal-200" },
  { light: "bg-orange-100 text-orange-700", dark: "dark:bg-orange-900/60 dark:text-orange-200" },
  { light: "bg-blue-100 text-blue-700", dark: "dark:bg-blue-900/60 dark:text-blue-200" },
  { light: "bg-pink-100 text-pink-700", dark: "dark:bg-pink-900/60 dark:text-pink-200" },
  { light: "bg-emerald-100 text-emerald-700", dark: "dark:bg-emerald-900/60 dark:text-emerald-200" },
];

interface EnrolledStudentsListProps {
  students: EnrolledStudentShort[];
}

export function EnrolledStudentsList({ students }: EnrolledStudentsListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 sm:p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-50">
            Enrolled Students
          </h2>
        </div>
        <span className="bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold px-3 py-1 rounded-full">
          {students.length} total
        </span>
      </div>

      {students.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-400 dark:text-gray-500 gap-2 border border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
          <BookMarked className="w-8 h-8 opacity-60" />
          <p className="text-sm">No students enrolled yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {students.map((student, i) => {
            const color = AVATAR_COLORS[i % AVATAR_COLORS.length];
            return (
              <div
                key={student.userId}
                className="border border-gray-100 dark:border-gray-800 rounded-xl p-3 flex items-center gap-3 hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-sm transition-all bg-gray-50/50 dark:bg-gray-950/40"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0 overflow-hidden ${color.light} ${color.dark}`}
                >
                  {student.avatar ? (
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    getInitials(student.name)
                  )}
                </div>
                <div className="overflow-hidden min-w-0">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">
                    {student.name}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 truncate">
                    {student.email}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
