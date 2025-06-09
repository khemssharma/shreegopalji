const mongoose = require('mongoose');

const UsageLogSchema = new mongoose.Schema({
    vehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    speed: {
        type: Number, // km/h
        required: false
    },
    ignitionOn: {
        type: Boolean,
        required: false
    },
    odometer: {
        type: Number, // kilometers
        required: false
    },
    fuelLevel: {
        type: Number, // percentage or liters
        required: false
    },
    rawData: {
        type: Object,
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('UsageLog', UsageLogSchema);