const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    status: { type: String, enum: ['Ongoing', 'Completed', 'On Hold', 'Cancelled'], default: 'Ongoing' },
    images: [{ type: String }], // URLs or file paths
    amenities: [{ type: String }],
    projectType: { type: String }, // e.g., Residential, Commercial, Industrial
    reraNumber: { type: String },
    totalUnits: { type: Number },
    availableUnits: { type: Number },
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        pincode: { type: String }
    },
    contactInfo: {
        phone: { type: String },
        email: { type: String }
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema);