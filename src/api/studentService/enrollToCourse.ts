import { apiRequest } from "../apiClient";

export async function enrollToCourse(courseId: string) {
  return apiRequest(`/students/enroll/${courseId}`, {
    method: "POST",
  });
}
