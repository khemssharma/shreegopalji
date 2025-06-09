const mongoose = require('mongoose');

const RefuelHistorySchema = new mongoose.Schema({
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    liters: {
        type: Number,
        required: true,
        min: 0
    },
    pricePerLiter: {
        type: Number,
        required: true,
        min: 0
    },
    totalCost: {
        type: Number,
        required: true,
        min: 0
    },
    odometer: {
        type: Number,
        required: true,
        min: 0
    },
    fuelStation: {
        type: String
    },
    notes: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('RefuelHistory', RefuelHistorySchema);