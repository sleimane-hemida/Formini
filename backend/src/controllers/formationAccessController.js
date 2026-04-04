const { FormationAccess, Formation, User, Category } = require('../models');

exports.requestAccess = async (req, res, next) => {
  try {
    const { formationId } = req.body;
    const userId = req.user.id;

    const formation = await Formation.findByPk(formationId);
    if (!formation) {
      return res.status(404).json({ error: 'Formation not found' });
    }

    const existing = await FormationAccess.findOne({
      where: { userId, formationId }
    });

    if (existing) {
      return res.status(409).json({ error: 'Access already requested' });
    }

    const access = await FormationAccess.create({
      userId,
      formationId,
      status: 'pending'
    });

    res.status(201).json({
      message: 'Access request submitted',
      access
    });
  } catch (error) {
    next(error);
  }
};

exports.getPendingRequests = async (req, res, next) => {
  try {
    const requests = await FormationAccess.findAll({
      where: { status: 'pending' },
      include: [
        { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
        { model: Formation, attributes: ['id', 'name'] }
      ]
    });

    res.json(requests);
  } catch (error) {
    next(error);
  }
};

exports.approveAccess = async (req, res, next) => {
  try {
    const { accessId } = req.params;
    const adminId = req.user.id;

    const access = await FormationAccess.findByPk(accessId);
    if (!access) {
      return res.status(404).json({ error: 'Access request not found' });
    }

    await access.update({
      status: 'approved',
      approvedAt: new Date(),
      approvedBy: adminId
    });

    res.json({ message: 'Access approved', access });
  } catch (error) {
    next(error);
  }
};

exports.rejectAccess = async (req, res, next) => {
  try {
    const { accessId } = req.params;

    const access = await FormationAccess.findByPk(accessId);
    if (!access) {
      return res.status(404).json({ error: 'Access request not found' });
    }

    await access.update({ status: 'rejected' });
    res.json({ message: 'Access rejected' });
  } catch (error) {
    next(error);
  }
};

exports.getUserFormations = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const formations = await FormationAccess.findAll({
      where: { userId, status: 'approved' },
      include: [
        { 
          model: Formation,
          include: [
            { model: Category },
            { model: User, as: 'trainer', attributes: ['id', 'name'] }
          ]
        }
      ]
    });

    res.json(formations);
  } catch (error) {
    next(error);
  }
};
