'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Ajouter l'index de clé étrangère pour subcategoryId
    await queryInterface.addConstraint('Formations', {
      fields: ['subcategoryId'],
      type: 'foreign key',
      name: 'fk_formations_subcategoryId',
      references: {
        table: 'Subcategories',
        field: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Formations', 'fk_formations_subcategoryId');
  }
};
