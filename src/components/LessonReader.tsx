import { useState } from "react";
import type { UIEvent } from "react";
import { CheckCircle2, Clock, FileText } from "lucide-react";
import type { Lesson } from "../types/lessonType";

type Props = {
  lesson: Lesson;
  onComplete: (lessonId: string) => Promise<void>;
};

export function LessonReader({ lesson, onComplete }: Props) {
  const [completedLessonIds, setCompletedLessonIds] = useState<Set<string>>(
    () => new Set(),
  );
  const [completingLessonId, setCompletingLessonId] = useState<string | null>(null);
  const localCompleted =
    Boolean(lesson.completed) || completedLessonIds.has(lesson.lesson_id);
  const isCompleting = completingLessonId === lesson.lesson_id;

  const handleScroll = async (event: UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    // Students complete text lessons by reaching the bottom of the reading panel.
    const reachedBottom =
      target.scrollTop + target.clientHeight >= target.scrollHeight - 16;

    if (!reachedBottom || localCompleted || isCompleting) {
      return;
    }

    setCompletingLessonId(lesson.lesson_id);
    try {
      await onComplete(lesson.lesson_id);
      setCompletedLessonIds((currentIds) => {
        const nextIds = new Set(currentIds);
        nextIds.add(lesson.lesson_id);
        return nextIds;
      });
    } finally {
      setCompletingLessonId(null);
    }
  };

  return (
    <section className="rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-3 border-b border-slate-100 p-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600">
            <FileText size={15} />
            Lesson {lesson.order}
          </p>
          <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
            {lesson.title}
          </h3>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1">
            <Clock size={14} />
            {lesson.estimatedMinutes} min
          </span>
          {localCompleted && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
              <CheckCircle2 size={14} />
              Complete
            </span>
          )}
        </div>
      </div>

      <div
        onScroll={handleScroll}
        className="max-h-[420px] overflow-y-auto p-5 text-sm leading-8 text-slate-700 dark:text-slate-300"
      >
        {/* The minimum height guarantees even short dummy lessons can be scrolled. */}
        <div className="min-h-[520px]">
          <p className="whitespace-pre-line">{lesson.content}</p>
          <div className="mt-8 rounded-lg bg-slate-50 p-4 text-xs leading-6 text-slate-500 dark:bg-slate-950">
            Take your time with this lesson. When you reach the final note at the
            bottom, your progress will be saved automatically.
          </div>
        </div>
        <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-center text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-950">
          {localCompleted
            ? "Lesson completed. You can continue to the next lesson."
            : "You reached the end. This lesson will be marked complete."}
        </div>
      </div>
    </section>
  );
}
