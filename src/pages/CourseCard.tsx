import React from "react";
import { motion } from "framer-motion";
import { FiClock, FiStar, FiCheckCircle, FiPlay } from "react-icons/fi";
import type { StudentCourseType } from "../types/courseType";

export interface CourseCardProps {
  course: StudentCourseType;
  index?: number;
  onClick?: (course: StudentCourseType) => void;
}

function formatDuration(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  index = 0,
  onClick,
}) => {
  const done = course.status === "completed";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.07 }}
      whileHover={{ y: -3 }}
      onClick={() => onClick?.(course)}
      className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm cursor-pointer group"
    >
      {/* Thumbnail */}
      <div className="relative h-36 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span
          className={`absolute top-2.5 right-2.5 flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full ${
            done
              ? "bg-emerald-500 text-white"
              : "bg-white text-slate-700 shadow"
          }`}
        >
          {done ? (
            <FiCheckCircle className="w-3 h-3" />
          ) : (
            <FiPlay className="w-3 h-3" />
          )}
          {done ? "Completed" : "In Progress"}
        </span>
      </div>

      {/* Body */}
      <div className="p-4">
        <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
          {course.category}
        </span>
        <h3 className="mt-2 font-bold text-slate-800 text-sm leading-snug line-clamp-2">
          {course.title}
        </h3>
        <p className="mt-1 text-xs text-slate-400 truncate">
          {course.instructor}
        </p>

        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <FiStar className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="font-semibold text-slate-700">
              {course.rating}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <FiClock className="w-3.5 h-3.5" />
            <span>{formatDuration(course.duration)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
