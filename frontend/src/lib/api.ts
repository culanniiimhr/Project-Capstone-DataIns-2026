import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://api-eduinsight.windsight.id/api/v1",
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

export const getDashboardInsights = async () => {
  const response = await api.get("/dashboard-utama/insights");
  return response.data;
};

// REVISI BAR: Fetcher Ringkasan KPI Utama (Murni dari FastAPI Python lu)
export const getKpiSummary = async () => {
  const response = await api.get("/dashboard-utama/kpi-summary");
  return response.data;
};

export default api;