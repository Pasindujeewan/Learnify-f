import { apiRequest, type ApiItemResponse } from "./apiClient";
import type { CourseFormData, FullCourseType } from "../types";

export async function addCourse(courseData: CourseFormData) {
  return apiRequest<ApiItemResponse<CourseFormData>>("/courses", {
    method: "POST",
    body: JSON.stringify(courseData),
  });
}

export async function getFullCourse(courseId: string): Promise<FullCourseType | null> {
  try {
    const data = await apiRequest<ApiItemResponse<FullCourseType>>(
      `/instructors/course/${courseId}/full`,
    );
    return data.data;
  } catch {
    return null;
  }
}
