import { useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { FiChevronLeft, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { motion } from "framer-motion";
import { courses } from "../temtData/Courses";
import CourseCard from "../components/CourseCard";

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
  const [isFilterOpen, setIsFilterOpen] = useState(false); // for mobile filter toggle
  const [showSubFilters, setShowSubFilters] = useState<string[]>([
    "Level",
    "Category",
    "Language",
    "Duration",
    "Price",
  ]); // to manage sub-filter visibility
  const [activeFilter, setActiveFilter] = useState<string[]>([]); // to store selected filters
  const [sortOption, setSortOption] = useState(""); // to store selected sort option
  // to store filtered and sorted courses

  // sub-filter toggle handler
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
    let result = [...courses];

    // filter
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

    // sort
    if (sortOption === "Popular") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === "Newest") {
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [courses, activeFilter, sortOption]);
  return (
    <div className="flex mt-5 md:px-10 px-2 gap-2 ">
      {/* filters toggle button */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: isFilterOpen ? 255 : 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden mb-5 absolute top-15 left-0 p-2 z-30 bg-white rounded-r-2xl shadow-lg"
      >
        {isFilterOpen ? (
          <FiChevronLeft
            className="text-2xl cursor-pointer"
            onClick={() => setIsFilterOpen(false)}
          />
        ) : (
          <FiChevronRight
            className="text-2xl cursor-pointer"
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
    bg-white rounded-2xl p-10
    fixed md:static
    top-0 left-0
    h-full md:h-auto
    w-64
    z-20 md:w-90
  "
      >
        <h2 className="text-lg font-semibold mb-10">Filter Courses</h2>
        <div className="flex flex-col gap-3 h-screen  overflow-y-auto">
          {filters.map((filter) => (
            <div key={filter.name}>
              <h5
                className="text-lg text-gray-500 mb-2 flex items-center justify-between cursor-pointer px-5 py-2"
                onClick={() => toggleSubFilters(filter.name)}
              >
                {filter.name}
                <span className="ml-2  ">
                  {showSubFilters.includes(filter.name) ? (
                    <FiChevronUp className="" />
                  ) : (
                    <FiChevronDown />
                  )}
                </span>
              </h5>
              {showSubFilters.includes(filter.name) && (
                <div className="flex flex-col gap-7 pl-10">
                  {filter.options.map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-500 rounded"
                        checked={activeFilter.includes(option)}
                        onChange={() => toggleFilter(option)}
                      />
                      <span className="text-sm">{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
      {/* courses section */}
      <div className="flex-3  bg-white rounded-2xl md:p-5 p-2">
        <div className="flex  md:flex-row justify-evenly items-center gap-3 w-full ">
          {/* Search */}
          <div className="relative w-full flex-1">
            <input
              type="text"
              placeholder="Search courses..."
              className=" pl-10 pr-3 md:w-[50%]  py-2.5 rounded-lg border border-gray-300
          text-gray-700 text-sm14+
          focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          </div>

          {/* Sort */}
          <select
            className="py-2.5 px-3 w-20 md:w-35 rounded-lg border border-gray-300
        text-sm text-gray-700
        focus:outline-none focus:ring-2 focus:ring-blue-500 transitio "
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort</option>
            <option value="Popular">Popular</option>
            <option value="Newest">Newest</option>
            <option value="Highest Rated">Highest Rated</option>
          </select>
        </div>

        <hr className="my-8 border-gray-500 dark:border-gray-500" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 items-center justify-center">
          {visibleCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}
