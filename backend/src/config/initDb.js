const db = require('../models');

async function initializeDatabase() {
  try {
    await db.sequelize.authenticate();
    console.log('✅ PostgreSQL connected successfully');
    
    await db.sequelize.sync({ alter: false });
    console.log('✅ Database synced');
    
    return true;
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    return false;
  }
}

module.exports = initializeDatabase;
