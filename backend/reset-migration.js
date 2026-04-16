const fs = require('fs');
const path = require('path');
require('dotenv').config();
const sequelize = require('./src/config/database');

async function resetMigration() {
  try {
    console.log('🔄 Resetting migration...\n');

    // Remove the migration record from SequelizeMeta
    await sequelize.query(`
      DELETE FROM "SequelizeMeta" WHERE name = '20240412-update-formation-enums.js'
    `);

    console.log('✅ Migration record removed from SequelizeMeta');
    console.log('Now you can run: npm run migrate\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

resetMigration();
