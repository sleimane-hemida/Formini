module.exports = {
  async up(queryInterface, Sequelize) {
    console.log('🔄 Migration: Changing public_cible from JSON to ARRAY(ENUM)...');
    
    try {
      // First, create the ENUM type if it doesn't exist
      await queryInterface.sequelize.query(`
        DO $$ BEGIN
          CREATE TYPE enum_public_cible AS ENUM(
            'Tout le monde',
            'Collégiens & Lycéens',
            'Étudiants en licence',
            'Demandeurs d''emploi',
            'Salariés',
            'Freelances & indépendants',
            'Fonctionnaires',
            'Jeune',
            'Personne âgée',
            'Sans diplôme',
            'Parent',
            'Femme au foyer'
          );
        EXCEPTION WHEN duplicate_object THEN null;
        END $$;
      `);

      // Modify the column type
      await queryInterface.sequelize.query(`
        ALTER TABLE "Formations" 
        ALTER COLUMN "public_cible" TYPE enum_public_cible[] 
        USING CASE 
          WHEN "public_cible" IS NULL THEN NULL
          ELSE "public_cible"::text::enum_public_cible[]
        END;
      `);

      console.log('✅ public_cible column successfully changed to ARRAY(ENUM)');
    } catch (error) {
      console.error('❌ Error during migration:', error.message);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    console.log('⚠️  Rollback: Changing public_cible back to JSON...');
    
    try {
      await queryInterface.sequelize.query(`
        ALTER TABLE "Formations" 
        ALTER COLUMN "public_cible" TYPE JSON 
        USING to_json("public_cible");
      `);

      console.log('✅ Rollback completed');
    } catch (error) {
      console.error('❌ Error during rollback:', error.message);
      throw error;
    }
  }
};
