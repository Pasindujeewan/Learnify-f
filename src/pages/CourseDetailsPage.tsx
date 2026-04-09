import { motion, AnimatePresence } from "framer-motion";
import { enrollToCourse } from "../api/studentService/enrollToCourse";
import {
  FaStar,
  FaClock,
  FaUser,
  FaTag,
  FaGlobe,
  FaSun,
  FaMoon,
  FaPlayCircle,
} from "react-icons/fa";
import type { Course } from "../types/courseType";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const levelColors: Record<string, { bg: string; text: string }> = {
  Beginner: {
    bg: "bg-emerald-100 dark:bg-emerald-900/40",
    text: "text-emerald-700 dark:text-emerald-300",
  },
  Intermediate: {
    bg: "bg-amber-100 dark:bg-amber-900/40",
    text: "text-amber-700 dark:text-amber-300",
  },
  Advanced: {
    bg: "bg-rose-100 dark:bg-rose-900/40",
    text: "text-rose-700 dark:text-rose-300",
  },
};

export default function CourseDetailsPage() {
  const location = useLocation();
  const course = location.state as Course;
  const [dark, setDark] = useState(false);

  const handleOnclick = async () => {
    const courseId = course.course_id;
    if (!courseId) {
      console.error("Course ID is missing");
      return;
    }
    const res = await enrollToCourse(courseId);
    console.log(res);
  };

  const levelStyle = levelColors[course.level] ?? {
    bg: "bg-slate-100 dark:bg-slate-800",
    text: "text-slate-600 dark:text-slate-300",
  };

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 dark:bg-[#0f1117] transition-colors duration-300 font-sans">
        {/* Dark mode toggle */}
        <div className="max-w-5xl mx-auto px-4 pt-5 flex justify-end">
          <button
            onClick={() => setDark(!dark)}
            className="p-2.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all text-slate-500 dark:text-amber-300"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={dark ? "moon" : "sun"}
                initial={{ rotate: -30, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 30, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="block"
              >
                {dark ? <FaMoon size={15} /> : <FaSun size={15} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        <div className="max-w-5xl mx-auto px-4 pb-16 pt-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Hero Image Card */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl mb-8 group">
              <img
                src={course.imageUrl}
                alt={course.title}
                className="w-full h-[340px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Floating info on image */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${levelStyle.bg} ${levelStyle.text}`}
                  >
                    {course.level}
                  </span>
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/15 text-white backdrop-blur-sm flex items-center gap-1.5">
                    <FaTag size={9} /> {course.category}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight drop-shadow">
                  {course.title}
                </h1>
              </div>

              {/* Play button */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/20 backdrop-blur-md rounded-full p-4">
                  <FaPlayCircle size={40} className="text-white" />
                </div>
              </div>
            </div>

            {/* Main content grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* LEFT: Description + instructor */}
              <div className="md:col-span-2 space-y-6">
                {/* Instructor */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-semibold text-sm shadow">
                    {course.instructorName?.charAt(0) ?? "?"}
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      Instructor
                    </p>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                      {course.instructorName}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-slate-200 dark:bg-slate-700/60" />

                {/* Description */}
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
                    About this course
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 text-[15px] leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    {
                      icon: <FaClock size={13} />,
                      label: "Duration",
                      value: `${course.duration} hrs`,
                    },
                    {
                      icon: <FaGlobe size={13} />,
                      label: "Language",
                      value: course.language,
                    },
                    {
                      icon: <FaStar size={13} className="text-amber-400" />,
                      label: "Rating",
                      value: String(course.rating),
                    },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-white dark:bg-slate-800/70 rounded-xl border border-slate-100 dark:border-slate-700/50 p-3.5 flex flex-col gap-1.5 shadow-sm"
                    >
                      <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500">
                        {stat.icon}
                        <span className="text-[11px] font-medium uppercase tracking-wider">
                          {stat.label}
                        </span>
                      </div>
                      <p className="text-slate-800 dark:text-slate-100 font-semibold text-sm">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT: Enrollment card */}
              <div className="md:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15, duration: 0.45 }}
                  className="sticky top-6 bg-white dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/50 rounded-2xl shadow-sm p-6 space-y-5 backdrop-blur-sm"
                >
                  {/* Price */}
                  <div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mb-0.5">
                      Price
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-slate-900 dark:text-white">
                        ${course.price}
                      </span>
                      <span className="text-slate-400 text-sm dark:text-slate-500">
                        USD
                      </span>
                    </div>
                  </div>

                  {/* Rating visual */}
                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar
                        key={i}
                        size={14}
                        className={
                          i < Math.round(course.rating)
                            ? "text-amber-400"
                            : "text-slate-200 dark:text-slate-600"
                        }
                      />
                    ))}
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300 ml-1">
                      {course.rating}
                    </span>
                  </div>

                  <div className="h-px bg-slate-100 dark:bg-slate-700/60" />

                  {/* Quick info */}
                  <div className="space-y-2.5 text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <FaClock size={12} className="text-slate-400" />
                      <span>{course.duration} hours of content</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaGlobe size={12} className="text-slate-400" />
                      <span>{course.language}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaUser size={12} className="text-slate-400" />
                      <span>{course.instructorName}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <motion.button
                    onClick={handleOnclick}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-md shadow-indigo-200 dark:shadow-indigo-900/30 transition-colors text-sm tracking-wide"
                  >
                    Enroll Now
                  </motion.button>

                  <p className="text-center text-[11px] text-slate-400 dark:text-slate-500">
                    30-day money-back guarantee
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
