import { apiRequest } from "../apiClient";
import type { CourseRatingType } from "../../types/RatingType";

export async function rateCourse({
  rating,
  comment,
  courseId,
}: CourseRatingType) {
  // A student keeps one rating per course; the backend updates the previous one.
  return apiRequest("/students/rate-course", {
    method: "POST",
    body: JSON.stringify({ rating, comment, courseId }),
  });
}
