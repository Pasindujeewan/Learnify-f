import { apiRequest } from "../apiClient";

export async function enrollToCourse(courseId: string) {
  // Backend enrollment is idempotent, so repeated clicks do not duplicate rows.
  return apiRequest(`/students/enroll/${courseId}`, {
    method: "POST",
  });
}
