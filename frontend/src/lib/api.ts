import axios from "axios";

const api = axios.create({
  // 🔬 SAKLEK: Tembak langsung ke port docker backend lu (8005) agar tidak salah baca dari .env lawas
  baseURL: "http://localhost:8005/api/v1",
  timeout: 15000,
});

const getCookieManual = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return undefined;
};

api.interceptors.request.use((config) => {
  const token = getCookieManual("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// 🔹 Path ini benar menggunakan prefix bawaan backend utama
export const getDashboardInsights = async () => {
  const response = await api.get("/dashboard-utama/insights"); 
  return response.data;
};

export const getKpiSummary = async () => {
  const response = await api.get("/dashboard-utama/kpi-summary"); 
  return response.data;
};

// ✅ FIX PATH ACADEMIC: Lepaskan dari /dashboard-utama karena router ini berdiri sendiri di root
export const getAcademicSummary = async () => {
  const response = await api.get("/academic-summary");
  return response.data;
};

export default api;