const mongoose = require('mongoose');

const ReorderLogSchema = new mongoose.Schema({
    materialId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Material',
        required: true
    },
    orderQuantity: {
        type: Number,
        required: true
    },
    orderedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['ordered', 'received', 'cancelled'],
        default: 'ordered'
    },
    remarks: {
        type: String
    }
});

module.exports = mongoose.model('ReorderLog', ReorderLogSchema);