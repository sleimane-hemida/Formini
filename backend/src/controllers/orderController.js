const { Order, Formation, User, Module, Lesson, Category } = require('../models');

// Créer une commande (quand apprenant clique "Acheter")
exports.createOrder = async (req, res, next) => {
  try {
    const { formationId } = req.body;
    const userId = req.user.id; // De verifyToken

    // Vérifier que la formation existe
    const formation = await Formation.findByPk(formationId);
    if (!formation) {
      return res.status(404).json({ error: 'Formation non trouvée' });
    }

    // Vérifier si l'apprenant a déjà acheté cette formation
    const existingOrder = await Order.findOne({
      where: { userId, formationId }
    });

    if (existingOrder) {
      return res.status(400).json({ 
        error: 'Vous avez déjà acheté cette formation',
        order: existingOrder 
      });
    }

    // Créer la commande
    const order = await Order.create({
      userId,
      formationId,
      status: 'en_attente'
    });

    res.status(201).json({ 
      message: 'Commande créée avec succès',
      order 
    });
  } catch (error) {
    next(error);
  }
};

// Récupérer les formations achetées par l'apprenant
exports.getMyFormations = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const orders = await Order.findAll({
      where: { userId },
      include: [
        {
          model: Formation,
          attributes: [
            'id', 'name', 'description', 'image', 'duree_totale_minutes',
            'prix_normal', 'prix_promo', 'est_gratuite', 'language',
            'categoryId', 'niveau', 'ce_que_vous_apprendrez', 'trainerId'
          ],
          include: [
            { model: Category, attributes: ['id', 'name'] },
            { 
              model: User,
              as: 'trainer',
              attributes: ['id', 'prenom', 'nom_de_famille', 'avatar']
            },
            { 
              model: Module,
              as: 'Modules',
              attributes: ['id', 'titre'],
              include: [
                {
                  model: Lesson,
                  as: 'Lessons',
                  attributes: ['id', 'titre']
                }
              ]
            }
          ]
        }
      ]
    });

    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// Récupérer les détails d'une commande
exports.getOrderById = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.id;

    const order = await Order.findOne({
      where: { id: orderId, userId },
      include: [
        {
          model: Formation,
          include: [
            { model: Category, attributes: ['id', 'name'] },
            { 
              model: Module,
              as: 'Modules',
              include: [
                {
                  model: Lesson,
                  as: 'Lessons'
                }
              ]
            }
          ]
        }
      ]
    });

    if (!order) {
      return res.status(404).json({ error: 'Commande non trouvée' });
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
};
