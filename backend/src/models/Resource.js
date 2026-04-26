// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');

// const Resource = sequelize.define('Resource', {
//   id: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     primaryKey: true
//   },
//   lessonId: {
//     type: DataTypes.UUID,
//     allowNull: false
//   },
//   type: {
//     type: DataTypes.ENUM('video', 'pdf'),
//     allowNull: false
//   },
//   url: {
//     type: DataTypes.TEXT,
//     allowNull: false
//   },
//   titre: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   duree_minutes: {
//     type: DataTypes.INTEGER,
//     allowNull: true
//   },
//   createdAt: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW
//   },
//   updatedAt: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW
//   }
// }, {
//   timestamps: true,
//   tableName: 'Resources'
// });

// // Associations will be defined in a separate file to avoid circular dependencies
// // Resource.associate = (models) => {
// //   Resource.belongsTo(models.Lesson, { foreignKey: 'lessonId' });
// // };
// publicId: { type: DataTypes.STRING }

// module.exports = Resource;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Resource = sequelize.define('Resource', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  lessonId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('video', 'pdf'),
    allowNull: false
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  // ✅ Nouveau champ Cloudinary
  publicId: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  },
  titre: {
    type: DataTypes.STRING,
    allowNull: true
  },
  duree_minutes: {
    type: DataTypes.INTEGER,
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
  timestamps: true,
  tableName: 'Resources'
});

module.exports = Resource;

