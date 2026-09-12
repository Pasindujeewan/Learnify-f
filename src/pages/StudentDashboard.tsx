import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { getStudentCourseProgress } from "../services/lessonService";
import { useToast } from "../hooks/useToast";
import type { CourseProgress, StudentProfileType } from "../types";
import { StudentStatsGrid } from "../features/dashboard/StudentStatsGrid";

interface StudentDashboardProps {
  student: StudentProfileType;
}

export function StudentDashboard({ student }: StudentDashboardProps) {
  const toast = useToast();
  const [progressByCourse, setProgressByCourse] = useState<
    Record<string, CourseProgress>
  >({});

  useEffect(() => {
    async function loadProgress() {
      const courses = student.courses || [];
      if (courses.length === 0) return;

      try {
        const progressList = await Promise.all(
          courses.map((course) => getStudentCourseProgress(course.course_id)),
        );

        setProgressByCourse(
          progressList.reduce<Record<string, CourseProgress>>((acc, item) => {
            acc[item.courseId] = item;
            return acc;
          }, {}),
        );
      } catch {
        toast.info("Lesson progress will update after you open a course.", "Progress");
      }
    }

    loadProgress();
  }, [student.courses, toast]);

  const dashboardStats = useMemo(() => {
    const courses = student.courses || [];
    const completedCourses = courses.filter((course) => {
      const progress = progressByCourse[course.course_id];
      return progress?.courseCompleted || course.status === "completed";
    }).length;

    const totalLessons = Object.values(progressByCourse).reduce(
      (sum, item) => sum + item.totalLessons,
      0,
    );
    const completedLessons = Object.values(progressByCourse).reduce(
      (sum, item) => sum + item.completedCount,
      0,
    );

    return {
      coursesCount: courses.length,
      completedCourses,
      activeCourses: Math.max(courses.length - completedCourses, 0),
      completedLessons,
      totalLessons,
    };
  }, [progressByCourse, student.courses]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Student Profile Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
        <div className="flex items-center gap-4">
          {student.avatar ? (
            <img
              src={student.avatar}
              alt={student.name}
              className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-500"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow">
              {student.name?.charAt(0) || "S"}
            </div>
          )}

          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-indigo-400">
              Student Dashboard
            </span>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
              {student.name}
            </h1>
            <p className="text-xs text-slate-500">{student.email}</p>
            <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mt-1">
              {student.education_level || "Active Learner"}
            </p>
          </div>
        </div>

        <Link
          to="/courses"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition"
        >
          <GraduationCap size={18} />
          Browse More Courses
        </Link>
      </div>

      {/* Stats Grid */}
      <StudentStatsGrid stats={dashboardStats} />

      {/* Enrolled Courses Section */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            My Enrolled Courses
          </h2>
          <span className="text-xs font-medium text-slate-500">
            Scroll lessons to the bottom to mark them complete
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {student.courses && student.courses.length > 0 ? (
            student.courses.map((course) => {
              const progress = progressByCourse[course.course_id];
              const progressValue = progress?.progress ?? 0;
              const completedCount = progress?.completedCount ?? 0;
              const totalLessons = progress?.totalLessons ?? 0;

              return (
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

                    <h3 className="line-clamp-2 text-base font-bold text-slate-900 dark:text-white">
                      {course.title}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      Instructor: {course.instructorName || course.instructor}
                    </p>

                    <div className="mt-5">
                      <div className="flex justify-between text-xs text-slate-500 font-medium">
                        <span>{completedCount} of {totalLessons} lessons completed</span>
                        <span>{progressValue}%</span>
                      </div>
                      <div className="mt-2 h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                          style={{ width: `${progressValue}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/courses/${course.course_id}/learn`}
                    state={course}
                    className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 dark:bg-white px-4 py-2.5 text-sm font-semibold text-white dark:text-slate-900 shadow-sm transition hover:opacity-90"
                  >
                    Continue Learning →
                  </Link>
                </div>
              );
            })
          ) : (
            <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white dark:bg-slate-900 dark:border-slate-800 p-12 text-center text-sm text-slate-500">
              You haven't enrolled in any courses yet.{" "}
              <Link to="/courses" className="text-blue-600 font-semibold underline ml-1">
                Explore catalog
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
