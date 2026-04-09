export async function enrollToCourse(courseId: string) {
  console.log("Enrolling to course with ID:", courseId);
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/students/enroll/${courseId}`,
      {
        method: "POST",
        credentials: "include",
      },
    );
    if (!response.ok) {
      throw new Error("Failed to enroll to course");
    }
    return await response.json();
  } catch (error) {
    console.error("Error enrolling to course:", error);
    throw error;
  }
}
