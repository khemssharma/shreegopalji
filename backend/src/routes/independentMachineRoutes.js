const express = require('express');
const machineController = require('../controllers/machineController');
const router = express.Router();

// Create a machine independently
router.post('/create', machineController.createMachine);

// Assign a machine to a project
router.post('/assign', machineController.assignMachineToProject);

// Get all machines (independent or all)
router.get('/', machineController.getMachines);

module.exports = router;