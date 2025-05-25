const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema(
    {
        url: {
            type: String,
            required: true,
            trim: true,
        },
        type: {
            type: String,
            enum: ['image', 'video', 'audio', 'document'],
            required: true,
        },
        title: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        metadata: {
            type: Object,
            default: {},
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Media', mediaSchema);