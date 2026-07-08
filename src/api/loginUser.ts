import { apiRequest } from "./apiClient";
import type { LoginForm } from "../types/loginFormType";
import type { UserStateType } from "../types/UserType";

export async function loginUser({ email, password }: LoginForm) {
  // The API sets the auth cookie; the returned user only seeds frontend state.
  return apiRequest<{
    success: boolean;
    message: string;
    user: UserStateType;
  }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}
