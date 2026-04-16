const db = require('../models');
const { Module } = db;

// Créer un module
exports.createModule = async (req, res) => {
  try {
    const { formationId, titre, ordre } = req.body;
    const module = await Module.create({ formationId, titre, ordre });
    res.status(201).json(module);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Récupérer tous les modules d'une formation
exports.getModulesByFormation = async (req, res) => {
  try {
    const { formationId } = req.params;
    const modules = await Module.findAll({ where: { formationId }, order: [['ordre', 'ASC']] });
    res.json(modules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer un module par ID
exports.getModuleById = async (req, res) => {
  try {
    const module = await Module.findByPk(req.params.id);
    if (!module) return res.status(404).json({ error: 'Module non trouvé' });
    res.json(module);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour un module
exports.updateModule = async (req, res) => {
  try {
    const { titre, ordre } = req.body;
    const module = await Module.findByPk(req.params.id);
    if (!module) return res.status(404).json({ error: 'Module non trouvé' });
    await module.update({ titre, ordre });
    res.json(module);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer un module
exports.deleteModule = async (req, res) => {
  try {
    const module = await Module.findByPk(req.params.id);
    if (!module) return res.status(404).json({ error: 'Module non trouvé' });
    await module.destroy();
    res.json({ message: 'Module supprimé' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
