import React, { useState } from "react";

const machines = [
  "Bolero Camper",
  "XUV",
  "JCB",
  "Roller",
  "Grader",
];

export default function MachineryUsageDialog({ onSubmit, onClose }) {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [machine, setMachine] = useState(machines[0]);
  const [startReading, setStartReading] = useState("");
  const [endReading, setEndReading] = useState("");
  const [fuelLitres, setFuelLitres] = useState("");
  const [fuelType, setFuelType] = useState("Diesel");
  const [showMap, setShowMap] = useState(false);

  // For Google Maps location, you can use a simple input for now
  // For production, integrate Google Maps API

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit &&
      onSubmit({
        date,
        machine,
        startReading,
        endReading,
        fuelLitres,
        fuelType,
      });
    onClose && onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.dialog}>
        <h2 style={{ marginBottom: 8, color: "#2d3e50" }}>
          Machinery Usage Entry
        </h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label>
            Date:
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={styles.input}
            />
          </label>
          <label>
            Machine:
            <select
              value={machine}
              onChange={(e) => setMachine(e.target.value)}
              style={styles.input}
            >
              {machines.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </label>
          
          <label>
            Starting Reading (R1):
            <input
              type="number"
              required
              value={startReading}
              onChange={(e) => setStartReading(e.target.value)}
              style={styles.input}
              min="0"
            />
          </label>
          <label>
            Closing Reading (R2):
            <input
              type="number"
              required
              value={endReading}
              onChange={(e) => setEndReading(e.target.value)}
              style={styles.input}
              min="0"
            />
          </label>
          <label>
            Fuel (Litre):
            <input
              type="number"
              required
              value={fuelLitres}
              onChange={(e) => setFuelLitres(e.target.value)}
              style={styles.input}
              min="0"
              step="0.01"
            />
          </label>
          <label>
            Fuel Type:
            <select
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
              style={styles.input}
            >
              <option>Diesel</option>
              <option>Petrol</option>
              <option>CNG</option>
            </select>
          </label>
          <div style={styles.buttonRow}>
            <button type="submit" style={styles.submitBtn}>
              Submit
            </button>
            <button type="button" style={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>        
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    zIndex: 9999,
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(44,62,80,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  dialog: {
    background: "#fff",
    borderRadius: 12,
    padding: "32px 28px 18px 28px",
    minWidth: 350,
    boxShadow: "0 8px 32px rgba(44,62,80,0.18)",
    position: "relative",
    maxWidth: 420,
    width: "100%",
    animation: "fadeIn 0.3s",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  input: {
    marginTop: 4,
    marginBottom: 8,
    padding: "7px 10px",
    borderRadius: 6,
    border: "1px solid #bfc9d1",
    fontSize: 15,
    width: "100%",
    boxSizing: "border-box",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 10,
  },
  submitBtn: {
    background: "#1abc9c",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: "8px 18px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: 15,
  },
  cancelBtn: {
    background: "#eee",
    color: "#333",
    border: "none",
    borderRadius: 6,
    padding: "8px 18px",
    cursor: "pointer",
    fontSize: 15,
  },
};