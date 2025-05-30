const express = require('express');
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Example routes (customize as needed)
router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);
router.post('/', authMiddleware, projectController.createProject);
router.put('/:id', authMiddleware, projectController.updateProject);
router.delete('/:id', authMiddleware, projectController.deleteProject);

// Add progress update
router.post('/progress', authMiddleware, projectController.addProgress);

// Request material
router.post('/material-request', authMiddleware, projectController.requestMaterial);

// Get all activities for a site/project
router.get('/activities', authMiddleware, projectController.getActivities);

module.exports = router;