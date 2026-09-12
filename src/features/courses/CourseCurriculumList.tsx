import type { Lesson } from "../../types";

interface CourseCurriculumListProps {
  lessons: Lesson[];
}

export function CourseCurriculumList({ lessons }: CourseCurriculumListProps) {
  if (lessons.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-200 dark:border-gray-800 p-8 text-center text-sm text-gray-500 dark:text-gray-400">
        No lessons added to this course yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {lessons.map((lesson) => (
        <div
          key={lesson.lesson_id}
          className="rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-950/70 p-4 transition-colors hover:border-gray-200 dark:hover:border-gray-700"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-indigo-400">
                Lesson {lesson.order}
              </p>
              <h3 className="mt-1 text-sm font-bold text-gray-900 dark:text-white">
                {lesson.title}
              </h3>
            </div>
            <span className="rounded-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 px-2.5 py-1 text-xs font-medium text-gray-600 dark:text-gray-300">
              {lesson.estimatedMinutes} min
            </span>
          </div>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
            {lesson.content}
          </p>
        </div>
      ))}
    </div>
  );
}
