import { apiRequest } from "../apiClient";
import type { CourseRatingType } from "../../types/RatingType";

export async function rateCourse({
  rating,
  comment,
  courseId,
}: CourseRatingType) {
  return apiRequest("/students/rate-course", {
    method: "POST",
    body: JSON.stringify({ rating, comment, courseId }),
  });
}
