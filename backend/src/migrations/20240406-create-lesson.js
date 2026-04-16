'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Lessons', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      moduleId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Modules',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      titre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ordre: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      image_couverture: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Lessons');
  }
};
