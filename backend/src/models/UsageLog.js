const mongoose = require('mongoose');

const usageLogSchema = new mongoose.Schema({
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Machine',
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  rawData: {
    hoursUsed: Number,
    fuelConsumed: Number,
    remarks: String,
  },
});

module.exports = mongoose.model('UsageLog', usageLogSchema);