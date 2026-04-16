module.exports = {
  async up(queryInterface, Sequelize) {
    console.log('🗑️  Suppression de toutes les sous-catégories...');
    await queryInterface.sequelize.query('DELETE FROM "Subcategories"');
    
    console.log('🗑️  Suppression de toutes les catégories...');
    await queryInterface.sequelize.query('DELETE FROM "Categories"');
    
    console.log('✅ Tables Category et Subcategory vidées avec succès');
  },

  async down(queryInterface, Sequelize) {
    console.log('⚠️  Rollback - recréation des catégories annulée');
  }
};
