import {
  apiRequest,
  type ApiListResponse,
  type ApiItemResponse,
} from "./apiClient";
import type { Course, Comment, CourseRating } from "../types";

export interface GetCoursesParams {
  limit?: number;
  search?: string;
  categories?: string[];
  page?: number;
  sort?: string;
}

export async function getCourses(
  limit: number = 10,
  search: string = "",
  categories: string[] = [],
  page: number = 1,
  sort: string = "createdAt",
) {
  const query = new URLSearchParams({
    limit: String(limit),
    search,
    categories: categories.join(","),
    page: String(page),
    sort,
  });

  const data = await apiRequest<ApiListResponse<Course>>(
    `/courses/getAll?${query.toString()}`,
    { auth: false },
  );

  return data.data;
}

export async function getCourse(courseId: string): Promise<Course> {
  const data = await apiRequest<ApiItemResponse<Course>>(
    `/courses/${courseId}`,
    { auth: false },
  );
  return data.data;
}

export async function getCourseComments(courseId: string): Promise<Comment[]> {
  try {
    const data = await apiRequest<ApiListResponse<Comment>>(
      `/courses/comments/${courseId}`,
      { auth: false },
    );
    return data.data.items;
  } catch {
    return [];
  }
}

export async function enrollToCourse(courseId: string): Promise<{ success: boolean }> {
  return apiRequest(`/students/enroll/${courseId}`, {
    method: "POST",
  });
}

export async function rateCourse(ratingData: CourseRating): Promise<{ success: boolean }> {
  return apiRequest("/students/rate-course", {
    method: "POST",
    body: JSON.stringify(ratingData),
  });
}
