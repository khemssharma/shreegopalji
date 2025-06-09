const express = require('express');
const machineController = require('../controllers/machineController');
const router = express.Router({ mergeParams: true });

router.post('/', machineController.addMachine);
router.get('/', machineController.getMachines);
router.get('/:machineId', machineController.getMachine);
router.put('/:machineId', machineController.updateMachine);
router.post('/:machineId/refuel', machineController.logRefuel);
router.get('/:machineId/refuel/history', machineController.getRefuelHistory);
router.get('/:machineId/gps', machineController.getGPS);

module.exports = router;