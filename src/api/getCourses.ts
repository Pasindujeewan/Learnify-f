import type { Course } from "../types/courseType";

export async function getCourses(limit: number = 10) {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/courses/getall?limit=${limit}`,
  );
  const data = await res.json();
  console.log("Fetched courses:", data);
  const courses: Course[] = data.data;
  return courses;
}
