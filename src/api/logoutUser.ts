import { apiRequest } from "./apiClient";

export async function logoutUser() {
  // Logout clears the server-managed cookie; callers clear local Redux/session state.
  return apiRequest("/auth/logout", {
    method: "POST",
  });
}
