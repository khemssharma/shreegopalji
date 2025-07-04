import { create } from "zustand";

const API_URL = process.env.REACT_APP_API_URL;

const useProjectStore = create((set) => ({
  projects: [],
  activities: [],
  loading: false,
  error: null,

  // Create a new project
  createProject: async (projectData) => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/project`, {
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
      const response = await fetch(`${API_URL}/project`, {
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

  // Add a new activity
  addActivity: async (activityData) => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/activity`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(activityData),
      });
      const data = await response.json();
      if (!response.ok) {
        set({ loading: false, error: data.error || "Failed to add activity." });
        return false;
      }
      set((state) => ({
        activities: [data, ...(state.activities || [])],
        loading: false,
        error: null,
      }));
      return true;
    } catch (err) {
      set({ loading: false, error: "Network error. Please try again." });
      return false;
    }
  },

  // Fetch activities by project ID
  // fetchActivities: async (projectId) => {
  //   set({ loading: true, error: null });
  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await fetch(`${API_URL}/activity?projectId=${projectId}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     const data = await response.json();
  //     if (!response.ok) {
  //       set({ loading: false, error: data.error || "Failed to fetch activities." });
  //       return;
  //     }
  //     set({ activities: data, loading: false, error: null });
  //   } catch (err) {
  //     set({ loading: false, error: "Network error. Please try again." });
  //   }
  // },
}));

export default useProjectStore;