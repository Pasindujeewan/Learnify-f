import { motion } from "framer-motion";
import { Tag, Globe, Clock, Star, DollarSign } from "lucide-react";
import type { FullCourseType } from "../../types";

interface CourseHeroBannerProps {
  course: FullCourseType;
}

export function CourseHeroBanner({ course }: CourseHeroBannerProps) {
  const rating = Number(course.rating) || 0;
  const duration = Number(course.duration) || 0;
  const price = Number(course.price) || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 sm:p-6 shadow-sm"
    >
      <div className="flex flex-col sm:flex-row gap-5 sm:gap-6">
        <div className="relative shrink-0 self-start">
          <img
            src={course.imageUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600"}
            alt={course.title}
            className="w-full sm:w-56 h-44 sm:h-36 object-cover rounded-xl border border-gray-100 dark:border-gray-800"
          />
          <span className="absolute top-2 left-2 bg-blue-600/90 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm backdrop-blur">
            {course.level}
          </span>
        </div>

        <div className="flex-1 space-y-3">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50 leading-snug">
            {course.title}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            {course.description}
          </p>

          <div className="flex gap-2 flex-wrap pt-1">
            <span className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-medium px-2.5 py-1 rounded-full">
              <Tag className="w-3.5 h-3.5" /> {course.category}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-purple-50 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-xs font-medium px-2.5 py-1 rounded-full">
              <Globe className="w-3.5 h-3.5" /> {course.language}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-amber-50 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-xs font-medium px-2.5 py-1 rounded-full">
              <Clock className="w-3.5 h-3.5" /> {duration}h
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 bg-gray-50 dark:bg-gray-800/60 rounded-xl px-4 py-2.5 mt-2">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                {rating.toFixed(1)}
              </span>
            </div>
            <div className="w-px h-4 bg-gray-200 dark:bg-gray-700" />
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              <span className="text-base font-semibold text-gray-900 dark:text-gray-50">
                {price > 0 ? `$${price.toFixed(2)}` : "Free"}
              </span>
            </div>
            <div className="w-px h-4 bg-gray-200 dark:bg-gray-700 hidden sm:block" />
            <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
              Instructor: {course.instructorName || course.instructor}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
