import { apiRequest, type ApiListResponse, type ApiItemResponse } from "./apiClient";
import type { Course } from "../types/courseType";

export async function getCourses(limit: number = 10) {
  const data = await apiRequest<ApiListResponse<Course>>(`/courses?limit=${limit}`, {
    auth: false,
  });

  return data.data;
}

export async function getCourse(courseId: string) {
  const data = await apiRequest<ApiItemResponse<Course>>(`/courses/${courseId}`, {
    auth: false,
  });

  return data.data;
}
