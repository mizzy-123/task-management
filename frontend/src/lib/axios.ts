import { SessionExtended } from "@/types/auth/auth";
import axios from "axios";
import { getSession } from "next-auth/react";

const headers = { "Content-Type": "application/json" };
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: headers,
  timeout: 60 * 1000,
  withCredentials: true,
});

instance.interceptors.request.use(
  async (request) => {
    const session: SessionExtended | null = await getSession();
    if (session && session.accessToken) {
      request.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return request;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default instance;
