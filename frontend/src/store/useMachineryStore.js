import { create } from "zustand";

const API_URL = process.env.REACT_APP_API_URL;

const useMachineryStore = create((set) => ({
  machinery: [],
  loading: false,
  error: null,

  // Create a new machine (requires projectId)
  createMachinery: async (projectId, machineData) => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/projects/${projectId}/machines`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(machineData),
      });
      const data = await response.json();
      if (!response.ok) {
        set({ loading: false, error: data.error || "Failed to add machinery." });
        return false;
      }
      set((state) => ({ machinery: [...state.machinery, data], loading: false, error: null }));
      return true;
    } catch (err) {
      set({ loading: false, error: "Network error. Please try again." });
      return false;
    }
  },

  // Fetch all machines for a project
  fetchMachinery: async (projectId) => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/projects/${projectId}/machines`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) {
        set({ loading: false, error: data.error || "Failed to fetch machinery." });
        return;
      }
      set({ machinery: data, loading: false, error: null });
    } catch (err) {
      set({ loading: false, error: "Network error. Please try again." });
    }
  },
}));

export default useMachineryStore;