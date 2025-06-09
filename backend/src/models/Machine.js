const mongoose = require('mongoose');

const MachineSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  name: String,
  type: String,
  serialNumber: String,
  fuelCapacity: Number,
  // Add more fields as needed
});

module.exports = mongoose.model('Machine', MachineSchema);