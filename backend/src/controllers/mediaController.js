const path = require('path');
const fs = require('fs');
const Media = require('../models/mediaModel');
const cloudinary = require('cloudinary').v2;

// Upload media
exports.uploadMedia = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        // Upload file to Cloudinary
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });

        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: 'auto',
        });

        // Remove local file after upload
        fs.unlinkSync(req.file.path);

        const media = new Media({
            filename: result.public_id,
            originalName: req.file.originalname,
            mimeType: req.file.mimetype,
            size: req.file.size,
            url: result.secure_url,
            cloudinaryId: result.public_id,
        });
        await media.save();
        res.status(201).json(media);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all media
exports.getAllMedia = async (req, res) => {
    try {
        const media = await Media.find();
        res.json(media);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single media by ID
exports.getMediaById = async (req, res) => {
    try {
        const media = await Media.findById(req.params.id);
        if (!media) {
            return res.status(404).json({ message: 'Media not found' });
        }
        res.json(media);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Download media file
exports.downloadMedia = async (req, res) => {
    try {
        const media = await Media.findById(req.params.id);
        if (!media) {
            return res.status(404).json({ message: 'Media not found' });
        }
        res.download(path.resolve(media.path), media.originalName);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete media
exports.deleteMedia = async (req, res) => {
    try {
        const media = await Media.findById(req.params.id);
        if (!media) {
            return res.status(404).json({ message: 'Media not found' });
        }
        // Remove file from disk
        fs.unlinkSync(path.resolve(media.path));
        await media.deleteOne();
        res.json({ message: 'Media deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};