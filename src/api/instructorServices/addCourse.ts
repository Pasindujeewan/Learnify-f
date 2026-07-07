import { apiRequest, type ApiItemResponse } from "../apiClient";
import type { CourseFormData } from "../../types/courseType";

export async function addCourse(courses: CourseFormData) {
  return apiRequest<ApiItemResponse<CourseFormData>>("/courses", {
    method: "POST",
    body: JSON.stringify(courses),
  });
}
