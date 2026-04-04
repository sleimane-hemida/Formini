const sequelize = require('../config/database');
const User = require('./User');
const Category = require('./Category');
const Formation = require('./Formation');
const FormationAccess = require('./FormationAccess');

// Setup associations
Formation.belongsTo(User, { as: 'trainer', foreignKey: 'trainerId' });
Formation.belongsTo(Category, { foreignKey: 'categoryId' });

FormationAccess.belongsTo(User, { as: 'user', foreignKey: 'userId' });
FormationAccess.belongsTo(Formation, { foreignKey: 'formationId' });
FormationAccess.belongsTo(User, { as: 'admin', foreignKey: 'approvedBy' });

const db = {
  sequelize,
  Sequelize: require('sequelize'),
  User,
  Category,
  Formation,
  FormationAccess
};

module.exports = db;
