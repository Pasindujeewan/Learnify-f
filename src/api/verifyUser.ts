import type { UserForm } from "../types/UserType";
export async function verifyUser() {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user/me`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to verify user");
    }
    const data = await response.json();
    console.log(data);
    return data.user as UserForm;
  } catch (e) {
    console.error("A error occur when verify user", e);
  }
}
