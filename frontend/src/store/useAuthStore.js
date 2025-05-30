import { create } from "zustand";

const useStore = create((set) => ({
  // Auth state
  user: null,
  token: typeof window !== "undefined" && window.localStorage ? localStorage.getItem("token") : null,
  loading: false,
  error: null,

  // Login action
  login: async (username, password) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        set({ loading: false, error: data.message || "Login failed." });
        return false;
      }
      localStorage.setItem("token", data.token);
      set({ user: data.user, token: data.token, loading: false, error: null });
      return true;
    } catch (err) {
      set({ loading: false, error: "Network error. Please try again." });
      return false;
    }
  },

  // Signup action
  signup: async (name, email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        set({ loading: false, error: data.message || "Signup failed." });
        return false;
      }
      // Optionally auto-login after signup:
      localStorage.setItem("token", data.token);
      set({ user: data.user, token: data.token, loading: false, error: null });
      return true;
    } catch (err) {
      set({ loading: false, error: "Network error. Please try again." });
      return false;
    }
  },

  // Logout action
  logout: async () => {
    const token = typeof window !== "undefined" && window.localStorage ? localStorage.getItem("token") : null;
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.error("Logout failed:", err);
      set({ error: "Logout failed. Please try again." });
      return;
    }
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem("token");
    }
    set({ user: null, token: null, error: null });
  },

  setUser: (user) => set({ user }),
}));

export default useStore;