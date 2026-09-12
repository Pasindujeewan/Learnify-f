import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import type { Course, Lesson, Comment } from "../types";
import { getCourse, getCourseComments, enrollToCourse } from "../services/courseService";
import { getPublicCourseLessons } from "../services/lessonService";
import { useToast } from "../hooks/useToast";
import { CourseDetailHero } from "../features/courses/CourseDetailHero";
import { CoursePricingCard } from "../features/courses/CoursePricingCard";
import { CourseContentTabs } from "../features/courses/CourseContentTabs";
import { CourseRateModal } from "../features/courses/CourseRateModal";

export default function CourseDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const toast = useToast();

  const [course, setCourse] = useState<Course | null>(
    (location.state as Course) || null,
  );
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(!course);

  useEffect(() => {
    if (!id) return;

    async function loadData() {
      try {
        if (!course) {
          setIsLoading(true);
          const courseData = await getCourse(id!);
          setCourse(courseData);
        }

        const [commentsData, lessonsData] = await Promise.all([
          getCourseComments(id!),
          getPublicCourseLessons(id!).catch(() => ({ items: [] })),
        ]);

        setComments(commentsData || []);
        setLessons(lessonsData?.items || []);
      } catch {
        toast.error("Unable to load course details.", "Error");
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [id, course, toast]);

  // Check enrollment from session
  useEffect(() => {
    if (!course) return;
    try {
      const user = sessionStorage.getItem("user");
      if (user) {
        const parsed = JSON.parse(user);
        if (parsed?.courses?.some((c: { course_id: string }) => c.course_id === course.course_id)) {
          setIsEnrolled(true);
        }
      }
    } catch {
      // Ignore session read error
    }
  }, [course]);

  const handleEnroll = async () => {
    if (!course) return;
    const user = sessionStorage.getItem("user");
    if (!user) {
      toast.info("Please login to enroll in courses.", "Authentication required");
      navigate("/login", { state: { returnTo: `/courses/${course.course_id}` } });
      return;
    }

    try {
      setIsEnrolling(true);
      await enrollToCourse(course.course_id);
      setIsEnrolled(true);
      toast.success("You are now enrolled in this course!", "Success");
      navigate(`/courses/${course.course_id}/learn`);
    } catch {
      toast.error("Failed to complete enrollment. Please try again.", "Enrollment failed");
    } finally {
      setIsEnrolling(false);
    }
  };

  const refreshComments = async () => {
    if (!id) return;
    const freshComments = await getCourseComments(id);
    setComments(freshComments);
  };

  if (isLoading || !course) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-400">
        <p className="text-sm font-medium">Loading course information...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <CourseDetailHero course={course} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CourseContentTabs
              course={course}
              lessons={lessons}
              comments={comments}
              onRefreshComments={refreshComments}
            />
          </div>

          <aside className="lg:col-span-1">
            <CoursePricingCard
              course={course}
              isEnrolled={isEnrolled}
              isEnrolling={isEnrolling}
              onEnroll={handleEnroll}
              onOpenReviewModal={() => setIsReviewOpen(true)}
            />
          </aside>
        </div>
      </div>

      <CourseRateModal
        isOpen={isReviewOpen}
        onClose={setIsReviewOpen}
        courseId={course.course_id}
        onRatingSubmitted={refreshComments}
      />
    </div>
  );
}
