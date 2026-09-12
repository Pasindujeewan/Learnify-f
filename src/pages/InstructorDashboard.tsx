import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import type { InstructorProfileType, Lesson } from "../types";
import { getInstructorCourseLessons } from "../services/lessonService";
import { CreateCourseModal } from "../features/dashboard/CreateCourseModal";
import { InstructorStatsGrid } from "../features/dashboard/InstructorStatsGrid";

interface InstructorDashboardProps {
  instructor: InstructorProfileType;
}

export function InstructorDashboard({ instructor }: InstructorDashboardProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [lessonsByCourse, setLessonsByCourse] = useState<Record<string, Lesson[]>>({});

  useEffect(() => {
    async function loadLessonCounts() {
      if (!instructor.courses?.length) return;

      const lessonEntries = await Promise.all(
        instructor.courses.map(async (course) => {
          try {
            const lessons = await getInstructorCourseLessons(course.course_id);
            return [course.course_id, lessons || []] as const;
          } catch {
            return [course.course_id, []] as const;
          }
        }),
      );

      setLessonsByCourse(Object.fromEntries(lessonEntries));
    }

    loadLessonCounts();
  }, [instructor.courses]);

  const totalLessons = useMemo(
    () =>
      Object.values(lessonsByCourse).reduce(
        (sum, lessons) => sum + lessons.length,
        0,
      ),
    [lessonsByCourse],
  );

  const totalStudents = useMemo(
    () =>
      (instructor.courses || []).reduce(
        (sum, course) => sum + (course.enrolledStudents || 0),
        0,
      ),
    [instructor.courses],
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Create Course Modal */}
      <CreateCourseModal
        isOpen={showCreateForm}
        onClose={setShowCreateForm}
      />

      {/* Header Profile Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
        <div className="flex items-center gap-4">
          {instructor.avatar ? (
            <img
              src={instructor.avatar}
              alt={instructor.name}
              className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-500"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow">
              {instructor.name?.charAt(0) || "I"}
            </div>
          )}

          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-indigo-400">
              Instructor Dashboard
            </span>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
              {instructor.name}
            </h1>
            <p className="text-xs text-slate-500">{instructor.email}</p>
            <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mt-1">
              {Array.isArray(instructor.expertise)
                ? instructor.expertise.join(", ")
                : instructor.expertise || "Online Course Educator"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowCreateForm(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition cursor-pointer"
        >
          <Plus size={18} />
          Create Course
        </button>
      </div>

      {/* Stats Grid */}
      <InstructorStatsGrid
        instructor={instructor}
        totalLessons={totalLessons}
        totalStudents={totalStudents}
      />

      {/* Courses Catalog Section */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            My Published Courses
          </h2>
          <span className="text-xs font-medium text-slate-500">
            {instructor.courses?.length || 0} total courses
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {instructor.courses && instructor.courses.length > 0 ? (
            instructor.courses.map((course) => (
              <div
                key={course.course_id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-4">
                    <img
                      src={course.imageUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600"}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="line-clamp-2 text-base font-bold text-slate-900 dark:text-white">
                        {course.title}
                      </h3>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {course.category} • {course.level}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                      {lessonsByCourse[course.course_id]?.length || 0} lessons
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                    <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3">
                      <p className="text-slate-400">Enrolled Students</p>
                      <p className="mt-1 font-bold text-slate-900 dark:text-white text-sm">
                        {course.enrolledStudents || 0}
                      </p>
                    </div>
                    <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3">
                      <p className="text-slate-400">Rating</p>
                      <p className="mt-1 font-bold text-slate-900 dark:text-white text-sm">
                        {course.rating ? Number(course.rating).toFixed(1) : "New"}
                      </p>
                    </div>
                  </div>
                </div>

                <Link
                  to={`/instructor/courses/${course.course_id}`}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 dark:bg-white px-4 py-2.5 text-sm font-semibold text-white dark:text-slate-900 shadow-sm transition hover:opacity-90"
                >
                  Manage Curriculum & Students →
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white dark:bg-slate-900 dark:border-slate-800 p-12 text-center text-sm text-slate-500">
              You haven't published any courses yet. Click "Create Course" above to begin!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InstructorDashboard;
