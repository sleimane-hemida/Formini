const { Subcategory } = require('../models');

// Créer une sous-catégorie
exports.createSubcategory = async (req, res) => {
  try {
    const { name, description, categoryId } = req.body;
    const subcategory = await Subcategory.create({ name, description, categoryId });
    res.status(201).json(subcategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Récupérer toutes les sous-catégories (avec filtrage optionnel par categoryId)
exports.getAllSubcategories = async (req, res) => {
  try {
    const { categoryId } = req.query;
    const where = categoryId ? { categoryId } : {};
    const subcategories = await Subcategory.findAll({ where });
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer une sous-catégorie par ID
exports.getSubcategoryById = async (req, res) => {
  try {
    const subcategory = await Subcategory.findByPk(req.params.id);
    if (!subcategory) return res.status(404).json({ error: 'Sous-catégorie non trouvée' });
    res.json(subcategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour une sous-catégorie
exports.updateSubcategory = async (req, res) => {
  try {
    const { name, description, categoryId } = req.body;
    const subcategory = await Subcategory.findByPk(req.params.id);
    if (!subcategory) return res.status(404).json({ error: 'Sous-catégorie non trouvée' });
    await subcategory.update({ name, description, categoryId });
    res.json(subcategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer une sous-catégorie
exports.deleteSubcategory = async (req, res) => {
  try {
    const subcategory = await Subcategory.findByPk(req.params.id);
    if (!subcategory) return res.status(404).json({ error: 'Sous-catégorie non trouvée' });
    await subcategory.destroy();
    res.json({ message: 'Sous-catégorie supprimée' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
