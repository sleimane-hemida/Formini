'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Formations', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      description_longue: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      image: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      niveau: {
        type: Sequelize.ENUM('debutant', 'intermediaire', 'avance'),
        allowNull: true
      },
      language: {
        type: Sequelize.STRING,
        defaultValue: 'fr'
      },
      duree_totale_minutes: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      ce_que_vous_apprendrez: {
        type: Sequelize.JSON,
        allowNull: true
      },
      prerequis: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      public_cible: {
        type: Sequelize.STRING,
        allowNull: true
      },
      categoryId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      subcategoryId: {
        type: Sequelize.UUID,
        allowNull: true
      },
      trainerId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      prix_normal: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      prix_promo: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      date_debut_promo: {
        type: Sequelize.DATE,
        allowNull: true
      },
      date_fin_promo: {
        type: Sequelize.DATE,
        allowNull: true
      },
      est_gratuite: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      pourcentage_commission: {
        type: Sequelize.DECIMAL(5, 2),
        defaultValue: 10
      },
      statut: {
        type: Sequelize.ENUM('brouillon', 'en_attente_validation', 'publiee', 'rejetee', 'archivee'),
        defaultValue: 'brouillon'
      },
      motif_rejet: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      est_mise_en_avant: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      nombre_ventes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      note_moyenne: {
        type: Sequelize.DECIMAL(3, 1),
        allowNull: true
      },
      nombre_avis: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      nombre_vues: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      published_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      archived_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Formations');
  }
};
