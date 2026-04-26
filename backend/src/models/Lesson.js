// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');

// const Lesson = sequelize.define('Lesson', {
//   id: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     primaryKey: true
//   },
//   moduleId: {
//     type: DataTypes.UUID,
//     allowNull: false
//   },
//   titre: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   ordre: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
//   image_couverture: {
//     type: DataTypes.TEXT,
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
//   tableName: 'Lessons'
// });
// coverPublicId: { type: DataTypes.STRING }


// // Associations will be defined in a separate file to avoid circular dependencies
// // Lesson.associate = (models) => {
// //   Lesson.belongsTo(models.Module, { foreignKey: 'moduleId' });
// //   Lesson.hasMany(models.Resource, { foreignKey: 'lessonId', onDelete: 'CASCADE' });
// // };

// module.exports = Lesson;
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Lesson = sequelize.define('Lesson', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  moduleId: {
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
  image_couverture: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  // ✅ Nouveau champ Cloudinary
  coverPublicId: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
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
  tableName: 'Lessons'
});

module.exports = Lesson;