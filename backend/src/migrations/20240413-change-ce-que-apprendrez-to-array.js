module.exports = {
  async up(queryInterface, Sequelize) {
    console.log('🔄 Migration: Changing ce_que_vous_apprendrez from JSON to ARRAY(TEXT)...');
    
    try {
      // Modify the column type from JSON to TEXT[] (ARRAY)
      await queryInterface.sequelize.query(`
        ALTER TABLE "Formations" 
        ALTER COLUMN "ce_que_vous_apprendrez" TYPE text[] 
        USING CASE 
          WHEN "ce_que_vous_apprendrez" IS NULL THEN NULL
          ELSE string_to_array("ce_que_vous_apprendrez"::text, ',')
        END;
      `);

      console.log('✅ ce_que_vous_apprendrez column successfully changed to ARRAY(TEXT)');
    } catch (error) {
      console.error('❌ Error during migration:', error.message);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    console.log('⚠️  Rollback: Changing ce_que_vous_apprendrez back to JSON...');
    
    try {
      await queryInterface.sequelize.query(`
        ALTER TABLE "Formations" 
        ALTER COLUMN "ce_que_vous_apprendrez" TYPE JSON 
        USING to_json("ce_que_vous_apprendrez");
      `);

      console.log('✅ Rollback completed');
    } catch (error) {
      console.error('❌ Error during rollback:', error.message);
      throw error;
    }
  }
};
