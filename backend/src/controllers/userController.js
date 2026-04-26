// const { User } = require('../models');
// const path = require('path');
// const fs = require('fs');

// // Get current user profile
// exports.getProfile = async (req, res, next) => {
//   try {
//     const user = await User.findByPk(req.user.id, {
//       attributes: { exclude: ['password'] }
//     });
    
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     res.json(user);
//   } catch (error) {
//     next(error);
//   }
// };

// // Update current user profile
// exports.updateProfile = async (req, res, next) => {
//   try {
//     const { prenom, nom_de_famille, telephone, date_naissance, localisation, biographie, statut_actuel, loisirs_centres_interet } = req.body;

//     const user = await User.findByPk(req.user.id);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Update allowed fields only
//     if (prenom !== undefined) user.prenom = prenom;
//     if (nom_de_famille !== undefined) user.nom_de_famille = nom_de_famille;
//     if (telephone !== undefined) user.telephone = telephone;
//     if (date_naissance !== undefined) user.date_naissance = date_naissance;
//     if (localisation !== undefined) user.localisation = localisation;
//     if (biographie !== undefined) user.biographie = biographie;
//     // Convert empty string to null for statut_actuel
//     if (statut_actuel !== undefined) user.statut_actuel = statut_actuel === '' ? null : statut_actuel;
//     if (loisirs_centres_interet !== undefined) user.loisirs_centres_interet = loisirs_centres_interet;

//     await user.save();

//     res.json({
//       message: 'Profile updated successfully',
//       user: {
//         id: user.id,
//         name: user.name,
//         prenom: user.prenom,
//         nom_de_famille: user.nom_de_famille,
//         email: user.email,
//         telephone: user.telephone,
//         date_naissance: user.date_naissance,
//         localisation: user.localisation,
//         biographie: user.biographie,
//         role: user.role,
//         statut_actuel: user.statut_actuel,
//         loisirs_centres_interet: user.loisirs_centres_interet
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Upload user avatar
// exports.uploadAvatar = async (req, res, next) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: 'Aucun fichier uploadé' });
//     }

//     const user = await User.findByPk(req.user.id);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     // Créer le dossier s'il n'existe pas
//     const uploadDir = path.join(__dirname, '../../uploads/avatars');
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }

//     // Renommer le fichier avec userId
//     const filename = `avatar_${user.id}_${Date.now()}${path.extname(req.file.originalname)}`;
//     const filepath = path.join(uploadDir, filename);

//     // Déplacer le fichier depuis temp
//     fs.renameSync(req.file.path, filepath);

//     // Supprimer l'ancien avatar s'il existe
//     if (user.avatar) {
//       try {
//         const oldPath = path.join(__dirname, '../../uploads/avatars', path.basename(user.avatar));
//         if (fs.existsSync(oldPath)) {
//           fs.unlinkSync(oldPath);
//         }
//       } catch (err) {
//         console.error('Erreur suppression ancien avatar:', err);
//       }
//     }

//     // Sauvegarder l'URL dans la base de données
//     user.avatar = `/api/avatar/${filename}`;
//     await user.save();

//     res.json({
//       message: 'Avatar uploadé avec succès',
//       avatar: user.avatar,
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         avatar: user.avatar
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // Get user by ID (admin only)
// exports.getUserById = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const user = await User.findByPk(id, {
//       attributes: { exclude: ['password'] }
//     });

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     res.json(user);
//   } catch (error) {
//     next(error);
//   }
// };

// // Serve user avatar
// exports.getAvatar = (req, res) => {
//   try {
//     const { filename } = req.params;
//     const filepath = path.join(__dirname, '../../uploads/avatars', filename);
    
//     // Security: prevent directory traversal
//     const uploadDir = path.join(__dirname, '../../uploads/avatars');
//     const realPath = path.resolve(filepath);
//     if (!realPath.startsWith(uploadDir)) {
//       return res.status(403).json({ error: 'Accès non autorisé' });
//     }

//     // Check if file exists
//     if (!fs.existsSync(filepath)) {
//       return res.status(404).json({ error: 'Avatar not found' });
//     }

//     res.sendFile(filepath);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get all users (admin only)
// exports.getAllUsers = async (req, res, next) => {
//   try {
//     const users = await User.findAll({
//       attributes: { exclude: ['password'] },
//       order: [['createdAt', 'DESC']]
//     });

//     res.json(users);
//   } catch (error) {
//     next(error);
//   }
// };

// // Delete user (admin only)
// exports.deleteUser = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const user = await User.findByPk(id);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     await user.destroy();

//     res.json({ message: 'User deleted successfully' });
//   } catch (error) {
//     next(error);
//   }
// };

// // Disable/Enable user (admin only)
// exports.toggleUserActive = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const user = await User.findByPk(id);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     user.isActive = !user.isActive;
//     await user.save();

//     res.json({
//       message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         isActive: user.isActive
//       }
//     });
//   } catch (error) {
//     next(error);
//   }
// };


const { User } = require('../models');
const { cloudinary } = require('../config/cloudinary');

// Get current user profile
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// Update current user profile
exports.updateProfile = async (req, res, next) => {
  try {
    const {
      prenom, nom_de_famille, telephone, date_naissance,
      localisation, biographie, statut_actuel, loisirs_centres_interet
    } = req.body;

    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (prenom               !== undefined) user.prenom               = prenom;
    if (nom_de_famille       !== undefined) user.nom_de_famille       = nom_de_famille;
    if (telephone            !== undefined) user.telephone            = telephone;
    if (date_naissance       !== undefined) user.date_naissance       = date_naissance;
    if (localisation         !== undefined) user.localisation         = localisation;
    if (biographie           !== undefined) user.biographie           = biographie;
    if (statut_actuel        !== undefined) user.statut_actuel        = statut_actuel === '' ? null : statut_actuel;
    if (loisirs_centres_interet !== undefined) user.loisirs_centres_interet = loisirs_centres_interet;

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user.id, name: user.name, prenom: user.prenom,
        nom_de_famille: user.nom_de_famille, email: user.email,
        telephone: user.telephone, date_naissance: user.date_naissance,
        localisation: user.localisation, biographie: user.biographie,
        role: user.role, statut_actuel: user.statut_actuel,
        loisirs_centres_interet: user.loisirs_centres_interet
      }
    });
  } catch (error) {
    next(error);
  }
};

// Upload user avatar → Cloudinary
exports.uploadAvatar = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Aucun fichier uploadé' });

    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Supprimer l'ancien avatar sur Cloudinary si présent
    if (user.avatarPublicId) {
      try {
        await cloudinary.uploader.destroy(user.avatarPublicId);
      } catch (err) {
        console.error('⚠️ Impossible de supprimer l\'ancien avatar Cloudinary:', err.message);
      }
    }

    // req.file.path  = URL Cloudinary (fourni par multer-storage-cloudinary)
    // req.file.filename = public_id Cloudinary
    user.avatar        = req.file.path;       // URL directe Cloudinary
    user.avatarPublicId = req.file.filename;  // public_id pour suppression future

    await user.save();

    console.log('✅ Avatar uploadé sur Cloudinary:', user.avatar);
    res.json({
      message: 'Avatar uploadé avec succès',
      avatar: user.avatar,
      user: { id: user.id, name: user.name, email: user.email, avatar: user.avatar }
    });
  } catch (error) {
    next(error);
  }
};

// Get user by ID
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// Get all users (admin only)
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']]
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// Delete user (admin only)
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Disable/Enable user (admin only)
exports.toggleUserActive = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.isActive = !user.isActive;
    await user.save();

    res.json({
      message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`,
      user: { id: user.id, name: user.name, email: user.email, isActive: user.isActive }
    });
  } catch (error) {
    next(error);
  }
};