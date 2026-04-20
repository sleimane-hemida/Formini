const db = require('../models');

async function createOrdersTable() {
  try {
    const sequelize = db.sequelize;
    
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS "Orders" (
        "id" SERIAL PRIMARY KEY,
        "userId" UUID NOT NULL REFERENCES "Users"(id) ON DELETE CASCADE,
        "formationId" UUID NOT NULL REFERENCES "Formations"(id) ON DELETE CASCADE,
        "status" VARCHAR(50) DEFAULT 'en_attente' CHECK("status" IN ('en_attente', 'validée', 'rejetée')),
        "paymentProof" VARCHAR(255),
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "Orders_userId_formationId_unique" UNIQUE("userId", "formationId")
      );
    `);
    
    console.log('✅ Orders table created successfully');
  } catch (error) {
    console.error('Error creating Orders table:', error.message);
  }
}

module.exports = createOrdersTable;
