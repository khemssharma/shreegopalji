const express = require('express');

const router = express.Router();

// Example controller functions (replace with your actual controllers)
const mediaController = {
    uploadMedia: (req, res) => {
        // Handle media upload logic here
        res.send('Media uploaded');
    },
    getMedia: (req, res) => {
        // Handle fetching media logic here
        res.send('Media fetched');
    },
    deleteMedia: (req, res) => {
        // Handle deleting media logic here
        res.send('Media deleted');
    }
};

// Routes
router.post('/upload', mediaController.uploadMedia);
router.get('/:id', mediaController.getMedia);
router.delete('/:id', mediaController.deleteMedia);

module.exports = router;