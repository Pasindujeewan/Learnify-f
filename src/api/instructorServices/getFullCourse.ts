import { apiRequest, type ApiItemResponse } from "../apiClient";
import type { FullCourseType } from "../../types/courseType";

export async function getFullCourse(
  courseId: string,
): Promise<FullCourseType | null> {
  try {
    // Full course data is protected because it can include enrolled student records.
    const data = await apiRequest<ApiItemResponse<FullCourseType>>(
      `/instructors/course/${courseId}/full`,
    );

    return data.data;
  } catch {
    return null;
  }
}
