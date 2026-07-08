const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

type ApiOptions = RequestInit & {
  auth?: boolean;
};

export async function apiRequest<T>(path: string, options: ApiOptions = {}): Promise<T> {
  // Centralizes API base URL, JSON headers, cookies, and error parsing.
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: options.auth === false ? "same-origin" : "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  // Some failed responses may not include JSON, so parsing must be defensive.
  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(payload?.message || "Request failed");
  }

  return payload as T;
}

export type ApiListResponse<T> = {
  success: boolean;
  data: T[];
};

export type ApiItemResponse<T> = {
  success: boolean;
  data: T;
};
