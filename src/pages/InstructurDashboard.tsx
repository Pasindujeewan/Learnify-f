import type { instructorProfileType } from "../types/instructorType";
import CreateCourseForm from "./instructorDashboardComponents/InstructorAddCourse";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, FileText, Plus, Star, Users } from "lucide-react";
import { getInstructorCourseLessons } from "../api/lessonService";
import type { Lesson } from "../types/lessonType";

type Props = {
  instructor: instructorProfileType;
};

export default function InstructorDashboard({ instructor }: Props) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [lessonsByCourse, setLessonsByCourse] = useState<Record<string, Lesson[]>>({});

  const toggleCreateForm = () => {
    setShowCreateForm((prev) => !prev);
  };

  useEffect(() => {
    async function loadLessonCounts() {
      // Lesson counts are shown on course cards without loading full course pages.
      const lessonEntries = await Promise.all(
        instructor.courses.map(async (course) => {
          try {
            const lessons = await getInstructorCourseLessons(course.course_id);
            return [course.course_id, lessons] as const;
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
      instructor.courses.reduce(
        (sum, course) => sum + (course.enrolledStudents || 0),
        0,
      ),
    [instructor.courses],
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 dark:bg-slate-950 sm:p-6">
      {showCreateForm && (
        <div className="absolute z-20 ">
          <CreateCourseForm
            onClose={setShowCreateForm}
            isOpen={showCreateForm}
          />
        </div>
      )}

      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          {instructor.avatar ? (
            <img
              src={instructor.avatar}
              className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-500"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
              {instructor.name?.charAt(0)}
            </div>
          )}

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              Instructor dashboard
            </p>
            <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
              {instructor.name}
            </h2>
            <p className="text-sm text-slate-500">{instructor.email}</p>
            <p className="mt-1 text-sm text-blue-600">
              {Array.isArray(instructor.expertise)
                ? instructor.expertise.join(", ")
                : instructor.expertise || "Course creator"}
            </p>
          </div>
        </div>

        <button
          onClick={toggleCreateForm}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus size={17} />
          Create Course
        </button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Courses", value: instructor.courses.length, icon: BookOpen },
          { label: "Lessons", value: totalLessons, icon: FileText },
          { label: "Students", value: totalStudents, icon: Users },
          { label: "Rating", value: instructor.rating ?? "N/A", icon: Star },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <stat.icon className="text-blue-600" size={20} />
            <p className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
          My courses
        </h3>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {instructor.courses.length ? (
            instructor.courses.map((course) => (
              <div
                key={course.course_id}
                className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <img
                  src={course.imageUrl || "/placeholder.jpg"}
                  alt={course.title}
                  className="aspect-video w-full rounded-lg object-cover"
                />
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <h4 className="line-clamp-2 text-base font-bold text-slate-900 dark:text-white">
                      {course.title}
                    </h4>
                    <p className="mt-1 text-xs text-slate-500">
                      {course.category} / {course.level}
                    </p>
                  </div>
                  <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                    {lessonsByCourse[course.course_id]?.length || 0} lessons
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-950">
                    <p className="text-slate-500">Students</p>
                    <p className="mt-1 font-bold text-slate-900 dark:text-white">
                      {course.enrolledStudents || 0}
                    </p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-950">
                    <p className="text-slate-500">Rating</p>
                    <p className="mt-1 font-bold text-slate-900 dark:text-white">
                      {course.rating || "N/A"}
                    </p>
                  </div>
                </div>
                <Link
                  to={`/instructor/courses/${course.course_id}`}
                  className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900"
                >
                  Manage lessons
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900">
              No courses created yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
