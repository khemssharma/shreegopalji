const mongoose = require('mongoose');

const ProgressUpdateSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    description: { type: String, required: true },
    progressPercent: { type: Number, required: true, min: 0, max: 100 },
    updatedBy: { type: String, required: true },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ProgressUpdate', ProgressUpdateSchema);