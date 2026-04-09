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
    console.log("User verification response status:", response.status);
    if (response.status === 204) {
      localStorage.removeItem("user");
      console.log("No user logged in");
      return null; // No content, user not logged in
    }
    const data = await response.json();
    localStorage.setItem("user", JSON.stringify(data.user));
    return data.user;
  } catch (e) {
    console.error("A error occur when verify user", e);
    return null;
  }
}
