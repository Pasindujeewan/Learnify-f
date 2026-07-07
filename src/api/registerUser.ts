import { apiRequest } from "./apiClient";
import type { UserDbType } from "../types/UserType";

export async function registerUser(data: UserDbType) {
  return apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
