const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.post('/attendance', userController.logAttendance);
router.get('/attendance/history', userController.getAttendanceHistory);
router.post('/reset-password', userController.resetPassword);
router.post('/change-password', userController.changePassword);

module.exports = router;