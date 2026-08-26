import {
  apiRequest,
  type ApiListResponse,
  type ApiItemResponse,
} from "./apiClient";
import type { Course } from "../types/courseType";

export async function getCourses(limit: number = 10) {
  // Course catalog endpoints are public so guests can browse before logging in.
  const data = await apiRequest<ApiListResponse<Course>>(
    `/courses?limit=${limit}`,
    {
      auth: false,
    },
  );
  console.log("getCourse data:", data);
  return data.data;
}

export async function getCourse(courseId: string) {
  // The detail page can be loaded directly from a URL without route state.
  const data = await apiRequest<ApiItemResponse<Course>>(
    `/courses/${courseId}`,
    {
      auth: false,
    },
  );
  console.log("getCourse data:", data);
  return data.data;
}
