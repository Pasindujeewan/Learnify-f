import type { Course } from "../../types";
import { CourseCard } from "./CourseCard";

interface CourseGridProps {
  courses: Course[] | null;
  hasMore: boolean;
  onLoadMore: () => void;
  isLoadingMore?: boolean;
}

export function CourseGrid({ courses, hasMore, onLoadMore, isLoadingMore }: CourseGridProps) {
  if (courses === null) {
    return (
      <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="aspect-[4/5] rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
          />
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 px-6 py-16 text-center">
        <p className="text-base font-semibold text-slate-700 dark:text-slate-300">
          No courses match your current search and filters.
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Try clearing some filters or searching for different keywords.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.course_id} course={course} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-4">
          <button
            type="button"
            onClick={onLoadMore}
            disabled={isLoadingMore}
            className="px-6 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 text-sm font-semibold text-gray-700 dark:text-slate-200 bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 active:scale-98 transition cursor-pointer disabled:opacity-50"
          >
            {isLoadingMore ? "Loading..." : "Load More Courses"}
          </button>
        </div>
      )}
    </div>
  );
}
