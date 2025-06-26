const Machine = require('../models/Machine');
const RefuelHistory = require('../models/RefuelHistory');
const UsageLog = require('../models/UsageLog');

exports.addMachine = async (req, res) => {
    try {
        // Ensure projectId is set from route param
        const { projectId } = req.params;
        const { name, type, serialNumber, fuelCapacity } = req.body;
        if (!projectId || !name || !type) {
            return res.status(400).json({ error: 'projectId, name, and type are required.' });
        }
        const machine = new Machine({
            projectId,
            name,
            type,
            serialNumber,
            fuelCapacity
        });
        await machine.save();
        res.status(201).json(machine);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Create a machine independently (no projectId required)
exports.createMachine = async (req, res) => {
    try {
        const { name, type, serialNumber, fuelCapacity } = req.body;
        if (!name || !type) {
            return res.status(400).json({ error: 'name and type are required.' });
        }
        const machine = new Machine({
            name,
            type,
            serialNumber,
            fuelCapacity
        });
        await machine.save();
        res.status(201).json(machine);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Assign a machine to a project (update projectId)
exports.assignMachineToProject = async (req, res) => {
    try {
        const { machineId, projectId } = req.body;
        if (!machineId || !projectId) {
            return res.status(400).json({ error: 'machineId and projectId are required.' });
        }
        const machine = await Machine.findByIdAndUpdate(
            machineId,
            { projectId },
            { new: true }
        );
        if (!machine) return res.status(404).json({ error: 'Machine not found' });
        res.json(machine);
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

// Log machine usage
exports.logMachineUsage = async (req, res) => {
    try {
        const { machineId } = req.params;
        const { hoursUsed, fuelConsumed, remarks, date } = req.body;

        // Optionally validate input here

        // Check if machine exists
        const machine = await Machine.findById(machineId);
        if (!machine) return res.status(404).json({ error: 'Machine not found' });

        // Save usage log (customize fields as needed)
        const usageLog = new UsageLog({
            vehicleId: machineId,
            timestamp: date ? new Date(date) : new Date(),
            rawData: {
                hoursUsed,
                fuelConsumed,
                remarks
            }
        });
        await usageLog.save();

        res.status(201).json({ message: 'Usage logged', usageLog });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};