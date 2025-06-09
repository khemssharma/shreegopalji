const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: Date,
  status: String, // present/absent
});

module.exports = mongoose.model('Attendance', AttendanceSchema);