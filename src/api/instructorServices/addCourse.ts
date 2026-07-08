import { apiRequest, type ApiItemResponse } from "../apiClient";
import type { CourseFormData } from "../../types/courseType";

export async function addCourse(courses: CourseFormData) {
  // Instructor identity is attached by the API from the auth cookie.
  return apiRequest<ApiItemResponse<CourseFormData>>("/courses", {
    method: "POST",
    body: JSON.stringify(courses),
  });
}
