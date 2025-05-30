const mongoose = require('mongoose');

const MaterialRequestSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    materialName: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    requestedBy: { type: String, required: true },
    status: { type: String, default: 'pending' },
    requestedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MaterialRequest', MaterialRequestSchema);