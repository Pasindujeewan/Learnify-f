import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getCourses } from "../../api/getCourses";
import type { Course } from "../../types/courseType";
import CourseCard from "../../components/CourseCard";
import { ArrowRight, BookOpenCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../hook/toastHook";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function FeaturedCourses() {
  const [featuredCourses, setFeaturedCourses] = useState<Course[] | null>(null);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    async function loadFeaturedCourses() {
      try {
        const courses = await getCourses(6);
        setFeaturedCourses(courses.items);
      } catch {
        setFeaturedCourses([]);
        toast.error(
          "Featured courses could not be loaded.",
          "Courses unavailable",
        );
      }
    }

    loadFeaturedCourses();
  }, [toast]);

  return (
    <section className="bg-slate-50 px-4 py-20 transition-colors duration-300 dark:bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <span className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
              <BookOpenCheck size={15} />
              Featured learning
            </span>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              Popular courses to start with
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400">
              Browse practical courses designed for skill growth, portfolio
              work, and guided progress from beginner to advanced levels.
            </p>
          </div>
          <button
            onClick={() => navigate("/courses")}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-blue-200 hover:text-blue-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
          >
            View all courses
            <ArrowRight size={17} />
          </button>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {!featuredCourses &&
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-80 animate-pulse rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
              />
            ))}

          {featuredCourses?.length === 0 && (
            <div className="col-span-full rounded-lg border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900">
              Courses will appear here after instructors publish them.
            </div>
          )}

          {featuredCourses?.map((course) => (
            <motion.div
              key={course.course_id}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
