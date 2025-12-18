import environment from "@/config/environment";
import { SessionExtended } from "@/types/auth/auth";
import axios from "axios";
import { getSession, signOut } from "next-auth/react";

const refreshTokenUrl = `${environment.BACKEND_URL}/refresh-token`;

const headers = { "Content-Type": "application/json" };

// In-memory storage untuk token yang baru di-refresh
let cachedAccessToken: string | null = null;

// Function untuk update session dengan token baru
const updateSessionToken = async (newToken: string) => {
  try {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("session-token-updated", {
          detail: { accessToken: newToken },
        })
      );
    }
  } catch (error) {
    console.error("Failed to update session:", error);
  }
};

const instance = axios.create({
  baseURL: environment.BACKEND_URL,
  headers: headers,
  timeout: 60 * 1000,
  withCredentials: true,
});

instance.interceptors.request.use(
  async (request) => {
    // Prioritaskan cached token jika ada
    if (cachedAccessToken) {
      request.headers.Authorization = `Bearer ${cachedAccessToken}`;
    } else {
      const session: SessionExtended | null = await getSession();
      if (session && session.accessToken) {
        request.headers.Authorization = `Bearer ${session.accessToken}`;
      }
    }
    return request;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Jika error 401 (Unauthorized) dan belum pernah retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log("Attempting to refresh token...");

        // Call refresh token endpoint
        const refreshResponse = await axios.post(
          refreshTokenUrl,
          {},
          {
            withCredentials: true,
            headers: headers,
          }
        );

        const newAccessToken = refreshResponse.data.data.accessToken;
        console.log("Token refreshed successfully");

        if (newAccessToken) {
          // Simpan token baru ke cache in-memory
          cachedAccessToken = newAccessToken;

          // Update session dengan token baru
          await updateSessionToken(newAccessToken);

          // Retry original request dengan token baru
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return instance(originalRequest);
        }
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        cachedAccessToken = null; // Clear cached token
        await signOut({ redirect: true, callbackUrl: "/login" });
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
