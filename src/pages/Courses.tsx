import { useEffect, useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { FiChevronLeft, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { motion } from "framer-motion";

import CourseCard from "../components/CourseCard";
import { useSearchParams } from "react-router-dom";
import { getCourses } from "../api/getCourses";
import type { Course } from "../types/courseType";

const filters = [
  {
    name: "Level",
    options: ["Beginner", "Intermediate", "Advanced"],
  },
  {
    name: "Category",
    options: ["Programming", "Design", "Marketing", "Business"],
  },
  {
    name: "Language",
    options: ["English", "Spanish", "French", "German"],
  },
  {
    name: "Duration",
    options: [
      "Less than 1 hour",
      "1-3 hours",
      "3-6 hours",
      "More than 6 hours",
    ],
  },
  {
    name: "Price",
    options: ["Free", "Paid"],
  },
];

export function Courses() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search");
  const [search, setSearch] = useState(query || "");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showSubFilters, setShowSubFilters] = useState<string[]>([
    "Level",
    "Category",
    "Language",
    "Duration",
    "Price",
  ]);
  const [activeFilter, setActiveFilter] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("");
  const [courses, setCourses] = useState<Course[] | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      const courses = await getCourses();
      setCourses(courses);
    };
    fetchCourses();
  }, []);

  function toggleSubFilters(filterName: string) {
    if (showSubFilters.includes(filterName)) {
      setShowSubFilters(showSubFilters.filter((f) => f !== filterName));
    } else {
      setShowSubFilters([...showSubFilters, filterName]);
    }
  }

  const toggleFilter = (value: string) => {
    setActiveFilter((prev) =>
      prev.includes(value) ? prev.filter((f) => f !== value) : [...prev, value],
    );
  };

  const visibleCourses = useMemo(() => {
    if (!courses) return [];
    let result = [...courses];

    if (activeFilter.length > 0) {
      result = result.filter(
        (c) =>
          activeFilter.includes(c.level) ||
          activeFilter.includes(c.category) ||
          activeFilter.includes(c.language) ||
          (activeFilter.includes("Free") && c.price === 0) ||
          (activeFilter.includes("Paid") && c.price > 0),
      );
    }

    if (sortOption === "Popular") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === "Newest") {
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [courses, activeFilter, sortOption]);

  return (
    <div className="flex relative  md:px-10 px-2 gap-2 py-5 dark:bg-slate-700">
      {/* filters toggle button */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: isFilterOpen ? 255 : 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden mb-5 fixed top-16 left-0 p-2 z-10 bg-white dark:bg-slate-800 rounded-r-2xl shadow-lg dark:shadow-slate-900/50"
      >
        {isFilterOpen ? (
          <FiChevronLeft
            className="text-2xl cursor-pointer text-gray-600 dark:text-slate-400"
            onClick={() => setIsFilterOpen(false)}
          />
        ) : (
          <FiChevronRight
            className="text-2xl cursor-pointer text-gray-600 dark:text-slate-400"
            onClick={() => setIsFilterOpen(true)}
          />
        )}
      </motion.div>

      {/* filter section */}
      <motion.div
        initial={{ x: window.innerWidth < 768 ? -260 : 0 }}
        animate={{
          x: window.innerWidth < 768 ? (isFilterOpen ? 0 : -260) : 0,
        }}
        transition={{ duration: 0.3 }}
        className="
          bg-white dark:bg-slate-900 rounded-2xl p-6
          fixed md:static
          top-0 left-0
          h-full md:h-auto
          w-64 md:w-72
          z-20
          shadow-sm border border-gray-100 dark:border-slate-800
        "
      >
        <h2 className="text-base font-semibold text-gray-800 dark:text-slate-100 mb-6">
          Filter Courses
        </h2>
        <div className="flex flex-col gap-2 h-screen overflow-y-auto">
          {filters.map((filter) => (
            <div key={filter.name}>
              <h5
                className="text-sm font-medium text-gray-600 dark:text-slate-400 mb-1 flex items-center justify-between cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                onClick={() => toggleSubFilters(filter.name)}
              >
                {filter.name}
                <span className="ml-2 text-gray-400 dark:text-slate-500">
                  {showSubFilters.includes(filter.name) ? (
                    <FiChevronUp />
                  ) : (
                    <FiChevronDown />
                  )}
                </span>
              </h5>
              {showSubFilters.includes(filter.name) && (
                <div className="flex flex-col gap-2 pl-4 pb-2">
                  {filter.options.map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-green-500 dark:accent-indigo-400 rounded"
                        checked={activeFilter.includes(option)}
                        onChange={() => toggleFilter(option)}
                      />
                      <span className="text-sm text-gray-600 dark:text-slate-400">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              )}
              <hr className="border-gray-100 dark:border-slate-800 my-1" />
            </div>
          ))}
        </div>
      </motion.div>

      {/* courses section */}
      <div className="flex-3 bg-white dark:bg-slate-900 rounded-2xl md:p-5 p-2 shadow-sm border border-gray-100 dark:border-slate-800">
        <div className="flex md:flex-row justify-evenly items-center gap-3 w-full">
          {/* Search */}
          <div className="relative w-full flex-1">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search courses..."
              className="pl-10 pr-3 md:w-[50%] py-2.5 rounded-lg border border-gray-200 dark:border-slate-700
                text-gray-700 dark:text-slate-200 text-sm bg-gray-50 dark:bg-slate-800
                placeholder-gray-400 dark:placeholder-slate-500
                focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-700 transition"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 text-sm" />
          </div>

          {/* Sort */}
          <select
            className="py-2.5 px-3 w-20 md:w-35 rounded-lg border border-gray-200 dark:border-slate-700
              text-sm text-gray-700 dark:text-slate-200 bg-gray-50 dark:bg-slate-800
              focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-indigo-500 transition"
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort</option>
            <option value="Popular">Popular</option>
            <option value="Newest">Newest</option>
            <option value="Highest Rated">Highest Rated</option>
          </select>
        </div>

        <hr className="my-6 border-gray-100 dark:border-slate-800" />

        <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-5 items-center justify-center">
          {visibleCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}
