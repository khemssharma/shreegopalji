const Activity = require('../models/Activity');

exports.createActivity = async (req, res) => {
  try {
    const { projectId, activity, details, time } = req.body;
    const createdBy = req.user ? req.user.id : undefined;
    const newActivity = await Activity.create({ projectId, activity, details, time, createdBy });
    res.status(201).json(newActivity);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getActivities = async (req, res) => {
  try {
    const { projectId } = req.query;
    const filter = projectId ? { projectId } : {};
    const activities = await Activity.find(filter).sort({ time: -1 }).limit(50);
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};