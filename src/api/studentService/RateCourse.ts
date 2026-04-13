import type { CourseRatingType } from "../../types/RatingType";

export async function rateCourse({
  rating,
  comment,
  courseId,
}: CourseRatingType) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/students/rate-course`,
      {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating,
          comment,
          courseId,
        }),
      },
    );
    const result = await response.json();
    console.log("Course rating response:", result);
    return result;
  } catch (error) {
    console.error("Error rating course:", error);
    throw error;
  }
}
