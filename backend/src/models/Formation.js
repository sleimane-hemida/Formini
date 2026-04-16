const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Formation = sequelize.define('Formation', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  description_longue: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  niveau: {
    type: DataTypes.ENUM('debutant', 'intermediaire', 'avance'),
    allowNull: true
  },
  language: {
    type: DataTypes.STRING,
    defaultValue: 'fr'
  },
  duree_totale_minutes: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  ce_que_vous_apprendrez: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  prerequis: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  public_cible: {
    type: DataTypes.ARRAY(DataTypes.ENUM(
      'Tout le monde',
      'Collégiens & Lycéens',
      'Étudiants en licence',
      "Demandeurs d'emploi",
      'Salariés',
      'Freelances & indépendants',
      'Fonctionnaires',
      'Jeune',
      'Personne âgée',
      'Sans diplôme',
      'Parent',
      'Femme au foyer'
    )),
    allowNull: true
  },
  categoryId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  subcategoryId: {
    type: DataTypes.UUID,
    allowNull: true
  },
  trainerId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  prix_normal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  prix_promo: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true
  },
  date_debut_promo: {
    type: DataTypes.DATE,
    allowNull: true
  },
  date_fin_promo: {
    type: DataTypes.DATE,
    allowNull: true
  },
  est_gratuite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  pourcentage_commission: {
    type: DataTypes.DECIMAL(5, 2),
    defaultValue: 10
  },
  statut: {
    type: DataTypes.ENUM('brouillon', 'en_attente_validation', 'en_ligne', 'rejetee', 'archivea'),
    defaultValue: 'brouillon'
  },
  motif_rejet: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  est_mise_en_avant: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  nombre_ventes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  note_moyenne: {
    type: DataTypes.DECIMAL(3, 1),
    allowNull: true
  },
  nombre_avis: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  nombre_vues: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  published_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  archived_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: true
});

// Associations will be defined in a separate file to avoid circular dependencies
// Formation.associate = (models) => {
//   Formation.belongsTo(models.User, { foreignKey: 'trainerId', as: 'trainer' });
//   Formation.belongsTo(models.Category, { foreignKey: 'categoryId' });
//   Formation.belongsTo(models.Subcategory, { foreignKey: 'subcategoryId' });
//   Formation.hasMany(models.Module, { foreignKey: 'formationId', onDelete: 'CASCADE' });
//   Formation.hasMany(models.FormationAccess, { foreignKey: 'formationId', onDelete: 'CASCADE' });
// };

module.exports = Formation;
