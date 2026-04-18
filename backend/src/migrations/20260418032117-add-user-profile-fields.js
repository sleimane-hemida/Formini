'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'prenom', {
      type: Sequelize.STRING,
      allowNull: true,
      trim: true
    });

    await queryInterface.addColumn('Users', 'nom_de_famille', {
      type: Sequelize.STRING,
      allowNull: true,
      trim: true
    });

    await queryInterface.addColumn('Users', 'telephone', {
      type: Sequelize.STRING,
      allowNull: true,
      trim: true
    });

    await queryInterface.addColumn('Users', 'date_naissance', {
      type: Sequelize.DATE,
      allowNull: true
    });

    await queryInterface.addColumn('Users', 'localisation', {
      type: Sequelize.STRING,
      allowNull: true,
      trim: true
    });

    await queryInterface.addColumn('Users', 'biographie', {
      type: Sequelize.TEXT,
      allowNull: true
    });

    await queryInterface.addColumn('Users', 'statut_actuel', {
      type: Sequelize.ENUM('Étudiant(e)', 'Employé(e)', 'Indépendant(e)', 'En recherche d\'emploi', 'Autre'),
      allowNull: true
    });

    await queryInterface.addColumn('Users', 'loisirs_centres_interet', {
      type: Sequelize.TEXT,
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'prenom');
    await queryInterface.removeColumn('Users', 'nom_de_famille');
    await queryInterface.removeColumn('Users', 'telephone');
    await queryInterface.removeColumn('Users', 'date_naissance');
    await queryInterface.removeColumn('Users', 'localisation');
    await queryInterface.removeColumn('Users', 'biographie');
    await queryInterface.removeColumn('Users', 'statut_actuel');
    await queryInterface.removeColumn('Users', 'loisirs_centres_interet');
  }
};
