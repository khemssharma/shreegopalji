import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";  

const employeesList = [
  "Amit Sharma",
  "Bhavna Singh",
  "Chirag Patel",
  "Deepak Kumar",
  "Ekta Joshi",
];

// Add a close (X) button at the top right of the dialog
function CloseButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: "absolute",
        top: 12,
        right: 12,
        background: "transparent",
        border: "none",
        fontSize: 22,
        color: "#888",
        cursor: "pointer",
        fontWeight: 700,
        lineHeight: 1,
      }}
      aria-label="Close"
      type="button"
    >
      ×
    </button>
  );
}
const sites = [
{ value: "Site A", label: "Obedullahganj" },
{ value: "Site C", label: "Indore" },
{ value: "Site D", label: "Gwalior" },
{ value: "Site E", label: "Jabalpur" },
];

function Manpower({ open, onClose }) {
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [loadingLoc, setLoadingLoc] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [site, setSite] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleEmployeeChange = (e) => {
    const { value, checked } = e.target;
    setSelectedEmployees((prev) =>
      checked ? [...prev, value] : prev.filter((emp) => emp !== value)
    );
  };

  const getLocation = () => {
    setLoadingLoc(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setLoadingLoc(false);
      },
      () => {
        alert("Unable to fetch location.");
        setLoadingLoc(false);
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!site || !date || !location.lat || selectedEmployees.length === 0) {
      alert("Please fill all fields, select employees and fetch location.");
      return;
    }
    setSubmitted(true);
    // Here you can send data to backend
  };

  return (
    open && (
      <div style={styles.overlay}>
        <div style={styles.dialog}>
          <h2 style={{ marginBottom: 8, color: "#1a237e" }}>
            Attendance Submission
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontWeight: 500 }}>Site Name:</label>
              <TextField
                select
                label="Site"
                name="site"
                value={site}
                onChange={(e) => setSite(e.target.value)}
                fullWidth
                margin="normal"
                required
              >
                {sites.map((mat) => (
                  <MenuItem key={mat.value} value={mat.value}>
                    {mat.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontWeight: 500 }}>Date:</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={styles.input}
                required
              />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontWeight: 500 }}>Select Employees Present:</label>
              <div style={styles.employeesBox}>
                {employeesList.map((emp) => (
                  <label key={emp} style={styles.empLabel}>
                    <input
                      type="checkbox"
                      value={emp}
                      checked={selectedEmployees.includes(emp)}
                      onChange={handleEmployeeChange}
                    />
                    {emp}
                  </label>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontWeight: 500 }}>Site Location:</label>
              <div>
                <button
                  type="button"
                  onClick={getLocation}
                  style={styles.locBtn}
                  disabled={loadingLoc}
                >
                  {loadingLoc ? "Fetching..." : "Get Current Location"}
                </button>
                {location.lat && (
                  <div style={{ marginTop: 8 }}>
                    <iframe
                      title="Google Map"
                      width="100%"
                      height="180"
                      frameBorder="0"
                      style={{ borderRadius: 8 }}
                      src={`https://maps.google.com/maps?q=${location.lat},${location.lng}&z=16&output=embed`}
                      allowFullScreen
                    />
                    <div style={{ fontSize: 12, color: "#555" }}>
                      Lat: {location.lat.toFixed(5)}, Lng: {location.lng.toFixed(5)}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <button type="submit" style={styles.submitBtn}>
              Submit Attendance
            </button>
          </form>
          {submitted && (
            <div style={styles.summaryBox}>
              <h4>Attendance Submitted!</h4>
              <p>
                <b>{date}</b>, at <b>{site}</b> with Location{" "}
                <span style={{ color: "#1565c0" }}>
                  ({location.lat.toFixed(5)}, {location.lng.toFixed(5)})
                </span>
                , Employees{" "}
                <span style={{ color: "#388e3c" }}>
                  {selectedEmployees.join(", ")}
                </span>{" "}
                are present.
              </p>
            </div>
          )}
          <button onClick={onClose} style={styles.closeBtn}>
            Close
          </button>
        </div>
      </div>
    )
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(30, 42, 73, 0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  dialog: {
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 8px 32px rgba(30,42,73,0.18)",
    padding: 32,
    minWidth: 380,
    maxWidth: 420,
    width: "90%",
    position: "relative",
  },
  input: {
    width: "100%",
    padding: "8px 10px",
    borderRadius: 6,
    border: "1px solid #b0bec5",
    marginTop: 6,
    marginBottom: 6,
    fontSize: 15,
  },
  employeesBox: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px 16px",
    marginTop: 8,
  },
  empLabel: {
    fontSize: 15,
    color: "#222",
    marginRight: 12,
    cursor: "pointer",
  },
  locBtn: {
    marginTop: 8,
    padding: "6px 16px",
    background: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: 500,
  },
  submitBtn: {
    marginTop: 18,
    padding: "10px 24px",
    background: "linear-gradient(90deg,#1976d2,#43a047)",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontWeight: 600,
    fontSize: 16,
    cursor: "pointer",
    width: "100%",
  },
  summaryBox: {
    marginTop: 24,
    background: "#e3f2fd",
    borderRadius: 8,
    padding: 16,
    color: "#222",
    textAlign: "center",
    border: "1px solid #bbdefb",
  },
  closeBtn: {
    marginTop: 16,
    background: "#eee",
    border: "none",
    borderRadius: 6,
    padding: "8px 18px",
    cursor: "pointer",
    fontWeight: 500,
    color: "#333",
    width: "100%",
  },
};

export default Manpower;