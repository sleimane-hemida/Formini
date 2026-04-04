const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FormationAccess = sequelize.define('FormationAccess', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  formationId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending'
  },
  requestedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  approvedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  approvedBy: {
    type: DataTypes.UUID,
    allowNull: true
  }
}, {
  timestamps: true,
  uniqueKeys: {
    unique_user_formation: {
      fields: ['userId', 'formationId']
    }
  }
});

module.exports = FormationAccess;
