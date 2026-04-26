// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');
// const bcrypt = require('bcryptjs');

// const User = sequelize.define('User', {
//   id: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     primaryKey: true
//   },
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     trim: true
//   },
//   prenom: {
//     type: DataTypes.STRING,
//     allowNull: true,
//     trim: true
//   },
//   nom_de_famille: {
//     type: DataTypes.STRING,
//     allowNull: true,
//     trim: true
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//     lowercase: true,
//     trim: true
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   telephone: {
//     type: DataTypes.STRING,
//     allowNull: true,
//     trim: true
//   },
//   date_naissance: {
//     type: DataTypes.DATE,
//     allowNull: true
//   },
//   localisation: {
//     type: DataTypes.STRING,
//     allowNull: true,
//     trim: true
//   },
//   biographie: {
//     type: DataTypes.TEXT,
//     allowNull: true
//   },
//   role: {
//     type: DataTypes.ENUM('administrateur', 'formateur', 'acheteur'),
//     defaultValue: 'acheteur',
//     allowNull: false
//   },
//   statut_actuel: {
//     type: DataTypes.ENUM('Étudiant(e)', 'Employé(e)', 'Indépendant(e)', 'En recherche d\'emploi', 'Autre'),
//     allowNull: true
//   },
//   loisirs_centres_interet: {
//     type: DataTypes.TEXT,
//     allowNull: true
//   },
//   avatar: {
//     type: DataTypes.STRING,
//     allowNull: true,
//     defaultValue: null
//   },
//   isActive: {
//     type: DataTypes.BOOLEAN,
//     defaultValue: true
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
//   hooks: {
//     beforeCreate: async (user) => {
//       const salt = await bcrypt.genSalt(10);
//       user.password = await bcrypt.hash(user.password, salt);
//     }
//   }
// });

// User.prototype.comparePassword = async function(password) {
//   return await bcrypt.compare(password, this.password);
// };
// avatarPublicId: { type: DataTypes.STRING }

// module.exports = User;
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: true,
    trim: true
  },
  nom_de_famille: {
    type: DataTypes.STRING,
    allowNull: true,
    trim: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telephone: {
    type: DataTypes.STRING,
    allowNull: true,
    trim: true
  },
  date_naissance: {
    type: DataTypes.DATE,
    allowNull: true
  },
  localisation: {
    type: DataTypes.STRING,
    allowNull: true,
    trim: true
  },
  biographie: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  role: {
    type: DataTypes.ENUM('administrateur', 'formateur', 'acheteur'),
    defaultValue: 'acheteur',
    allowNull: false
  },
  statut_actuel: {
    type: DataTypes.ENUM('Étudiant(e)', 'Employé(e)', 'Indépendant(e)', 'En recherche d\'emploi', 'Autre'),
    allowNull: true
  },
  loisirs_centres_interet: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  },
  // ✅ Nouveau champ Cloudinary
  avatarPublicId: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
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
  hooks: {
    beforeCreate: async (user) => {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  }
});

User.prototype.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = User;