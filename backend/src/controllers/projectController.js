const ProgressUpdate = require('../models/ProgressUpdate');
const MaterialRequest = require('../models/MaterialRequest');

const addProgress = async (req, res) => {
    const { projectId, description, progressPercent, updatedBy } = req.body;

    // Validate required fields
    if (!projectId || !description || progressPercent === undefined || !updatedBy) {
        return res.status(400).json({ error: 'Missing required fields.' });
    }

    // Validate progressPercent is a number between 0 and 100
    if (typeof progressPercent !== 'number' || progressPercent < 0 || progressPercent > 100) {
        return res.status(400).json({ error: 'Progress percent must be a number between 0 and 100.' });
    }

    // Validate description and updatedBy are non-empty strings
    if (typeof description !== 'string' || description.trim() === '') {
        return res.status(400).json({ error: 'Description must be a non-empty string.' });
    }
    if (typeof updatedBy !== 'string' || updatedBy.trim() === '') {
        return res.status(400).json({ error: 'Updated by must be a non-empty string.' });
    }

    try {
        const progressUpdate = await ProgressUpdate.create({
            projectId,
            description,
            progressPercent,
            updatedBy
        });
        res.status(201).json({
            message: 'Progress update added!',
            progressUpdate
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add progress update.' });
    }
};

const requestMaterial = async (req, res) => {
    // Extract material request details from the request body
    const { projectId, materialName, quantity, requestedBy } = req.body;

    // Simple validation
    if (!projectId || !materialName || !quantity || !requestedBy) {
        return res.status(400).json({ error: 'Missing required fields.' });
    }
    // Check if quantity is a positive number
    if (typeof quantity !== 'number' || quantity <= 0) {
        return res.status(400).json({ error: 'Quantity must be a positive number.' });
    }

    // Optionally, check if materialName is a non-empty string
    if (typeof materialName !== 'string' || materialName.trim() === '') {
        return res.status(400).json({ error: 'Material name must be a non-empty string.' });
    }

    // Optionally, check if requestedBy is a non-empty string
    if (typeof requestedBy !== 'string' || requestedBy.trim() === '') {
        return res.status(400).json({ error: 'Requested by must be a non-empty string.' });
    }

    try {
        const materialRequest = await MaterialRequest.create({
            projectId,
            materialName,
            quantity,
            requestedBy
        });
        res.status(201).json({
            message: 'Material request submitted!',
            materialRequest
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to submit material request.' });
    }
};

const getActivities = async (req, res) => {
    try {
        const progressUpdates = await ProgressUpdate.find().sort({ updatedAt: -1 });
        const materialRequests = await MaterialRequest.find().sort({ requestedAt: -1 });
        res.json({ progressUpdates, materialRequests });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch activities.' });
    }
};

// --- Add these stubs ---
const getAllProjects = async (req, res) => {
    res.status(200).json({ message: "getAllProjects not implemented yet." });
};
const getProjectById = async (req, res) => {
    res.status(200).json({ message: "getProjectById not implemented yet." });
};
const createProject = async (req, res) => {
    res.status(200).json({ message: "createProject not implemented yet." });
};
const updateProject = async (req, res) => {
    res.status(200).json({ message: "updateProject not implemented yet." });
};
const deleteProject = async (req, res) => {
    res.status(200).json({ message: "deleteProject not implemented yet." });
};

// --- Add them to exports ---
module.exports = {
    addProgress,
    requestMaterial,
    getActivities,
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
};