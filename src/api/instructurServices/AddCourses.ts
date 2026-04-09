import type { CourseFormData } from "../../types/courseType";

export async function addCourse(courses: CourseFormData) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/courses/add`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(courses),
  });
  const data = await res.json();
  return data;
}
