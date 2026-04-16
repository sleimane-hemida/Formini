'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('FormationAccesses', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      formationId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Formations',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      statut: {
        type: Sequelize.ENUM('en_attente', 'approuvee', 'rejetee'),
        defaultValue: 'en_attente'
      },
      motif_rejet: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('FormationAccesses');
  }
};
