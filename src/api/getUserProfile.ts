import type { instructorProfileType } from "../types/instructorType";
import type { StudentProfileType } from "../types/StudentType";
export async function verifyUser(): Promise<
  StudentProfileType | instructorProfileType | null
> {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user/me`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to verify user");
    }

    const data = await response.json();
    return data.user;
  } catch (e) {
    console.error("A error occur when verify user", e);
    return null;
  }
}
