// src/config/cloudinary.js
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Fonction pour créer un stockage local
const createLocalDiskStorage = (subfolder) => {
  const dir = path.join(__dirname, '../../uploads', subfolder);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      // Nettoyer le nom du fichier
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext).replace(/[^a-z0-9]/gi, '_').toLowerCase();
      const filename = `${name}-${Date.now()}${ext}`;
      
      // TRÈS IMPORTANT: On triche ici pour que les contrôleurs (qui s'attendent à Cloudinary)
      // reçoivent les bonnes URLs locales et ne plantent pas !
      // Dans Cloudinary, `file.path` contient l'URL finale. En local, `multer` mettra le chemin absolu sur le PC,
      // MAIS on le réécrira dans le contrôleur... ou plus simple, on passe le chemin relatif dans `filename` !
      // On va laisser `filename` normal, et le contrôleur fera le reste ou on gère ça ici.
      cb(null, filename);
    }
  });
};

// Fake cloudinary object pour éviter que les suppressions (destroy) ne fassent crasher l'appli
const dummyCloudinary = {
  uploader: {
    destroy: async (publicId) => {
      console.log('🗑️ Fake Cloudinary destroy appelé pour:', publicId);
      // Supprimer le fichier local si nécessaire
      const filePath = path.join(__dirname, '../../uploads', publicId);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log('🗑️ Fichier local supprimé:', filePath);
      }
      return { result: 'ok' };
    }
  }
};

module.exports = {
  cloudinary: dummyCloudinary,
  uploadAvatar:   multer({ storage: createLocalDiskStorage('avatars') }),
  uploadCover:    multer({ storage: createLocalDiskStorage('lesson-covers'), limits: { fileSize: 10 * 1024 * 1024 } }),
  uploadResource: multer({ storage: createLocalDiskStorage('resources'), limits: { fileSize: 500 * 1024 * 1024 } }),
};