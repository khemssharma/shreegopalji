import React from 'react';

const services = [
  {
    title:"Highway Construction",
    description: "Expertise in constructing and maintaining highways, ensuring safety and durability.",
    icon: "🛣️",
  },
  {
    title: "Infrastructure Development",
    description: "Comprehensive infrastructure solutions including roads, bridges, and utilities to support urban growth.",
    icon: "🏗️",
  },
  {
    title: "Commercial Projects",
    description: "Expertise in commercial complexes, office spaces, and retail outlets with a focus on functionality and aesthetics.",
    icon: "🏢",
  },
  {
    title: "Renovation & Remodeling",
    description: "Transform your existing spaces with our renovation and remodeling services, ensuring quality and timely delivery.",
    icon: "🔨",
  },
 {
    title: "Interior Designing",
    description: "Creative and practical interior solutions for homes and offices, blending style with comfort.",
    icon: "🛋️",
  }

];

const Services = () => (
  <div style={{ padding: '2rem', background: '#f9f9f9', minHeight: '100vh' }}>
    <h1 style={{ textAlign: 'center', color: '#1a237e', marginBottom: '1rem' }}>
      Our Services
    </h1>
    <p style={{ textAlign: 'center', color: '#444', maxWidth: 600, margin: '0 auto 2rem' }}>
      Shree Gopalji Infratech Pvt. Ltd. delivers excellence in construction, design, and project management. Explore our wide range of services designed to turn your vision into reality.
    </p>
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '2rem',
      maxWidth: 1200,
      margin: '0 auto'
    }}>
      {services.map((service, idx) => (
        <div key={idx} style={{
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 4px 16px rgba(60,72,88,0.08)',
          padding: '2rem',
          textAlign: 'center',
          transition: 'transform 0.2s',
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>{service.icon}</div>
          <h2 style={{ color: '#283593', marginBottom: 12 }}>{service.title}</h2>
          <p style={{ color: '#555' }}>{service.description}</p>
        </div>
      ))}
    </div>
  </div>
);

export default Services;