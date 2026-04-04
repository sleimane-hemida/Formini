const { Formation, Category, User } = require('../models');

exports.createFormation = async (req, res, next) => {
  try {
    const { name, categoryId, image } = req.body;
    const trainerId = req.user.id;

    const formation = await Formation.create({
      name,
      categoryId,
      image,
      trainerId
    });

    res.status(201).json({
      message: 'Formation created successfully',
      formation
    });
  } catch (error) {
    next(error);
  }
};

exports.getFormations = async (req, res, next) => {
  try {
    const formations = await Formation.findAll({
      where: { isActive: true },
      include: [
        { model: Category },
        { model: User, as: 'trainer', attributes: ['id', 'name', 'email'] }
      ]
    });

    res.json(formations);
  } catch (error) {
    next(error);
  }
};

exports.getFormationById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const formation = await Formation.findByPk(id, {
      include: [
        { model: Category },
        { model: User, as: 'trainer', attributes: ['id', 'name', 'email'] }
      ]
    });

    if (!formation) {
      return res.status(404).json({ error: 'Formation not found' });
    }

    res.json(formation);
  } catch (error) {
    next(error);
  }
};

exports.updateFormation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, categoryId, image } = req.body;

    const formation = await Formation.findByPk(id);
    if (!formation) {
      return res.status(404).json({ error: 'Formation not found' });
    }

    if (formation.trainerId !== req.user.id && req.user.role !== 'administrateur') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    await formation.update({ name, categoryId, image });
    res.json({ message: 'Formation updated', formation });
  } catch (error) {
    next(error);
  }
};

exports.deleteFormation = async (req, res, next) => {
  try {
    const { id } = req.params;

    const formation = await Formation.findByPk(id);
    if (!formation) {
      return res.status(404).json({ error: 'Formation not found' });
    }

    if (formation.trainerId !== req.user.id && req.user.role !== 'administrateur') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    await formation.destroy();
    res.json({ message: 'Formation deleted' });
  } catch (error) {
    next(error);
  }
};

exports.disableFormation = async (req, res, next) => {
  try {
    const { id } = req.params;

    const formation = await Formation.findByPk(id);
    if (!formation) {
      return res.status(404).json({ error: 'Formation not found' });
    }

    await formation.update({ isActive: false });
    res.json({ message: 'Formation disabled', formation });
  } catch (error) {
    next(error);
  }
};
