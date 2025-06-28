const express = require('express');
const materialController = require('../controllers/materialController');
const upload = require('../middlewares/uploadMiddleware');
const router = express.Router({ mergeParams: true });

router.post('/', materialController.addMaterial);
router.get('/', materialController.getMaterials);
router.get('/:materialId', materialController.getMaterial);
router.put('/:materialId', materialController.updateMaterial);
router.post('/usage', materialController.logUsage);
router.get('/usage/history', materialController.getUsageHistory);
router.get('/stock', materialController.getStock);
router.post('/reorder', materialController.reorderMaterial);
router.get('/reorder/history', materialController.getReorderHistory);
router.get('/:materialId/usage/history', materialController.getUsageHistory);
router.get('/:materialId/stock', materialController.getStock);
router.get('/:materialId/reorder/history', materialController.getReorderHistory);
router.post('/dumped', upload.single('file'), materialController.recordDumpedMaterial);
router.post('/dumped/:id/usage', upload.single('file'), materialController.addUsageToDumpedMaterial);
router.get('/dumped', async (req, res) => {
    try {
        const dumpedMaterials = await require('../models/DumpedMaterial').find();
        res.json(dumpedMaterials);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;