const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Module = sequelize.define('Module', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  formationId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  titre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ordre: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: true,
  tableName: 'Modules'
});

// Associations will be defined in a separate file to avoid circular dependencies
// Module.associate = (models) => {
//   Module.belongsTo(models.Formation, { foreignKey: 'formationId' });
//   Module.hasMany(models.Lesson, { foreignKey: 'moduleId', onDelete: 'CASCADE' });
// };

module.exports = Module;
