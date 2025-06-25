import { create } from "zustand";

const useEmployeeStore = create((set) => ({
  employees: [],
  loading: false,
  error: null,

  // Create a new employee
  createEmployee: async (employeeData) => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://shreegopalji.onrender.com/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(employeeData),
      });
      const data = await response.json();
      if (!response.ok) {
        set({ loading: false, error: data.message || "Failed to add employee." });
        return false;
      }
      set((state) => ({ employees: [...state.employees, data.user], loading: false, error: null }));
      return true;
    } catch (err) {
      set({ loading: false, error: "Network error. Please try again." });
      return false;
    }
  },

  // Fetch all employees
  fetchEmployees: async () => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://shreegopalji.onrender.com/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) {
        set({ loading: false, error: data.message || "Failed to fetch employees." });
        return;
      }
      set({ employees: data, loading: false, error: null });
    } catch (err) {
      set({ loading: false, error: "Network error. Please try again." });
    }
  },
}));

export default useEmployeeStore;