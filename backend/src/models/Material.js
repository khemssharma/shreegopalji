const mongoose = require('mongoose');

const MaterialSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  name: String,
  quantity: Number,
  unit: String,
  // Add more fields as needed
});

module.exports = mongoose.model('Material', MaterialSchema);