import React from "react";

const projects = [
    {
        title: "Residential Complex - Gopalji Heights",
        description:
            "A premium residential project offering modern amenities, lush green surroundings, and excellent connectivity. Designed for comfort and luxury.",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
        location: "Lucknow, Uttar Pradesh",
        status: "Completed",
    },
    {
        title: "Commercial Plaza - SGIPL Business Park",
        description:
            "A state-of-the-art commercial hub with office spaces, retail outlets, and ample parking. Perfect for growing businesses.",
        image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
        location: "Kanpur, Uttar Pradesh",
        status: "Ongoing",
    },
    {
        title: "Affordable Housing - Gopalji Enclave",
        description:
            "Affordable and quality housing for families, with parks, community centers, and secure gated access.",
        image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80",
        location: "Prayagraj, Uttar Pradesh",
        status: "Upcoming",
    },
];

const ProjectCard = ({ project }) => (
    <div style={{
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        margin: "20px",
        maxWidth: "340px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column"
    }}>
        <img
            src={project.image}
            alt={project.title}
            style={{ width: "100%", height: "180px", objectFit: "cover" }}
        />
        <div style={{ padding: "20px" }}>
            <h2 style={{ margin: "0 0 10px", color: "#1a237e" }}>{project.title}</h2>
            <p style={{ margin: "0 0 10px", color: "#444" }}>{project.description}</p>
            <div style={{ fontSize: "0.95em", color: "#666" }}>
                <strong>Location:</strong> {project.location}
            </div>
            <div style={{
                marginTop: "8px",
                display: "inline-block",
                padding: "4px 12px",
                borderRadius: "8px",
                background: project.status === "Completed" ? "#4caf50" : project.status === "Ongoing" ? "#ff9800" : "#2196f3",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "0.9em"
            }}>
                {project.status}
            </div>
        </div>
    </div>
);

const Projects = () => (
    <div style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e3f2fd 0%, #fffde7 100%)",
        padding: "40px 0"
    }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h1 style={{ color: "#0d47a1", fontSize: "2.8em", margin: 0 }}>
                Our Projects
            </h1>
            <p style={{ color: "#444", fontSize: "1.2em", marginTop: "10px" }}>
                Explore the landmark projects delivered by Shree Gopalji Infratech Pvt. Ltd.
            </p>
        </div>
        <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px"
        }}>
            {projects.map((project, idx) => (
                <ProjectCard key={idx} project={project} />
            ))}
        </div>
    </div>
);

export default Projects;