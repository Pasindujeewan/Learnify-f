import type { UserDbType } from "../types/UserType";

export async function registerUser(data: UserDbType) {
  try {
    console.log("Registering user with data:", data);
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/register`,
      {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
    );
    return response;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}
