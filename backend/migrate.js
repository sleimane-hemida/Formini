const fs = require('fs');
const path = require('path');
require('dotenv').config();
const sequelize = require('./src/config/database');

async function runMigrations() {
  try {
    console.log('🚀 Starting migrations...\n');

    // Create SequelizeMeta table if it doesn't exist
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS "SequelizeMeta" (
        "name" varchar(255) PRIMARY KEY
      );
    `);

    // Get list of migrations already executed
    const [executedMigrations] = await sequelize.query(
      `SELECT name FROM "SequelizeMeta" ORDER BY name;`
    );

    const executedNames = executedMigrations.map(m => m.name);

    // Get list of migration files
    const migrationsDir = path.join(__dirname, 'src/migrations');
    const files = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.js'))
      .sort();

    console.log(`📋 Found ${files.length} migration files`);
    console.log(`✅ Already executed: ${executedNames.length}\n`);

    let executed = 0;

    // Execute pending migrations
    for (const file of files) {
      if (executedNames.includes(file)) {
        console.log(`⏭️  Skipping already executed: ${file}`);
        continue;
      }

      try {
        console.log(`🔄 Executing: ${file}`);
        const migration = require(path.join(migrationsDir, file));

        // Execute migration
        await migration.up(sequelize.getQueryInterface(), sequelize.constructor);

        // Record migration
        await sequelize.query(
          `INSERT INTO "SequelizeMeta" (name) VALUES (:name)`,
          {
            replacements: { name: file },
            type: sequelize.QueryTypes.INSERT
          }
        );

        console.log(`✅ Successfully executed: ${file}\n`);
        executed++;
      } catch (error) {
        console.error(`❌ Failed to execute: ${file}`);
        console.error(`   Error: ${error.message}\n`);
        throw error;
      }
    }

    console.log(`\n✨ Migration complete! ${executed} new migrations executed.`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

runMigrations();
