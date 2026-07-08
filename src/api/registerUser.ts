import { apiRequest } from "./apiClient";
import type { UserDbType } from "../types/UserType";

export async function registerUser(data: UserDbType) {
  // Registration sends the selected role so the API can create the matching profile row.
  return apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
