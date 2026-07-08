import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpenCheck, CheckCircle2, Clock, GraduationCap } from "lucide-react";
import { getStudentCourseProgress } from "../api/lessonService";
import { useToast } from "../hook/toastHook";
import type { CourseProgress } from "../types/lessonType";
import type { StudentProfileType } from "../types/StudentType";

type Props = {
  student: Partial<StudentProfileType>;
};

export default function StudentDashboard({ student }: Props) {
  const toast = useToast();
  const [progressByCourse, setProgressByCourse] = useState<
    Record<string, CourseProgress>
  >({});

  useEffect(() => {
    async function loadProgress() {
      const courses = student.courses || [];
      if (courses.length === 0) return;

      try {
        // Load each enrolled course's lesson progress for dashboard cards.
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
        toast.info("Lesson progress will update after you open a course.", "Progress unavailable");
      }
    }

    loadProgress();
  }, [student.courses, toast]);

  const dashboardStats = useMemo(() => {
    const courses = student.courses || [];
    // Course completion is derived from lesson completion when progress exists.
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
    <div className="min-h-screen bg-slate-50 p-4 dark:bg-slate-950 sm:p-6">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-x-5">
          <img
            src={student.avatar || "/avatar.png"}
            alt="avatar"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              Student dashboard
            </p>
            <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
              {student.name}
            </h2>
            <p className="text-sm text-slate-500">{student.email}</p>
            <p className="mt-1 text-sm text-blue-600">
              {student.education_level || "Self-paced learner"}
            </p>
          </div>
        </div>
          <Link
            to="/courses"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <GraduationCap size={17} />
            Browse more courses
          </Link>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Enrolled courses", value: dashboardStats.coursesCount, icon: BookOpenCheck },
          { label: "Completed courses", value: dashboardStats.completedCourses, icon: CheckCircle2 },
          { label: "Active courses", value: dashboardStats.activeCourses, icon: Clock },
          {
            label: "Lessons complete",
            value: `${dashboardStats.completedLessons}/${dashboardStats.totalLessons}`,
            icon: GraduationCap,
          },
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
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            My learning
          </h3>
          <span className="text-xs text-slate-500">
            Scroll lessons to the end to mark them complete
          </span>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {student.courses?.length ? (
            student.courses.map((course) => {
              const progress = progressByCourse[course.course_id];
              const progressValue = progress?.progress ?? 0;
              const completedCount = progress?.completedCount ?? 0;
              const totalLessons = progress?.totalLessons ?? 0;

              return (
              <div
                key={course.course_id}
                className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <img
                  src={course.imageUrl || "/placeholder.jpg"}
                  alt={course.title}
                  className="w-full aspect-video object-cover rounded-lg"
                />

                <h4 className="mt-3 line-clamp-2 text-base font-bold text-slate-900 dark:text-white">
                  {course.title}
                </h4>

                <p className="mt-1 text-xs text-slate-500">
                  {course.instructorName}
                </p>

                <div className="mt-4">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>{completedCount}/{totalLessons} lessons</span>
                    <span>{progressValue}%</span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800">
                    <div
                      className="h-2 rounded-full bg-emerald-600"
                      style={{ width: `${progressValue}%` }}
                    />
                  </div>
                </div>

                <Link
                  to={`/courses/${course.course_id}/learn`}
                  state={course}
                  className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900"
                >
                  {progress?.courseCompleted ? "Review course" : "Continue lessons"}
                </Link>
              </div>
            );
            })
          ) : (
            <div className="col-span-full rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900">
              No courses enrolled yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
