import type { LoginForm } from "../types/loginFormType";

export async function loginUser({ email, password }: LoginForm) {
  try {
    const response = fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    return response;
  } catch (e) {
    console.log(e, "a error occur");
  }
}
