const mongoose = require('mongoose');

const UsageSchema = new mongoose.Schema({
  site: String,
  material: String,
  quantity: Number,
  unit: String,
  date: Date,
  fileUrl: String,
  createdAt: { type: Date, default: Date.now }
});

const DumpedMaterialSchema = new mongoose.Schema({
  site: String,
  material: String,
  quantity: Number,
  unit: String,
  date: Date,
  fileUrl: String,
  createdAt: { type: Date, default: Date.now },
  usage: [UsageSchema] // <-- Add this line
});

module.exports = mongoose.model('DumpedMaterial', DumpedMaterialSchema);