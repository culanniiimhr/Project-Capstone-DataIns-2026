import { create } from "zustand";
import Cookies from "js-cookie";
import api from "@/lib/api";

interface User {
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchMe: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,

  login: async (email, password) => {
    set({ isLoading: true });
    const form = new FormData();
    form.append("username", email);
    form.append("password", password);

    const { data } = await api.post("/auth/login", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    Cookies.set("access_token", data.access_token, { expires: 1 });

    const me = await api.get("/auth/me");
    set({ user: me.data, isLoading: false });
  },

  logout: () => {
    Cookies.remove("access_token");
    set({ user: null });
    window.location.href = "/login";
  },

  fetchMe: async () => {
    try {
      const { data } = await api.get("/auth/me");
      set({ user: data });
    } catch {
      set({ user: null });
    }
  },
}));
