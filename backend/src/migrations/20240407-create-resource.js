'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Resources', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      lessonId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Lessons',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      type: {
        type: Sequelize.ENUM('video', 'pdf'),
        allowNull: false
      },
      url: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      titre: {
        type: Sequelize.STRING,
        allowNull: true
      },
      duree_minutes: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Resources');
  }
};
