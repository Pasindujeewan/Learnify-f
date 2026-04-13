import type { comments } from "../types/comments";
export async function getCourseComments(courseId: string): Promise<comments[]> {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/courses/comments/${courseId}`,
    );
    const data = await res.json();
    const comments: comments[] = data.data;
    return comments;
  } catch (error) {
    console.error("Error fetching course comments:", error);
    return [];
  }
}
