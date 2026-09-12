import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import type { FullCourseType, Lesson } from "../types";
import { getFullCourse } from "../services/instructorService";
import { getInstructorCourseLessons } from "../services/lessonService";
import { useToast } from "../hooks/useToast";
import { CourseHeroBanner } from "../features/courses/CourseHeroBanner";
import { CourseMetaSidebar } from "../features/courses/CourseMetaSidebar";
import { CourseMetricsGrid } from "../features/courses/CourseMetricsGrid";
import { EnrolledStudentsList } from "../features/courses/EnrolledStudentsList";
import { CourseCurriculumList } from "../features/courses/CourseCurriculumList";
import { AddLessonForm } from "../features/dashboard/AddLessonForm";

export function FullCourseDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<FullCourseType | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    if (!id) return;

    const loadCourseData = async () => {
      try {
        setLoading(true);
        const courseData = await getFullCourse(id);
        if (!courseData) throw new Error("Course not found");

        setCourse(courseData);
        const lessonData = await getInstructorCourseLessons(id);
        setLessons(lessonData?.items || []);
      } catch {
        setError("Failed to load course details.");
        toast.error("Instructor course details could not be loaded.", "Error");
      } finally {
        setLoading(false);
      }
    };

    loadCourseData();
  }, [id, toast]);

  const handleLessonAdded = (newLesson: Lesson) => {
    setLessons((prev) => [...prev, newLesson]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] gap-3 text-gray-500">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
        <span className="text-sm font-medium">Loading course workspace...</span>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] px-4">
        <div className="text-red-600 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-2xl p-6 text-center max-w-md">
          <p className="font-semibold">{error || "Course not found"}</p>
        </div>
      </div>
    );
  }

  const totalLessonMinutes = lessons.reduce(
    (sum, l) => sum + (Number(l.estimatedMinutes) || 0),
    0,
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Banner */}
      <CourseHeroBanner course={course} />

      {/* Info & Stats Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CourseMetaSidebar course={course} />
        <CourseMetricsGrid course={course} />
      </div>

      {/* Enrolled Students Section */}
      <EnrolledStudentsList students={course.enrolledstudents || []} />

      {/* Lessons & Add Lesson Form */}
      <section className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Course Curriculum
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {lessons.length} lessons • ~{totalLessonMinutes} minutes total
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <CourseCurriculumList lessons={lessons} />
          {id && <AddLessonForm courseId={id} onLessonAdded={handleLessonAdded} />}
        </div>
      </section>
    </div>
  );
}

export default FullCourseDetailsPage;
