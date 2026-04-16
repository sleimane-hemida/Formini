const { Formation, Category, User, Module, Subcategory } = require('../models');
const { validateNiveau, validatePublicCible, validatePricing, NIVEAUX, PUBLIC_CIBLE_OPTIONS } = require('../utils/formations');

exports.createFormation = async (req, res, next) => {
  try {
    const { name, categoryId, subcategoryId, image, niveau, public_cible, description, description_longue, language } = req.body;
    const trainerId = req.user.id;
    
    console.log('CreateFormation - req.user:', req.user);
    console.log('CreateFormation - trainerId:', trainerId);

    if (niveau && !validateNiveau(niveau)) {
      return res.status(400).json({ error: 'Invalid niveau value', validValues: NIVEAUX });
    }

    if (public_cible && !validatePublicCible(public_cible)) {
      return res.status(400).json({ error: 'Invalid public_cible values', validValues: PUBLIC_CIBLE_OPTIONS });
    }

    const formation = await Formation.create({
      name, categoryId, subcategoryId, image, trainerId, niveau, public_cible, description, description_longue, language,
      statut: 'brouillon'
    });

    res.status(201).json({ message: 'Formation created successfully', formation });
  } catch (error) {
    next(error);
  }
};

exports.getFormationOptions = async (req, res, next) => {
  try {
    res.json({
      niveaux: NIVEAUX,
      public_cible: PUBLIC_CIBLE_OPTIONS,
      statuts: ['brouillon', 'en_attente_validation', 'en_ligne', 'rejetee', 'archivea'],
      languages: ['fr', 'en', 'es', 'de']
    });
  } catch (error) {
    next(error);
  }
};

exports.getFormations = async (req, res, next) => {
  try {
    // Filter by current user (trainerId) - always applied due to verifyToken middleware
    const formations = await Formation.findAll({
      where: {
        trainerId: req.user.id,  // Only show formations created by the authenticated user
        isActive: true
      },
      include: [
        { model: Category },
        { model: User, as: 'trainer', attributes: ['id', 'name', 'email'] },
        { model: Subcategory, as: 'subcategory' }
      ],
      order: [['createdAt', 'DESC']]  // Show most recent first
    });
    
    // Mapper pour ajouter cover_images
    const formationsData = formations.map(formation => {
      const data = formation.toJSON();
      data.cover_images = formation.image ? [formation.image] : [];
      return data;
    });
    
    res.json(formationsData);
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
        { model: User, as: 'trainer', attributes: ['id', 'name', 'email'] },
        { model: Subcategory, as: 'subcategory' }
      ]
    });
    if (!formation) {
      return res.status(404).json({ error: 'Formation not found' });
    }

    // Verify ownership: only trainer or admin can access their formations
    if (formation.trainerId !== req.user.id && req.user.role !== 'administrateur') {
      return res.status(403).json({ error: 'Vous n\'avez pas accès à cette formation' });
    }
    
    // Ajouter cover_images basé sur image
    const formationData = formation.toJSON();
    formationData.cover_images = formation.image ? [formation.image] : [];
    
    console.log('📊 GetFormationById raw:', {
      categoryId: formation.categoryId,
      subcategoryId: formation.subcategoryId,
      Category: formation.Category ? formation.Category.id : 'null',
      Subcategory: formation.subcategory ? formation.subcategory.id : 'null'
    });
    
    console.log('📊 GetFormationById JSON:', {
      description_longue: formationData.description_longue,
      niveau: formationData.niveau,
      categoryId: formationData.categoryId,
      subcategoryId: formationData.subcategoryId,
      Category: formationData.Category,
      Subcategory: formationData.subcategory
    });
    
    res.json(formationData);
  } catch (error) {
    next(error);
  }
};

exports.updateFormation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, description_longue, image, niveau, language, categoryId, subcategoryId, duree_totale_minutes, ce_que_vous_apprendrez, prerequis, public_cible, prix_normal, prix_promo, date_debut_promo, date_fin_promo, est_gratuite, pourcentage_commission, statut, motif_rejet, est_mise_en_avant } = req.body;

    const formation = await Formation.findByPk(id, { include: [{ model: Module, as: 'Modules' }] });
    if (!formation) return res.status(404).json({ error: 'Formation not found' });

    if (formation.trainerId !== req.user.id && req.user.role !== 'administrateur') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    if (niveau !== undefined && niveau !== null && !validateNiveau(niveau)) {
      return res.status(400).json({ error: 'Invalid niveau value', validValues: NIVEAUX });
    }

    if (public_cible !== undefined && public_cible !== null && !validatePublicCible(public_cible)) {
      return res.status(400).json({ error: 'Invalid public_cible values', validValues: PUBLIC_CIBLE_OPTIONS });
    }

    const pricingData = {
      est_gratuite: est_gratuite !== undefined ? est_gratuite : formation.est_gratuite,
      prix_normal: prix_normal !== undefined ? prix_normal : formation.prix_normal,
      prix_promo: prix_promo !== undefined ? prix_promo : formation.prix_promo,
      date_debut_promo: date_debut_promo !== undefined ? date_debut_promo : formation.date_debut_promo,
      date_fin_promo: date_fin_promo !== undefined ? date_fin_promo : formation.date_fin_promo
    };

    if (est_gratuite !== undefined || prix_normal !== undefined || prix_promo !== undefined || date_debut_promo !== undefined || date_fin_promo !== undefined) {
      const pricingErrors = validatePricing(pricingData);
      if (pricingErrors.length > 0) {
        return res.status(400).json({ error: 'Pricing validation failed', errors: pricingErrors });
      }
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (description_longue !== undefined) updateData.description_longue = description_longue;
    if (image !== undefined) updateData.image = image;
    if (niveau !== undefined) updateData.niveau = niveau;
    if (language !== undefined) updateData.language = language;
    if (categoryId !== undefined) updateData.categoryId = categoryId;
    if (subcategoryId !== undefined) updateData.subcategoryId = subcategoryId;
    if (duree_totale_minutes !== undefined) updateData.duree_totale_minutes = duree_totale_minutes;
    if (ce_que_vous_apprendrez !== undefined) updateData.ce_que_vous_apprendrez = ce_que_vous_apprendrez;
    if (prerequis !== undefined) updateData.prerequis = prerequis;
    if (public_cible !== undefined) updateData.public_cible = public_cible;
    if (prix_normal !== undefined) updateData.prix_normal = prix_normal;
    if (prix_promo !== undefined) updateData.prix_promo = prix_promo;
    if (date_debut_promo !== undefined) updateData.date_debut_promo = date_debut_promo;
    if (date_fin_promo !== undefined) updateData.date_fin_promo = date_fin_promo;
    if (est_gratuite !== undefined) updateData.est_gratuite = est_gratuite;
    if (pourcentage_commission !== undefined) updateData.pourcentage_commission = pourcentage_commission;
    if (motif_rejet !== undefined) updateData.motif_rejet = motif_rejet;
    if (est_mise_en_avant !== undefined) updateData.est_mise_en_avant = est_mise_en_avant;

    if (statut !== undefined && req.user.role === 'administrateur') {
      updateData.statut = statut;
      if (statut === 'rejetee' && !motif_rejet) {
        return res.status(400).json({ error: 'Le motif du rejet est required' });
      }
    }

    if (updateData.statut === 'en_ligne' && !formation.published_at) {
      updateData.published_at = new Date();
    }

    // Auto-publish logic: if formation is complete, automatically set to 'en_ligne'
    if (formation.statut === 'brouillon' && !updateData.statut) {
      // Check if tarification is now complete
      const hasPricing = (updateData.est_gratuite !== undefined ? updateData.est_gratuite : formation.est_gratuite) 
        || (updateData.prix_normal !== undefined ? updateData.prix_normal : formation.prix_normal);
      
      // Check if modules exist
      const modules = await Module.findAll({ where: { formationId: id }, raw: true });
      
      if (hasPricing && modules.length > 0) {
        // Check if at least one module has a lesson
        const modulesWithLessons = await Promise.all(
          modules.map(async (mod) => {
            const lessons = await Formation.sequelize.models.Lesson.findOne({ where: { moduleId: mod.id }, raw: true });
            return lessons ? 1 : 0;
          })
        );
        
        if (modulesWithLessons.some(x => x === 1)) {
          updateData.statut = 'en_ligne';
          updateData.published_at = new Date();
        }
      }
    }

    await formation.update(updateData);
    const updatedFormation = await Formation.findByPk(id, {
      include: [
        { model: Category },
        { model: User, as: 'trainer', attributes: ['id', 'name', 'email'] },
        { model: Subcategory, as: 'subcategory' }
      ]
    });
    res.json({ message: 'Formation updated', formation: updatedFormation });
  } catch (error) {
    next(error);
  }
};

exports.deleteFormation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const formation = await Formation.findByPk(id);
    if (!formation) return res.status(404).json({ error: 'Formation not found' });

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
    if (!formation) return res.status(404).json({ error: 'Formation not found' });

    await formation.update({ isActive: false });
    res.json({ message: 'Formation disabled', formation });
  } catch (error) {
    next(error);
  }
};

exports.rejectFormation = async (req, res, next) => {
  try {
    if (req.user.role !== 'administrateur') {
      return res.status(403).json({ error: 'Only admin can reject formations' });
    }

    const { id } = req.params;
    const { motif_rejet } = req.body;

    if (!motif_rejet) {
      return res.status(400).json({ error: 'motif_rejet is required' });
    }

    const formation = await Formation.findByPk(id);
    if (!formation) return res.status(404).json({ error: 'Formation not found' });

    await formation.update({ statut: 'rejetee', motif_rejet });
    res.json({ message: 'Formation rejected', formation });
  } catch (error) {
    next(error);
  }
};

exports.publishFormation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const formation = await Formation.findByPk(id, { include: [{ model: Module }] });

    if (!formation) return res.status(404).json({ error: 'Formation not found' });

    if (formation.trainerId !== req.user.id) {
      return res.status(403).json({ error: 'Only the trainer can publish their formations' });
    }

    if (!formation.Modules || formation.Modules.length === 0) {
      return res.status(400).json({ error: 'Formation must have at least one module' });
    }

    if (!formation.prix_normal && !formation.est_gratuite) {
      return res.status(400).json({ error: 'Formation must have pricing information' });
    }

    await formation.update({ statut: 'en_ligne', published_at: new Date() });

    const updatedFormation = await Formation.findByPk(id, {
      include: [
        { model: Category },
        { model: User, as: 'trainer', attributes: ['id', 'name', 'email'] },
        { model: Subcategory, as: 'subcategory' }
      ]
    });

    res.json({ message: 'Formation published successfully', formation: updatedFormation });
  } catch (error) {
    next(error);
  }
};
