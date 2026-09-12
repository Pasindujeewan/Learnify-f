import { useState } from "react";
import { motion } from "framer-motion";
import { FiChevronDown, FiChevronUp, FiChevronLeft, FiChevronRight } from "react-icons/fi";

export interface FilterGroup {
  name: string;
  options: string[];
}

export const COURSE_FILTERS: FilterGroup[] = [
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

interface CourseFiltersSidebarProps {
  activeFilters: string[];
  onToggleFilter: (option: string) => void;
  isMobile: boolean;
  isOpen: boolean;
  onToggleOpen: (open: boolean) => void;
}

export function CourseFiltersSidebar({
  activeFilters,
  onToggleFilter,
  isMobile,
  isOpen,
  onToggleOpen,
}: CourseFiltersSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "Level",
    "Category",
    "Language",
    "Duration",
    "Price",
  ]);

  const toggleSection = (name: string) => {
    setExpandedSections((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name],
    );
  };

  return (
    <>
      {/* Mobile Toggle Handle */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: isOpen ? 255 : 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden fixed top-16 left-0 p-2 z-30 bg-white dark:bg-slate-800 rounded-r-2xl shadow-lg dark:shadow-slate-900/50 cursor-pointer"
      >
        {isOpen ? (
          <FiChevronLeft
            className="text-2xl text-gray-600 dark:text-slate-400"
            onClick={() => onToggleOpen(false)}
          />
        ) : (
          <FiChevronRight
            className="text-2xl text-gray-600 dark:text-slate-400"
            onClick={() => onToggleOpen(true)}
          />
        )}
      </motion.div>

      {/* Filter Sidebar Drawer / Container */}
      <motion.aside
        initial={{ x: isMobile ? -260 : 0 }}
        animate={{
          x: isMobile ? (isOpen ? 0 : -260) : 0,
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
          shrink-0
        "
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-semibold text-gray-800 dark:text-slate-100">
            Filter Courses
          </h2>
          {activeFilters.length > 0 && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 font-medium">
              {activeFilters.length} active
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2 max-h-[calc(100vh-140px)] md:max-h-none overflow-y-auto pr-1">
          {COURSE_FILTERS.map((filter) => (
            <div key={filter.name}>
              <button
                type="button"
                className="w-full text-sm font-medium text-gray-700 dark:text-slate-300 mb-1 flex items-center justify-between cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                onClick={() => toggleSection(filter.name)}
              >
                <span>{filter.name}</span>
                <span className="text-gray-400 dark:text-slate-500">
                  {expandedSections.includes(filter.name) ? (
                    <FiChevronUp />
                  ) : (
                    <FiChevronDown />
                  )}
                </span>
              </button>

              {expandedSections.includes(filter.name) && (
                <div className="flex flex-col gap-2 pl-4 pb-2">
                  {filter.options.map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-blue-600 dark:accent-indigo-500 rounded cursor-pointer"
                        checked={activeFilters.includes(option)}
                        onChange={() => onToggleFilter(option)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              )}
              <hr className="border-gray-100 dark:border-slate-800 my-1" />
            </div>
          ))}
        </div>
      </motion.aside>
    </>
  );
}
