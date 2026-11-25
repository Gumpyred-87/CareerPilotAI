import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { getSession, signOut } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

class ApiClient {
  private client: AxiosInstance;
  private refreshTokenPromise: Promise<string> | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: `${API_URL}/api/v1`,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 30000,
      withCredentials: true,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor - add auth token
    this.client.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        // Try to get token from next-auth session
        if (typeof window !== "undefined") {
          const session = await getSession();
          if (session?.accessToken) {
            config.headers.Authorization = `Bearer ${session.accessToken}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor - handle token refresh
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const newToken = await this.refreshAccessToken();
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return this.client(originalRequest);
          } catch (refreshError) {
            // Refresh failed, redirect to login
            if (typeof window !== "undefined") {
              await signOut({ callbackUrl: "/login" });
            }
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private async refreshAccessToken(): Promise<string> {
    if (this.refreshTokenPromise) {
      return this.refreshTokenPromise;
    }

    this.refreshTokenPromise = (async () => {
      const response = await axios.post(
        `${API_URL}/api/v1/auth/refresh`,
        {},
        { withCredentials: true }
      );
      return response.data.access_token;
    })();

    try {
      return await this.refreshTokenPromise;
    } finally {
      this.refreshTokenPromise = null;
    }
  }

  // Generic request methods
  async get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
    const response = await this.client.get<T>(url, { params });
    return response.data;
  }

  async post<T>(url: string, data?: unknown): Promise<T> {
    const response = await this.client.post<T>(url, data);
    return response.data;
  }

  async put<T>(url: string, data?: unknown): Promise<T> {
    const response = await this.client.put<T>(url, data);
    return response.data;
  }

  async patch<T>(url: string, data?: unknown): Promise<T> {
    const response = await this.client.patch<T>(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete<T>(url);
    return response.data;
  }

  // File upload
  async upload<T>(url: string, file: File, onProgress?: (progress: number) => void): Promise<T> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await this.client.post<T>(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total && onProgress) {
          onProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
        }
      },
    });
    return response.data;
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return this.get("/health");
  }
}

export const api = new ApiClient();

// API endpoint helpers
export const endpoints = {
  auth: {
    login: () => "/auth/login",
    register: () => "/auth/register",
    logout: () => "/auth/logout",
    refresh: () => "/auth/refresh",
    me: () => "/auth/me",
    updatePassword: () => "/auth/password",
  },
  user: {
    profile: () => "/user/profile",
    updateProfile: () => "/user/profile",
  },
  candidate: {
    profile: () => "/candidate/profile",
    updateProfile: () => "/candidate/profile",
  },
  resume: {
    list: () => "/resumes",
    upload: () => "/resumes/upload",
    get: (id: string) => `/resumes/${id}`,
    delete: (id: string) => `/resumes/${id}`,
    parse: (id: string) => `/resumes/${id}/parse`,
    versions: (id: string) => `/resumes/${id}/versions`,
    createVersion: (id: string) => `/resumes/${id}/versions`,
    export: (id: string, format: "pdf" | "docx") => `/resumes/${id}/export/${format}`,
  },
  job: {
    list: () => "/jobs",
    get: (id: string) => `/jobs/${id}`,
    search: () => "/jobs/search",
    match: (id: string) => `/jobs/${id}/match`,
    sources: () => "/jobs/sources",
    stats: () => "/jobs/stats",
  },
  match: {
    list: () => "/matches",
    get: (id: string) => `/matches/${id}`,
    recommended: () => "/matches/recommended",
  },
  application: {
    list: () => "/applications",
    create: () => "/applications",
    get: (id: string) => `/applications/${id}`,
    update: (id: string) => `/applications/${id}`,
    delete: (id: string) => `/applications/${id}`,
    prepare: (id: string) => `/applications/${id}/prepare`,
    submit: (id: string) => `/applications/${id}/submit`,
    statuses: () => "/applications/statuses",
    kanban: () => "/applications/kanban",
    analytics: () => "/applications/analytics",
    export: () => "/applications/export",
  },
  coverLetter: {
    list: () => "/cover-letters",
    create: () => "/cover-letters",
    get: (id: string) => `/cover-letters/${id}`,
    update: (id: string) => `/cover-letters/${id}`,
    delete: (id: string) => `/cover-letters/${id}`,
    generate: () => "/cover-letters/generate",
    export: (id: string, format: "pdf" | "docx") => `/cover-letters/${id}/export/${format}`,
  },
  alert: {
    list: () => "/alerts",
    create: () => "/alerts",
    get: (id: string) => `/alerts/${id}`,
    update: (id: string) => `/alerts/${id}`,
    delete: (id: string) => `/alerts/${id}`,
    test: (id: string) => `/alerts/${id}/test`,
  },
  interview: {
    sessions: () => "/interview/sessions",
    create: () => "/interview/sessions",
    get: (id: string) => `/interview/sessions/${id}`,
    simulate: (id: string) => `/interview/sessions/${id}/simulate`,
    evaluate: (id: string) => `/interview/sessions/${id}/evaluate`,
    questions: () => "/interview/questions",
  },
  referral: {
    list: () => "/referrals",
    find: () => "/referrals/find",
    get: (id: string) => `/referrals/${id}`,
    update: (id: string) => `/referrals/${id}`,
    message: (id: string) => `/referrals/${id}/message`,
  },
  company: {
    search: () => "/companies/search",
    get: (id: string) => `/companies/${id}`,
    intelligence: (id: string) => `/companies/${id}/intelligence`,
  },
  analytics: {
    overview: () => "/analytics/overview",
    funnel: () => "/analytics/funnel",
    sources: () => "/analytics/sources",
    skills: () => "/analytics/skills",
    timeline: () => "/analytics/timeline",
  },
  settings: {
    get: () => "/settings",
    update: () => "/settings",
    aiProviders: () => "/settings/ai-providers",
    testAiProvider: () => "/settings/ai-providers/test",
  },
  chromeExtension: {
    detect: () => "/chrome/detect",
    autofill: () => "/chrome/autofill",
    status: () => "/chrome/status",
  },
} as const;

export default api;