const sequelize = require('../config/database');
const User = require('./User');
const Category = require('./Category');
const Formation = require('./Formation');
const FormationAccess = require('./FormationAccess');
const Order = require('./Order');
const Subcategory = require('./Subcategory');
const Module = require('./Module');
const Lesson = require('./Lesson');
const Resource = require('./Resource');


// Associations
Category.hasMany(Subcategory, { foreignKey: 'categoryId', as: 'subcategories' });
Subcategory.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

Subcategory.hasMany(Formation, { foreignKey: 'subcategoryId', as: 'formations' });
Formation.belongsTo(Subcategory, { foreignKey: 'subcategoryId', as: 'subcategory' });

Formation.belongsTo(User, { as: 'trainer', foreignKey: 'trainerId' });
Formation.belongsTo(Category, { foreignKey: 'categoryId' });
Formation.hasMany(Module, { foreignKey: 'formationId', onDelete: 'CASCADE' });

Module.belongsTo(Formation, { foreignKey: 'formationId' });
Module.hasMany(Lesson, { foreignKey: 'moduleId', onDelete: 'CASCADE' });

Lesson.belongsTo(Module, { foreignKey: 'moduleId' });
Lesson.hasMany(Resource, { foreignKey: 'lessonId', onDelete: 'CASCADE' });

Resource.belongsTo(Lesson, { foreignKey: 'lessonId' });

FormationAccess.belongsTo(User, { as: 'user', foreignKey: 'userId' });
FormationAccess.belongsTo(Formation, { foreignKey: 'formationId' });
FormationAccess.belongsTo(User, { as: 'admin', foreignKey: 'approvedBy' });

// Order associations
Order.belongsTo(User, { foreignKey: 'userId' });
Order.belongsTo(Formation, { foreignKey: 'formationId' });
User.hasMany(Order, { foreignKey: 'userId' });
Formation.hasMany(Order, { foreignKey: 'formationId' });


const db = {
  sequelize,
  Sequelize: require('sequelize'),
  User,
  Category,
  Subcategory,
  Formation,
  FormationAccess,
  Order,
  Module,
  Lesson,
  Resource
};

module.exports = db;
