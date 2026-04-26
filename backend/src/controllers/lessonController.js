// const db = require('../models');
// const { Lesson } = db;
// const fs = require('fs');
// const path = require('path');

// // Créer une leçon
// exports.createLesson = async (req, res) => {
//   try {
//     const { moduleId, titre, ordre, image_couverture } = req.body;
//     const lesson = await Lesson.create({ moduleId, titre, ordre, image_couverture });
//     res.status(201).json(lesson);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Récupérer toutes les leçons d'un module
// exports.getLessonsByModule = async (req, res) => {
//   try {
//     const { moduleId } = req.params;
//     const lessons = await Lesson.findAll({ where: { moduleId }, order: [['ordre', 'ASC']] });
//     res.json(lessons);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Récupérer une leçon par ID
// exports.getLessonById = async (req, res) => {
//   try {
//     const lesson = await Lesson.findByPk(req.params.id);
//     if (!lesson) return res.status(404).json({ error: 'Leçon non trouvée' });
//     res.json(lesson);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Mettre à jour une leçon
// exports.updateLesson = async (req, res) => {
//   try {
//     const { titre, ordre, image_couverture } = req.body;
//     const lesson = await Lesson.findByPk(req.params.id);
//     if (!lesson) return res.status(404).json({ error: 'Leçon non trouvée' });
//     await lesson.update({ titre, ordre, image_couverture });
//     res.json(lesson);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Supprimer une leçon
// exports.deleteLesson = async (req, res) => {
//   try {
//     const lesson = await Lesson.findByPk(req.params.id);
//     if (!lesson) return res.status(404).json({ error: 'Leçon non trouvée' });
//     await lesson.destroy();
//     res.json({ message: 'Leçon supprimée' });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Upload cover image for lesson
// exports.uploadCoverImage = async (req, res) => {
//   try {
//     const { lessonId } = req.body;
//     const file = req.file;

//     if (!lessonId) return res.status(400).json({ error: 'lessonId requis' });
//     if (!file) return res.status(400).json({ error: 'Fichier requis' });

//     const lesson = await Lesson.findByPk(lessonId);
//     if (!lesson) return res.status(404).json({ error: 'Leçon non trouvée' });

//     // Create lesson covers directory
//     const uploadsDir = path.join(__dirname, '../../uploads/lesson-covers');
//     if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

//     // Move file
//     const finalFilename = `${Date.now()}-${file.originalname}`;
//     const finalPath = path.join(uploadsDir, finalFilename);
//     fs.renameSync(file.path, finalPath);

//     // Delete old cover if exists
//     if (lesson.image_couverture) {
//       const oldPath = path.join(__dirname, '../../', lesson.image_couverture.replace('/api/file/', 'uploads/'));
//       if (fs.existsSync(oldPath)) {
//         try {
//           fs.unlinkSync(oldPath);
//         } catch (e) {
//           console.log('Could not delete old cover image');
//         }
//       }
//     }

//     // Save cover image URL to lesson
//     const coverUrl = `/api/file-cover/${finalFilename}`;
//     await lesson.update({ image_couverture: coverUrl });

//     console.log('✅ Lesson cover uploaded:', lessonId);
//     res.status(201).json({ id: lesson.id, url: coverUrl });
//   } catch (error) {
//     console.error('❌ Error uploading cover image:', error.message);
//     if (req.file && fs.existsSync(req.file.path)) {
//       fs.unlinkSync(req.file.path);
//     }
//     res.status(400).json({ error: error.message });
//   }
// };
const db = require('../models');
const { Lesson } = db;
const { cloudinary } = require('../config/cloudinary');

// Créer une leçon
exports.createLesson = async (req, res) => {
  try {
    const { moduleId, titre, ordre, image_couverture } = req.body;
    const lesson = await Lesson.create({ moduleId, titre, ordre, image_couverture });
    res.status(201).json(lesson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Récupérer toutes les leçons d'un module
exports.getLessonsByModule = async (req, res) => {
  try {
    const lessons = await Lesson.findAll({
      where: { moduleId: req.params.moduleId },
      order: [['ordre', 'ASC']]
    });
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer une leçon par ID
exports.getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findByPk(req.params.id);
    if (!lesson) return res.status(404).json({ error: 'Leçon non trouvée' });
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour une leçon
exports.updateLesson = async (req, res) => {
  try {
    const { titre, ordre, image_couverture } = req.body;
    const lesson = await Lesson.findByPk(req.params.id);
    if (!lesson) return res.status(404).json({ error: 'Leçon non trouvée' });
    await lesson.update({ titre, ordre, image_couverture });
    res.json(lesson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer une leçon
exports.deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByPk(req.params.id);
    if (!lesson) return res.status(404).json({ error: 'Leçon non trouvée' });
    await lesson.destroy();
    res.json({ message: 'Leçon supprimée' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Upload cover image → Cloudinary
exports.uploadCoverImage = async (req, res) => {
  try {
    const { lessonId } = req.body;

    if (!lessonId) return res.status(400).json({ error: 'lessonId requis' });
    if (!req.file)  return res.status(400).json({ error: 'Fichier requis' });

    const lesson = await Lesson.findByPk(lessonId);
    if (!lesson) return res.status(404).json({ error: 'Leçon non trouvée' });

    // Supprimer l'ancienne couverture Cloudinary si elle existe
    if (lesson.coverPublicId) {
      try {
        await cloudinary.uploader.destroy(lesson.coverPublicId);
      } catch (err) {
        console.error('⚠️ Impossible de supprimer l\'ancienne couverture:', err.message);
      }
    }

    // req.file.path     = URL Cloudinary
    // req.file.filename = public_id Cloudinary
    const coverUrl      = req.file.path;
    const coverPublicId = req.file.filename;

    await lesson.update({ image_couverture: coverUrl, coverPublicId });

    console.log('✅ Cover image uploadée sur Cloudinary, lessonId:', lessonId);
    res.status(201).json({ id: lesson.id, url: coverUrl });
  } catch (error) {
    console.error('❌ Error uploading cover image:', error.message);
    res.status(400).json({ error: error.message });
  }
};