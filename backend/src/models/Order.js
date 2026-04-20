const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  formationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Formations',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM('en_attente', 'validée', 'rejetée'),
    defaultValue: 'en_attente'
  },
  paymentProof: {
    type: DataTypes.STRING(255),
    allowNull: true
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
  tableName: 'Orders',
  timestamps: true
});

module.exports = Order;
