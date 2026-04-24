/* eslint-disable @typescript-eslint/no-explicit-any */
import { getToken, removeToken, setToken } from "./auth";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000/api";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

interface ApiOptions {
  method?: RequestMethod;
  body?: Record<string, unknown> | FormData;
  isFormData?: boolean;
}

export async function apiRequest<T = any>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const { method = "GET", body, isFormData = false } = options;
  const token = getToken();

  const headers: HeadersInit = {};

  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (!isFormData) headers["Content-Type"] = "application/json";

  const config: RequestInit = {
    method,
    headers,
  };

  if (body) {
    config.body = isFormData ? (body as FormData) : JSON.stringify(body);
  }

  console.log("API CALL:", endpoint);
  console.log("TOKEN:", token);

  let response: Response;

  try {
    response = await fetch(`${BASE_URL}${endpoint}`, config);
  } catch (err: any) {
    console.error("FETCH ERROR:", err);
    throw new ApiError(0, err.message || "Network error");
  }

  console.log("STATUS:", response.status);

  if (response.status === 401) {
    removeToken();
    if (typeof window !== "undefined") window.location.href = "/login";
    throw new ApiError(401, "Unauthorized");
  }

  let resData: any = {};
  try {
    resData = await response.json();
  } catch { }

  console.log("RESPONSE:", resData);

  if (!response.ok) {
    throw new ApiError(response.status, resData.error || "Request failed");
  }

  return resData;
}

export const authApi = {
  signup: async (data: { email: string; password: string; full_name: string }) => {
    const res = await apiRequest<{ success: boolean; user: any }>("/auth/signup", {
      method: "POST",
      body: data,
    });
    console.log("SIGNUP RESPONSE:", res);
    return res;
  },

  login: async (data: { email: string; password: string }) => {
    const res = await apiRequest<{
      success: boolean;
      session: { access_token: string; user: any };
    }>("/auth/login", {
      method: "POST",
      body: data,
    });

    console.log("LOGIN RESPONSE:", res);

    if (res?.session?.access_token) {
      setToken(res.session.access_token);
    }

    return res;
  },

  getProfile: async () => {
    const res = await apiRequest<{ success: boolean; data: ProfileData }>("/auth/profile");
    console.log("PROFILE:", res);
    return res.data;
  },
};

export const checkApi = {
  text: async (text: string) => {
    const res = await apiRequest<{
      success: boolean;
      data: CheckResponse;
      scan_id?: string;
    }>("/text/check", {
      method: "POST",
      body: { text },
    });

    console.log("TEXT RESULT:", res);
    return res.data;
  },

  url: async (url: string) => {
    const res = await apiRequest<{
      success: boolean;
      data: CheckResponse;
      scan_id?: string;
    }>("/url/check", {
      method: "POST",
      body: { url },
    });

    return res.data;
  },

  image: async (file: File) => {
    const fd = new FormData();
    fd.append("image", file);

    const res = await apiRequest<{
      success: boolean;
      data: CheckResponse;
      scan_id?: string;
    }>("/image/check", {
      method: "POST",
      body: fd,
      isFormData: true,
    });

    return res.data;
  },

  video: async (file: File) => {
    const fd = new FormData();
    fd.append("video", file);

    const res = await apiRequest<{
      success: boolean;
      data: CheckResponse;
      scan_id?: string;
    }>("/video/check", {
      method: "POST",
      body: fd,
      isFormData: true,
    });

    return res.data;
  },

  document: async (file: File) => {
    const fd = new FormData();
    fd.append("document", file);

    const res = await apiRequest<{
      success: boolean;
      data: CheckResponse;
      scan_id?: string;
    }>("/document/check", {
      method: "POST",
      body: fd,
      isFormData: true,
    });

    return res.data;
  },
};

export const profileApi = {
  get: async () => {
    const res = await apiRequest<{ success: boolean; data: ProfileData }>("/profile");
    console.log("PROFILE:", res);
    return res.data;
  },

  update: async (data: Partial<ProfileData>) => {
    const res = await apiRequest<{ success: boolean; data: ProfileData }>("/profile", {
      method: "PUT",
      body: data,
    });
    return res.data;
  },
};

export const historyApi = {
  getAll: async (): Promise<HistoryItem[]> => {
    const res = await apiRequest<{ success: boolean; data: HistoryItem[] }>("/history");
    console.log("HISTORY FINAL:", res);
    return res.data || [];
  },
};

export interface CheckResponse {
  label: string;
  confidence: number;
  indicators?: string[];
}

export interface ProfileData {
  id?: string;
  full_name?: string;
  email: string;
  avatar_url?: string;
  role?: string;
}

export interface HistoryItem {
  status: string;
  result: any;
  label: any;
  id: string;
  scan_type: string;
  input_summary?: string;
  overall_verdict?: string;
  confidence?: number;
  created_at: string;
}