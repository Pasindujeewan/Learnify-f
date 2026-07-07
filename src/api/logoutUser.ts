import { apiRequest } from "./apiClient";

export async function logoutUser() {
  return apiRequest("/auth/logout", {
    method: "POST",
  });
}
