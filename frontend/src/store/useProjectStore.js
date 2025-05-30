import { create } from "zustand";

const useProjectStore = create((set, get) => ({
  progressLoading: false,
  progressError: null,
  materialLoading: false,
  materialError: null,
  activities: [],
  activitiesLoading: false,
  activitiesError: null,

  // Add Progress Update
  addProgress: async ({ projectId, description, progressPercent, updatedBy }) => {
    set({ progressLoading: true, progressError: null });
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://shreegopalji.onrender.com/api/project/progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ projectId, description, progressPercent, updatedBy }),
      });
      const data = await response.json();
      if (!response.ok) {
        set({ progressLoading: false, progressError: data.error || "Failed to add progress." });
        return false;
      }
      set({ progressLoading: false, progressError: null });
      return true;
    } catch (err) {
      set({ progressLoading: false, progressError: "Network error. Please try again." });
      return false;
    }
  },

  // Request Material
  requestMaterial: async ({ projectId, materialName, quantity, requestedBy }) => {
    set({ materialLoading: true, materialError: null });
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://shreegopalji.onrender.com/api/project/material-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ projectId, materialName, quantity, requestedBy }),
      });
      const data = await response.json();
      if (!response.ok) {
        set({ materialLoading: false, materialError: data.error || "Failed to request material." });
        return false;
      }
      set({ materialLoading: false, materialError: null });
      return true;
    } catch (err) {
      set({ materialLoading: false, materialError: "Network error. Please try again." });
      return false;
    }
  },

  // Fetch Activities
  fetchActivities: async () => {
    set({ activitiesLoading: true, activitiesError: null });
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://shreegopalji.onrender.com/api/project/activities", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) {
        set({ activitiesLoading: false, activitiesError: data.error || "Failed to fetch activities." });
        return;
      }
      set({ activities: data, activitiesLoading: false, activitiesError: null });
    } catch (err) {
      set({ activitiesLoading: false, activitiesError: "Network error. Please try again." });
    }
  },
}));

export default useProjectStore;