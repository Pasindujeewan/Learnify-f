import {
  apiRequest,
  type ApiItemResponse,
  type ApiListResponse,
} from "./apiClient";
import type {
  CourseProgress,
  Lesson,
  LessonFormData,
  StudentLessonsResponse,
} from "../types/lessonType";

// Public lessons are used for course preview pages before a student starts learning.
export async function getPublicCourseLessons(courseId: string) {
  const data = await apiRequest<ApiListResponse<Lesson>>(
    `/courses/${courseId}/lessons`,
    { auth: false },
  );

  return data.data;
}

export async function getStudentCourseLessons(courseId: string) {
  const data = await apiRequest<ApiItemResponse<StudentLessonsResponse>>(
    `/students/courses/${courseId}/lessons`,
  );

  return data.data;
}

export async function completeLesson(lessonId: string) {
  // The backend returns the updated course progress after a lesson is completed.
  const data = await apiRequest<
    ApiItemResponse<{
      lesson: Lesson;
      completedCount: number;
      totalLessons: number;
      courseCompleted: boolean;
      progress: number;
    }>
  >(`/students/lessons/${lessonId}/complete`, {
    method: "POST",
  });

  return data.data;
}

export async function getStudentCourseProgress(courseId: string) {
  // Dashboard cards only need the summary, not the full lesson content.
  const data = await apiRequest<ApiItemResponse<CourseProgress>>(
    `/students/courses/${courseId}/progress`,
  );

  return data.data;
}

export async function addLesson(courseId: string, lesson: LessonFormData) {
  // Instructors add plain text lessons; persistence is currently backed by dummy data.
  const data = await apiRequest<ApiItemResponse<Lesson>>(
    `/instructors/courses/${courseId}/lessons`,
    {
      method: "POST",
      body: JSON.stringify(lesson),
    },
  );

  return data.data;
}

export async function getInstructorCourseLessons(courseId: string) {
  const data = await apiRequest<ApiListResponse<Lesson>>(
    `/instructors/courses/${courseId}/lessons`,
  );

  return data.data;
}
