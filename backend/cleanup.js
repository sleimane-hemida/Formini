const { Sequelize } = require('sequelize');
const sequelize = require('./src/config/database');

(async () => {
  try {
    console.log('Arrêt des migrations pour nettoyer la table Formations...');
    
    // Supprimer TOUS les enregistrements SequelizeMeta  
    await sequelize.query(`TRUNCATE "SequelizeMeta"`);
    console.log('✅ Tous les enregistrements SequelizeMeta supprimés');
    
    // Supprimer les tables si elles existent
    await sequelize.query(`DROP TABLE IF EXISTS "Formations", "Modules", "Lessons", "Resources", "Subcategories", "Categories", "FormationAccesses", "Users" CASCADE`);
    console.log('✅ Toutes les tables supprimées');
    
    console.log('✅ Nettoyage terminé. Vous pouvez maintenant lancer: npm run migrate');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
})();
