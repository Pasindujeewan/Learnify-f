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
} from "../types";

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
  const data = await apiRequest<ApiItemResponse<CourseProgress>>(
    `/students/courses/${courseId}/progress`,
  );
  return data.data;
}

export async function addLesson(courseId: string, lesson: LessonFormData) {
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
