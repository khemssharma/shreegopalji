import React from "react";

// All images are now real road/expressway themed
const projects = [
    {
        title: "Chittorgarh-Kota Expressway",
        description:
            "A completed expressway project connecting Chittorgarh and Kota, boosting connectivity and economic growth in Rajasthan.",
        image: "https://etimg.etb2bimg.com/photo/120061326.cms", // Road
        location: "Rajasthan",
        status: "Completed in 2025",
    },
    {
        title: "Sanchi Expressway",
        description: "A major expressway project at Sanchi, facilitating faster travel and regional development in Madhya Pradesh.",
        image: "https://static2.tripoto.com/media/filter/tst/img/1821754/SpotDocument/1593177763_1593177752236.jpg.webp", // Road
        location: "Bhopal, Madhya Pradesh",
        status: "Completed in 2025",
    },
    {
        title: "Indore-Dhar Road Maintenance",
        description: "Upgradation and maintenance of the Indore-Dhar road, ensuring smooth transit and improved safety standards.",
        image: "https://infrastructurereportcard.org/wp-content/uploads/2017/01/roads-slide-in_Mt-Vernon-VA-Road-Gordon-Chaffin-1.jpg", // Road
        location: "Indore, Madhya Pradesh",
        status: "Completed in 2025",
    },
    {
        title: "Tiger Coridor Expressway",
        description: "A strategic expressway project through the Tiger Corridor, enhancing wildlife connectivity and eco-tourism.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Road_in_Norway.jpg/1200px-Road_in_Norway.jpg", // Road
        location: "Madhya Pradesh",
        status: "Completed in 2025",
    },
    {
        title: "Service Road",
        description:
            "Construction of service roads for better local access and traffic management alongside main expressways.",
        image: "https://content.jdmagicbox.com/comp/damoh/c3/9999p7812.7812.190727071442.u4c3/catalogue/geetanjali-pavers-production-road-damoh-paver-block-dealers-i6j2kf64dl.jpg", // Road
        location: "Obedullaganj, Madhya Pradesh",
        status: "Ongoing",
    },
    {
        title: "Entry-Exit System for Expressway",
        description:
            "Development of modern entry and exit systems for expressways, ensuring smooth and safe vehicle movement.",
        image: "https://www.sehinc.com/hs-fs/hubfs/Website/Blog-News/interchanges/AWI_002.jpg?width=1000&name=AWI_002.jpg", // Road
        location: "Itarsi, Madhya Pradesh",
        status: "Ongoing",
    },
    {
        title: "Public Sanitary Utility",
        description:
            "Construction of public sanitary utilities along highways for the convenience and hygiene of travelers.",
        image: "https://pbs.twimg.com/media/Etsyn3yUUAEKDp9.jpg:large", // Road
        location: "Jabalpur, Madhya Pradesh",
        status: "Ongoing",
    },
    {
        title: "Sandalpur-Nasrullahganj Expressway",
        description:
            "A vital expressway project connecting Sandalpur and Nasrullahganj, improving regional transport and logistics.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Road_in_Norway.jpg/1200px-Road_in_Norway.jpg", // Road
        location: "Nasrullahganj, Madhya Pradesh",
        status: "Ongoing",
    },
    {
        title: "Canal Crossing Structure",
        description:
            "Engineering and construction of canal crossing structures to support uninterrupted road connectivity.",
        image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEihao0I_ErM43XHNoqS4fs5RbDdCgyN-XfPARB2_h3a2urJ0qqwm2nyuhMNBRFH6ypDAX07WIkEdGC63Qu3Iec1MyyRtov3Cu6_y38Fd1gd75tQzJvA27yZgR3hcjq8T5R-O9_d6ARk5Kjy/?imgmax=800", // Road
        location: "Rewa-Katni, Madhya Pradesh",
        status: "Ongoing",
    },
    {
        title: "Tiger Coridor Expressway",
        description:
            "Ongoing expansion of the Tiger Corridor Expressway to further enhance connectivity and eco-tourism.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Road_in_Norway.jpg/1200px-Road_in_Norway.jpg", // Road
        location: "Madhya Pradesh",
        status: "Ongoing",
    },
    {
        title: "Indore-Dewas Expressway",
        description:
            "Construction of the Indore-Dewas Expressway, a key route for industrial and passenger traffic.",
        image: "https://infrastructurereportcard.org/wp-content/uploads/2017/01/roads-slide-in_Mt-Vernon-VA-Road-Gordon-Chaffin-1.jpg", // Road
        location: "Dewas, Madhya Pradesh",
        status: "Ongoing",
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
                background: project.status.includes("Completed") ? "#4caf50" : project.status === "Ongoing" ? "#ff9800" : "#2196f3",
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

const CompletedProjects = () => {
    const completed = projects.filter(
        (p) => p.status && p.status.toLowerCase().includes("completed")
    );
    return (
        <div style={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #e3f2fd 0%, #fffde7 100%)",
            padding: "40px 0"
        }}>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
                <h1 style={{ color: "#0d47a1", fontSize: "2.8em", margin: 0 }}>
                    Completed Projects
                </h1>
                <p style={{ color: "#444", fontSize: "1.2em", marginTop: "10px" }}>
                    Explore the completed landmark projects delivered by Shree Gopalji Infratech Pvt. Ltd.
                </p>
            </div>
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "20px"
            }}>
                {completed.map((project, idx) => (
                    <ProjectCard key={idx} project={project} />
                ))}
            </div>
        </div>
    );
};

export { Projects, CompletedProjects };