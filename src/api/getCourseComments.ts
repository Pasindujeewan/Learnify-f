import { apiRequest, type ApiListResponse } from "./apiClient";
import type { comments } from "../types/comments";

export async function getCourseComments(courseId: string): Promise<comments[]> {
  try {
    // Reviews are public, but failure should not block the course detail page.
    const data = await apiRequest<ApiListResponse<comments>>(
      `/courses/comments/${courseId}`,
      { auth: false },
    );

    return data.data;
  } catch {
    return [];
  }
}
