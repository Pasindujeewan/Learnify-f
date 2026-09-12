import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Circle, Loader2 } from "lucide-react";
import { LessonReader } from "../components/LessonReader";
import {
  completeLesson,
  getStudentCourseLessons,
} from "../services/lessonService";
import { getCourse } from "../services/courseService";
import { useToast } from "../hooks/useToast";
import type { Course, CourseProgress, Lesson } from "../types";

export function LessonLearningPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [progress, setProgress] = useState<CourseProgress | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadLearningPage() {
      if (!id) return;

      try {
        setIsLoading(true);
        const [courseData, lessonData] = await Promise.all([
          getCourse(id),
          getStudentCourseLessons(id),
        ]);

        setCourse(courseData);
        setLessons(lessonData.lessons);
        setProgress(lessonData.progress);
        setSelectedLessonId(lessonData.lessons[0]?.lesson_id || null);
      } catch {
        toast.error("Please enroll and sign in to open lessons.", "Lessons unavailable");
        navigate(`/courses/${id}`, { replace: true });
      } finally {
        setIsLoading(false);
      }
    }

    loadLearningPage();
  }, [id, navigate, toast]);

  const selectedLesson = useMemo(
    () => lessons.find((lesson) => lesson.lesson_id === selectedLessonId) || lessons[0],
    [lessons, selectedLessonId],
  );

  const completedCount =
    progress?.completedCount || lessons.filter((lesson) => lesson.completed).length;
  const totalLessons = progress?.totalLessons || lessons.length;
  const progressPercent =
    progress?.progress ||
    (totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0);

  const handleComplete = async (lessonId: string) => {
    try {
      const data = await completeLesson(lessonId);
      setLessons((currentLessons) =>
        currentLessons.map((l) =>
          l.lesson_id === lessonId ? { ...l, completed: true } : l,
        ),
      );
      setProgress((prev) =>
        prev
          ? {
              ...prev,
              completedCount: data.completedCount,
              totalLessons: data.totalLessons,
              courseCompleted: data.courseCompleted,
              progress: data.progress,
            }
          : {
              courseId: id || "",
              completedCount: data.completedCount,
              totalLessons: data.totalLessons,
              courseCompleted: data.courseCompleted,
              progress: data.progress,
            },
      );
      toast.success("Lesson marked as complete!", "Progress Saved");
    } catch {
      toast.error("Could not record progress.", "Error");
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center gap-3 text-slate-500">
        <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
        <span className="text-sm font-medium">Loading course lessons...</span>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Top bar */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <span className="text-slate-300 dark:text-slate-700">/</span>
          <h1 className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-md">
            {course?.title || "Learning Workspace"}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs font-semibold text-slate-900 dark:text-white">
              {completedCount} / {totalLessons} Lessons ({progressPercent}%)
            </p>
            <div className="mt-1 h-2 w-36 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main learning workspace */}
      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        {/* Sidebar curriculum list */}
        <aside className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm h-fit max-h-[calc(100vh-180px)] overflow-y-auto">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 px-2">
            Course Content
          </h2>
          <div className="space-y-1">
            {lessons.map((lesson) => {
              const isSelected = lesson.lesson_id === selectedLesson?.lesson_id;
              return (
                <button
                  key={lesson.lesson_id}
                  type="button"
                  onClick={() => setSelectedLessonId(lesson.lesson_id)}
                  className={`w-full flex items-center justify-between gap-3 p-3 rounded-xl text-left text-xs font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-blue-50 dark:bg-indigo-950/60 text-blue-700 dark:text-indigo-300 font-semibold"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {lesson.completed ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    ) : (
                      <Circle className="h-4 w-4 text-slate-400 shrink-0" />
                    )}
                    <span className="truncate">{lesson.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0">
                    {lesson.estimatedMinutes}m
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Lesson reader panel */}
        <section className="min-w-0">
          {selectedLesson ? (
            <LessonReader lesson={selectedLesson} onComplete={handleComplete} />
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-12 text-center text-sm text-slate-500">
              No lesson selected. Choose a lesson from the list to start learning.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default LessonLearningPage;
