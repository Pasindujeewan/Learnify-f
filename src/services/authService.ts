import { apiRequest } from "./apiClient";
import type {
  LoginForm,
  UserStateType,
  UserDbType,
  StudentProfileType,
  InstructorProfileType,
} from "../types";

export type AuthResponse = {
  success: boolean;
  message: string;
  user: UserStateType;
};

export type CurrentUserProfile = StudentProfileType | InstructorProfileType;

export async function loginUser(credentials: LoginForm): Promise<AuthResponse> {
  return apiRequest<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export async function registerUser(userData: UserDbType): Promise<{ success: boolean; message?: string }> {
  return apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

export async function logoutUser(): Promise<void> {
  await apiRequest("/auth/logout", {
    method: "POST",
  });
}

export async function verifyUser(): Promise<CurrentUserProfile | null> {
  try {
    const data = await apiRequest<{
      success: boolean;
      user: CurrentUserProfile;
    }>("/user/me");

    sessionStorage.setItem("user", JSON.stringify(data.user));
    return data.user;
  } catch {
    sessionStorage.removeItem("user");
    return null;
  }
}
