const express = require('express');
const activityController = require('../controllers/activityController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, activityController.createActivity);
router.get('/', activityController.getActivities);

module.exports = router;