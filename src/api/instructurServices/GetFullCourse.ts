import type { FullCourseType } from "../../types/courseType";

export async function getFullCourse(
  courseId: string,
): Promise<FullCourseType | null> {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/instructors/course/${courseId}/full`,
      {
        method: "GET",
        credentials: "include",
      },
    );
    const data = await response.json();
    const course: FullCourseType = data.data;
    console.log("Fetched full course:", course);
    console.log("Course enrolled students:", course.enrolledstudents);
    return course;
  } catch (e) {
    console.error("a error occur during get full course", e);
    return null;
  }
}
