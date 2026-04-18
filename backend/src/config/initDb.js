const db = require('../models');

async function initializeDatabase() {
  try {
    await db.sequelize.authenticate();
    console.log('✅ PostgreSQL connected successfully');
    
    // In development, force: true will drop and recreate tables
    // In production, use alter: true
    const isDev = process.env.NODE_ENV !== 'production';
    await db.sequelize.sync({ force: isDev, alter: !isDev });
    console.log('✅ Database synced');
    
    return true;
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    throw error;
  }
}

module.exports = initializeDatabase;
