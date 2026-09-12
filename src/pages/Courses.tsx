import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getCourses } from "../services/courseService";
import type { Course } from "../types";
import { useToast } from "../hooks/useToast";
import { CourseFiltersSidebar } from "../features/courses/CourseFiltersSidebar";
import { CourseSearchAndSort } from "../features/courses/CourseSearchAndSort";
import { CourseGrid } from "../features/courses/CourseGrid";

export function Courses() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";

  const [search, setSearch] = useState(initialSearch);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("");
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const updateViewport = () => setIsMobile(window.innerWidth < 768);
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        if (page > 1) setIsLoadingMore(true);
        const res = await getCourses(6, search, activeFilters, page, sortOption);
        setCourses((prev) => (page === 1 ? res.items : [...(prev || []), ...res.items]));
        setHasMore(res.pagination ? res.pagination.hasMore : false);
      } catch {
        toast.error("Unable to load courses right now.", "Course loading failed");
        setCourses([]);
      } finally {
        setIsLoadingMore(false);
      }
    };
    fetchCourses();
  }, [activeFilters, search, sortOption, page, toast]);

  const handleToggleFilter = (option: string) => {
    setPage(1);
    setActiveFilters((prev) =>
      prev.includes(option) ? prev.filter((f) => f !== option) : [...prev, option],
    );
  };

  const handleRemoveFilter = (option: string) => {
    setPage(1);
    setActiveFilters((prev) => prev.filter((f) => f !== option));
  };

  const handleClearAllFilters = () => {
    setPage(1);
    setActiveFilters([]);
  };

  const handleSearchChange = (value: string) => {
    setPage(1);
    setSearch(value);
  };

  const handleSortChange = (value: string) => {
    setPage(1);
    setSortOption(value);
  };

  return (
    <div className="flex relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gap-6 py-8">
      <CourseFiltersSidebar
        activeFilters={activeFilters}
        onToggleFilter={handleToggleFilter}
        isMobile={isMobile}
        isOpen={isFilterOpen}
        onToggleOpen={setIsFilterOpen}
      />

      <section className="flex-1 min-w-0 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 flex flex-col gap-6">
        <CourseSearchAndSort
          search={search}
          onSearchChange={handleSearchChange}
          sortOption={sortOption}
          onSortChange={handleSortChange}
          activeFilters={activeFilters}
          onRemoveFilter={handleRemoveFilter}
          onClearAllFilters={handleClearAllFilters}
        />

        <hr className="border-gray-100 dark:border-slate-800" />

        <CourseGrid
          courses={courses}
          hasMore={hasMore}
          isLoadingMore={isLoadingMore}
          onLoadMore={() => setPage((prev) => prev + 1)}
        />
      </section>
    </div>
  );
}

export default Courses;
