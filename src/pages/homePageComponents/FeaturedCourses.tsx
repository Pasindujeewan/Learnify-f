import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getCourses } from "../../api/getCourses";
import type { Course } from "../../types/courseType";
import CourseCard from "../../components/CourseCard";

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

  useEffect(() => {
    async function fetchFeaturedCourses() {
      try {
        const courses = await getCourses();
        setFeaturedCourses(courses);
      } catch (error) {
        console.error("Error fetching featured courses:", error);
      }
    }
    fetchFeaturedCourses();
  }, []);

  return (
    <section className="bg-white dark:bg-[#1b1b1f] min-h-screen py-16 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex flex-col items-center text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-500 dark:text-blue-400 mb-3">
            Top Picks
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Featured Courses
          </h2>
          <p className="text-gray-500 dark:text-slate-400 max-w-md text-sm sm:text-base">
            Explore our top-rated courses and enhance your skills with industry
            experts.
          </p>
          <div className="mt-4 w-12 h-1 rounded-full bg-blue-500 dark:bg-blue-400" />
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {featuredCourses?.map((course) => (
            <motion.div
              key={course.id}
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
