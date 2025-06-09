const Machine = require('../models/Machine');
const RefuelHistory = require('../models/RefuelHistory');

exports.addMachine = async (req, res) => {
    try {
        const machine = new Machine(req.body);
        await machine.save();
        res.status(201).json(machine);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all machines
exports.getMachines = async (req, res) => {
    try {
        const machines = await Machine.find();
        res.json(machines);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single machine by ID
exports.getMachine = async (req, res) => {
    try {
        const machine = await Machine.findById(req.params.id);
        if (!machine) return res.status(404).json({ error: 'Machine not found' });
        res.json(machine);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a machine by ID
exports.updateMachine = async (req, res) => {
    try {
        const machine = await Machine.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!machine) return res.status(404).json({ error: 'Machine not found' });
        res.json(machine);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Log a refuel event for a machine
exports.logRefuel = async (req, res) => {
    try {
        const { machineId, amount, date } = req.body;
        const refuel = new RefuelHistory({ machine: machineId, amount, date });
        await refuel.save();
        res.status(201).json(refuel);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get refuel history for a machine
exports.getRefuelHistory = async (req, res) => {
    try {
        const refuels = await RefuelHistory.find({ machine: req.params.id }).sort({ date: -1 });
        res.json(refuels);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get GPS data for a machine (assuming GPS data is stored in Machine model)
exports.getGPS = async (req, res) => {
    try {
        const machine = await Machine.findById(req.params.id, 'gps');
        if (!machine) return res.status(404).json({ error: 'Machine not found' });
        res.json(machine.gps);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};