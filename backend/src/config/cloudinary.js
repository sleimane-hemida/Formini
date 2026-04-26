// src/config/cloudinary.js
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage pour les avatars
const avatarStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'formini/avatars',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 400, height: 400, crop: 'fill' }],
  },
});

// Storage pour les couvertures de leçons
const coverStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'formini/lesson-covers',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
});

// Storage pour les ressources (vidéos & PDFs)
const resourceStorage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    const isVideo = file.mimetype.startsWith('video/');
    return {
      folder: 'formini/resources',
      resource_type: isVideo ? 'video' : 'raw',
      allowed_formats: isVideo
        ? ['mp4', 'mov', 'avi', 'mkv', 'webm']
        : ['pdf'],
    };
  },
});

module.exports = {
  cloudinary,
  uploadAvatar:   multer({ storage: avatarStorage }),
  uploadCover:    multer({ storage: coverStorage,   limits: { fileSize: 10  * 1024 * 1024 } }),
  uploadResource: multer({ storage: resourceStorage, limits: { fileSize: 500 * 1024 * 1024 } }),
};