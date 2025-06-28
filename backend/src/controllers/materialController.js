const Material = require('../models/Material');
const UsageLog = require('../models/UsageLog');
const ReorderLog = require('../models/ReorderLog');
const DumpedMaterial = require('../models/DumpedMaterial');
const path = require('path');

// Add a new material
exports.addMaterial = async (req, res) => {
    try {
        const material = new Material(req.body);
        await material.save();
        res.status(201).json(material);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all materials
exports.getMaterials = async (req, res) => {
    try {
        const dumpedMaterials = await DumpedMaterial.find();
        res.json(dumpedMaterials);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single material by ID
exports.getMaterial = async (req, res) => {
    try {
        const material = await DumpedMaterial.findById(req.params.id);
        if (!material) return res.status(404).json({ error: 'Material not found' });
        res.json(material);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a material by ID
exports.updateMaterial = async (req, res) => {
    try {
        const material = await Material.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!material) return res.status(404).json({ error: 'Material not found' });
        res.json(material);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Log material usage
exports.logUsage = async (req, res) => {
    try {
        const { materialId, quantity, usedBy } = req.body;
        const material = await Material.findById(materialId);
        if (!material) return res.status(404).json({ error: 'Material not found' });
        if (material.stock < quantity) return res.status(400).json({ error: 'Insufficient stock' });

        material.stock -= quantity;
        await material.save();

        const usageLog = new UsageLog({ material: materialId, quantity, usedBy });
        await usageLog.save();

        res.status(201).json(usageLog);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get usage history for a material
exports.getUsageHistory = async (req, res) => {
    try {
        const logs = await UsageLog.find({ material: req.params.id }).sort({ createdAt: -1 });
        res.json(logs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get current stock for a material
exports.getStock = async (req, res) => {
    try {
        const material = await Material.findById(req.params.id);
        if (!material) return res.status(404).json({ error: 'Material not found' });
        res.json({ stock: material.stock });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Reorder material (increase stock)
exports.reorderMaterial = async (req, res) => {
    try {
        const { materialId, quantity, reorderedBy } = req.body;
        const material = await Material.findById(materialId);
        if (!material) return res.status(404).json({ error: 'Material not found' });

        material.stock += quantity;
        await material.save();

        const reorderLog = new ReorderLog({ material: materialId, quantity, reorderedBy });
        await reorderLog.save();

        res.status(201).json(reorderLog);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get reorder history for a material
exports.getReorderHistory = async (req, res) => {
    try {
        const logs = await ReorderLog.find({ material: req.params.id }).sort({ createdAt: -1 });
        res.json(logs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Record dumped material
exports.recordDumpedMaterial = async (req, res) => {
  try {
    const { site, material, quantity, unit, date } = req.body;
    let fileUrl = null;
    if (req.file) {
      fileUrl = `/uploads/${req.file.filename}`;
    }
    const dumped = await DumpedMaterial.create({
      site,
      material,
      quantity,
      unit,
      date,
      fileUrl
    });
    res.status(201).json(dumped);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.addUsageToDumpedMaterial = async (req, res) => {
  try {
    const { id } = req.params; // DumpedMaterial ID
    const { site, material, quantity, unit, date } = req.body;
    let fileUrl = null;
    if (req.file) {
      fileUrl = `/uploads/${req.file.filename}`;
    }
    const usageEntry = { site, material, quantity, unit, date, fileUrl };
    const dumpedMaterial = await DumpedMaterial.findByIdAndUpdate(
      id,
      { $push: { usage: usageEntry } },
      { new: true }
    );
    if (!dumpedMaterial) return res.status(404).json({ error: 'Dumped material not found' });
    res.status(201).json(dumpedMaterial);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};