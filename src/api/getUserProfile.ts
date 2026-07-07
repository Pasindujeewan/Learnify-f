import { apiRequest } from "./apiClient";
import type { instructorProfileType } from "../types/instructorType";
import type { StudentProfileType } from "../types/StudentType";

export async function verifyUser(): Promise<
  StudentProfileType | instructorProfileType | null
> {
  try {
    const data = await apiRequest<{
      success: boolean;
      user: StudentProfileType | instructorProfileType;
    }>("/user/me");

    sessionStorage.setItem("user", JSON.stringify(data.user));
    return data.user;
  } catch (e) {
    sessionStorage.removeItem("user");
    return null;
  }
}
