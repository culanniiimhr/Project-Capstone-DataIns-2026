// frontend/src/lib/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1",
  timeout: 15000,
});

// Fungsi pembantu membaca cookie murni (pengganti js-cookie)
const getCookieManual = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return undefined;
};

// Inject JWT token ke setiap request
api.interceptors.request.use((config) => {
  const token = getCookieManual("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 → redirect ke login
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      // Hapus cookie cara manual
      document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Fetcher Insight Otomatis Dashboard Utama
export const getDashboardInsights = async () => {
  const response = await api.get("/dashboard-utama/insights");
  return response.data;
};

export default api;