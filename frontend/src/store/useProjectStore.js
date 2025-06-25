import { create } from "zustand";

const useProjectStore = create((set) => ({
  projects: [],
  loading: false,
  error: null,

  // Create a new project
  createProject: async (projectData) => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://shreegopalji.onrender.com/api/project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
      });
      const data = await response.json();
      if (!response.ok) {
        set({ loading: false, error: data.error || "Failed to create project." });
        return false;
      }
      set((state) => ({ projects: [...state.projects, data], loading: false, error: null }));
      return true;
    } catch (err) {
      set({ loading: false, error: "Network error. Please try again." });
      return false;
    }
  },

  // Fetch all projects
  fetchProjects: async () => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://shreegopalji.onrender.com/api/project", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) {
        set({ loading: false, error: data.error || "Failed to fetch projects." });
        return;
      }
      set({ projects: data, loading: false, error: null });
    } catch (err) {
      set({ loading: false, error: "Network error. Please try again." });
    }
  },
}));

export default useProjectStore;