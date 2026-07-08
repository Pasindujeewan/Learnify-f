import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Circle, Loader2 } from "lucide-react";
import { LessonReader } from "../components/LessonReader";
import {
  completeLesson,
  getStudentCourseLessons,
} from "../api/lessonService";
import { getCourse } from "../api/getCourses";
import { useToast } from "../hook/toastHook";
import type { Course } from "../types/courseType";
import type { CourseProgress, Lesson } from "../types/lessonType";

export function LessonLearningPage() {
  const { id } = useParams();
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
        // Load course metadata and student-specific lesson progress together.
        const [courseData, lessonData] = await Promise.all([
          getCourse(id),
          getStudentCourseLessons(id),
        ]);

        setCourse(courseData);
        setLessons(lessonData.lessons);
        setProgress(lessonData.progress);
        setSelectedLessonId(lessonData.lessons[0]?.lesson_id || null);
      } catch {
        toast.error("Please enroll and login as a student to open lessons.", "Lessons unavailable");
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

  const handleLessonComplete = async (lessonId: string) => {
    try {
      const result = await completeLesson(lessonId);
      // Keep the sidebar status instant after the backend marks the lesson complete.
      const updatedLessons = lessons.map((lesson) =>
        lesson.lesson_id === lessonId ? { ...lesson, completed: true } : lesson,
      );
      const currentIndex = updatedLessons.findIndex(
        (lesson) => lesson.lesson_id === lessonId,
      );
      const nextLessonId =
        updatedLessons.slice(currentIndex + 1).find((lesson) => !lesson.completed)
          ?.lesson_id || null;

      setLessons(updatedLessons);

      setProgress({
        courseId: result.lesson.course_id,
        completedCount: result.completedCount,
        totalLessons: result.totalLessons,
        courseCompleted: result.courseCompleted,
        progress: result.progress,
      });

      if (result.courseCompleted) {
        toast.success("All lessons are complete. This course is finished.", "Course complete");
      } else {
        toast.success("Lesson complete. Keep going.", "Progress saved");
        // Move students forward naturally after finishing the current lesson.
        if (nextLessonId) {
          setSelectedLessonId(nextLessonId);
        }
      }
    } catch {
      toast.error("Your lesson progress could not be saved.", "Progress failed");
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-500 dark:bg-slate-950">
        <Loader2 className="mr-2 animate-spin" size={20} />
        Loading lessons...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link
              to={`/courses/${id}`}
              state={course}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-blue-600"
            >
              <ArrowLeft size={15} />
              Back to course
            </Link>
            <h1 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
              {course?.title || "Course lessons"}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Complete each lesson by scrolling to the end.
            </p>
          </div>
          <div className="min-w-64">
            <div className="flex justify-between text-xs text-slate-500">
              <span>{completedCount}/{totalLessons} lessons complete</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-slate-200 dark:bg-slate-800">
              <div
                className="h-2 rounded-full bg-emerald-600"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto grid max-w-7xl gap-5 px-4 py-6 lg:grid-cols-[320px_1fr]">
        <aside className="h-fit rounded-lg border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:sticky lg:top-24">
          <p className="px-2 pb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Lesson navigation
          </p>
          <div className="space-y-2">
            {lessons.map((lesson) => (
              <button
                key={lesson.lesson_id}
                onClick={() => setSelectedLessonId(lesson.lesson_id)}
                className={`flex w-full items-start gap-3 rounded-lg border px-3 py-3 text-left transition ${
                  selectedLesson?.lesson_id === lesson.lesson_id
                    ? "border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/40"
                    : "border-slate-100 bg-slate-50 hover:border-slate-200 dark:border-slate-800 dark:bg-slate-950"
                }`}
              >
                {lesson.completed ? (
                  <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" size={18} />
                ) : (
                  <Circle className="mt-0.5 shrink-0 text-slate-400" size={18} />
                )}
                <span>
                  <span className="block text-sm font-semibold text-slate-900 dark:text-white">
                    {lesson.order}. {lesson.title}
                  </span>
                  <span className="mt-1 block text-xs text-slate-500">
                    {lesson.completed ? "Completed" : `${lesson.estimatedMinutes} min`}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </aside>

        <section>
          {selectedLesson ? (
            <LessonReader lesson={selectedLesson} onComplete={handleLessonComplete} />
          ) : (
            <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900">
              No lessons are available for this course yet.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
