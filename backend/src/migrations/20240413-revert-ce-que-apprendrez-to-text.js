module.exports = {
  async up(queryInterface, Sequelize) {
    console.log('🔄 Migration: Changing ce_que_vous_apprendrez from ARRAY(TEXT) back to TEXT...');
    
    try {
      // Modify the column type from ARRAY back to TEXT
      await queryInterface.sequelize.query(`
        ALTER TABLE "Formations" 
        ALTER COLUMN "ce_que_vous_apprendrez" TYPE TEXT 
        USING CASE 
          WHEN "ce_que_vous_apprendrez" IS NULL THEN NULL
          ELSE array_to_string("ce_que_vous_apprendrez", ', ')
        END;
      `);

      console.log('✅ ce_que_vous_apprendrez column successfully changed back to TEXT');
    } catch (error) {
      console.error('❌ Error during migration:', error.message);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    console.log('⚠️  Rollback: Changing ce_que_vous_apprendrez back to ARRAY(TEXT)...');
    
    try {
      await queryInterface.sequelize.query(`
        ALTER TABLE "Formations" 
        ALTER COLUMN "ce_que_vous_apprendrez" TYPE text[] 
        USING string_to_array("ce_que_vous_apprendrez", ',');
      `);

      console.log('✅ Rollback completed');
    } catch (error) {
      console.error('❌ Error during rollback:', error.message);
      throw error;
    }
  }
};
