// const db = require('../models');
// const { Resource } = db;
// const fs = require('fs');
// const path = require('path');

// // Helper to create organized folder structure
// const ensureUploadPath = (formationId, moduleId, lessonId) => {
//   const uploadDir = path.join(__dirname, '../../uploads');
//   const formationPath = path.join(uploadDir, String(formationId));
//   const modulePath = path.join(formationPath, String(moduleId));
//   const lessonPath = path.join(modulePath, String(lessonId));

//   if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
//   if (!fs.existsSync(formationPath)) fs.mkdirSync(formationPath);
//   if (!fs.existsSync(modulePath)) fs.mkdirSync(modulePath);
//   if (!fs.existsSync(lessonPath)) fs.mkdirSync(lessonPath);

//   return lessonPath;
// };

// // Créer une ressource avec fichier
// exports.createResource = async (req, res) => {
//   try {
//     const { lessonId, formationId, moduleId, type, titre, duree_minutes } = req.body;
//     const file = req.file;

//     console.log('📥 Resource upload received:');
//     console.log('   Body:', { lessonId, formationId, moduleId, type, titre });
//     console.log('   File:', file ? { originalname: file.originalname, size: file.size, path: file.path } : 'NO FILE');

//     // Validate required fields
//     if (!lessonId) return res.status(400).json({ error: 'lessonId requis' });
//     if (!formationId) return res.status(400).json({ error: 'formationId requis' });
//     if (!moduleId) return res.status(400).json({ error: 'moduleId requis' });
//     if (!type) return res.status(400).json({ error: 'type requis' });

//     // Valider le type
//     if (!['video', 'pdf'].includes(type)) {
//       return res.status(400).json({ error: 'Type doit être "video" ou "pdf"' });
//     }

//     if (!file) {
//       return res.status(400).json({ error: 'Fichier requis' });
//     }

//     // Créer la structure de dossiers
//     const lessonPath = ensureUploadPath(formationId, moduleId, lessonId);

//     // Déplacer le fichier vers le dossier organisé
//     const finalFilename = `${Date.now()}-${file.originalname}`;
//     const finalPath = path.join(lessonPath, finalFilename);

//     console.log('📂 Moving file from:', file.path);
//     console.log('📂 Moving file to:', finalPath);

//     fs.renameSync(file.path, finalPath);

//     // Verify file exists
//     if (!fs.existsSync(finalPath)) {
//       throw new Error(`Fichier non sauvegardé: ${finalPath}`);
//     }

//     // Sauvegarder le chemin relatif dans la BD
//     // Créer l'URL via l'API route pour servir le fichier
//     const apiPath = `/api/file/${formationId}/${moduleId}/${lessonId}/${finalFilename}`;

//     const resource = await Resource.create({
//       lessonId,
//       type,
//       url: apiPath,
//       titre: titre || file.originalname,
//       duree_minutes: duree_minutes ? parseInt(duree_minutes) : null
//     });

//     console.log('✅ Resource created:', resource.id);
//     console.log('   File path:', finalPath);
//     console.log('   API URL: ${process.env.NEXT_PUBLIC_API_URL}' + apiPath);
//     res.status(201).json(resource);
//   } catch (error) {
//     console.error('❌ Error creating resource:', error.message);
//     // Clean up file if error
//     if (req.file && fs.existsSync(req.file.path)) {
//       fs.unlinkSync(req.file.path);
//     }
//     res.status(400).json({ error: error.message });
//   }
// };

// // Récupérer toutes les ressources d'une leçon
// exports.getResourcesByLesson = async (req, res) => {
//   try {
//     const { lessonId } = req.params;
//     const resources = await Resource.findAll({ where: { lessonId } });
//     res.json(resources);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Récupérer une ressource par ID
// exports.getResourceById = async (req, res) => {
//   try {
//     const resource = await Resource.findByPk(req.params.id);
//     if (!resource) return res.status(404).json({ error: 'Ressource non trouvée' });
//     res.json(resource);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Mettre à jour une ressource
// exports.updateResource = async (req, res) => {
//   try {
//     const { type, url, titre, duree_minutes } = req.body;
//     // Valider le type si fourni
//     if (type && !['video', 'pdf'].includes(type)) {
//       return res.status(400).json({ error: 'Type doit être "video" ou "pdf"' });
//     }
//     const resource = await Resource.findByPk(req.params.id);
//     if (!resource) return res.status(404).json({ error: 'Ressource non trouvée' });
//     await resource.update({ type, url, titre, duree_minutes });
//     res.json(resource);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Supprimer une ressource
// exports.deleteResource = async (req, res) => {
//   try {
//     const resource = await Resource.findByPk(req.params.id);
//     if (!resource) return res.status(404).json({ error: 'Ressource non trouvée' });

//     // Extract file path from URL (/api/file/formationId/moduleId/lessonId/filename)
//     const urlParts = resource.url.split('/');
//     if (urlParts.length >= 5 && urlParts[2] === 'file') {
//       const formationId = urlParts[3];
//       const moduleId = urlParts[4];
//       const lessonId = urlParts[5];
//       const filename = urlParts[6];

//       const filePath = path.join(__dirname, '../../uploads', formationId, moduleId, lessonId, filename);

//       // Delete file from disk if it exists
//       if (fs.existsSync(filePath)) {
//         fs.unlinkSync(filePath);
//         console.log('🗑️ File deleted:', filePath);
//       }
//     }

//     await resource.destroy();
//     console.log('✅ Resource deleted:', req.params.id);
//     res.json({ message: 'Ressource supprimée' });
//   } catch (error) {
//     console.error('❌ Error deleting resource:', error.message);
//     res.status(400).json({ error: error.message });
//   }
// };



const db = require('../models');
const { Resource } = db;
const { cloudinary } = require('../config/cloudinary');

// Créer une ressource avec fichier
exports.createResource = async (req, res) => {
  try {
    const { lessonId, formationId, moduleId, type, titre, duree_minutes } = req.body;
    const file = req.file;

    console.log('📥 Resource upload received:');
    console.log('   Body:', { lessonId, formationId, moduleId, type, titre });
    console.log('   File:', file ? { originalname: file.originalname, size: file.size } : 'NO FILE');

    if (!lessonId) return res.status(400).json({ error: 'lessonId requis' });
    if (!formationId) return res.status(400).json({ error: 'formationId requis' });
    if (!moduleId) return res.status(400).json({ error: 'moduleId requis' });
    if (!type) return res.status(400).json({ error: 'type requis' });
    if (!['video', 'pdf'].includes(type)) {
      return res.status(400).json({ error: 'Type doit être "video" ou "pdf"' });
    }
    if (!file) return res.status(400).json({ error: 'Fichier requis' });

    // En local, file.path contient C:\...\uploads\resources\nom.mp4
    // On doit le transformer en URL relative /uploads/resources/nom.mp4
    const fileUrl = `/uploads/resources/${file.filename}`;

    const resource = await Resource.create({
      lessonId,
      type,
      url: fileUrl,        // URL locale
      publicId: `resources/${file.filename}`,  // public_id pour suppression locale
      titre: titre || file.originalname,
      duree_minutes: duree_minutes ? parseInt(duree_minutes) : null
    });

    console.log('✅ Resource créée localement:', resource.id);
    console.log('   URL:', fileUrl);
    res.status(201).json(resource);
  } catch (error) {
    console.error('❌ Error creating resource:', error.message);
    res.status(400).json({ error: error.message });
  }
};

// Récupérer toutes les ressources d'une leçon
exports.getResourcesByLesson = async (req, res) => {
  try {
    const resources = await Resource.findAll({ where: { lessonId: req.params.lessonId } });
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer une ressource par ID
exports.getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findByPk(req.params.id);
    if (!resource) return res.status(404).json({ error: 'Ressource non trouvée' });
    res.json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour une ressource
exports.updateResource = async (req, res) => {
  try {
    const { type, url, titre, duree_minutes } = req.body;
    if (type && !['video', 'pdf'].includes(type)) {
      return res.status(400).json({ error: 'Type doit être "video" ou "pdf"' });
    }
    const resource = await Resource.findByPk(req.params.id);
    if (!resource) return res.status(404).json({ error: 'Ressource non trouvée' });
    await resource.update({ type, url, titre, duree_minutes });
    res.json(resource);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer une ressource + fichier Cloudinary
exports.deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findByPk(req.params.id);
    if (!resource) return res.status(404).json({ error: 'Ressource non trouvée' });

    // Supprimer le fichier sur Cloudinary
    if (resource.publicId) {
      try {
        const resourceType = resource.type === 'video' ? 'video' : 'raw';
        await cloudinary.uploader.destroy(resource.publicId, { resource_type: resourceType });
        console.log('🗑️ Fichier Cloudinary supprimé:', resource.publicId);
      } catch (err) {
        console.error('⚠️ Impossible de supprimer le fichier Cloudinary:', err.message);
      }
    }

    await resource.destroy();
    console.log('✅ Resource supprimée:', req.params.id);
    res.json({ message: 'Ressource supprimée' });
  } catch (error) {
    console.error('❌ Error deleting resource:', error.message);
    res.status(400).json({ error: error.message });
  }
};