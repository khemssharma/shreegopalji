const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  activity: { type: String, required: true },
  details: { type: Object },
  time: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Activity', ActivitySchema);