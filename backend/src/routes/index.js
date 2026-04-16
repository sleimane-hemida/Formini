
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { verifyToken, authorize } = require('../middleware/auth');
const authController = require('../controllers/authController');
const categoryController = require('../controllers/categoryController');
const formationController = require('../controllers/formationController');
const formationAccessController = require('../controllers/formationAccessController');
const subcategoryController = require('../controllers/subcategoryController');
const moduleController = require('../controllers/moduleController');
const lessonController = require('../controllers/lessonController');
const resourceController = require('../controllers/resourceController');

// Configure multer for file uploads (temporary location)
const upload = multer({ 
  dest: path.join(__dirname, '../../uploads/temp'),
  limits: { fileSize: 500 * 1024 * 1024 } // 500MB per file
});

// Serve uploaded files via API route
router.get('/file/:formationId/:moduleId/:lessonId/:filename', (req, res) => {
  try {
    const { formationId, moduleId, lessonId, filename } = req.params;
    const filePath = path.join(__dirname, '../../uploads', formationId, moduleId, lessonId, filename);
    
    // Security: prevent directory traversal
    const uploadDir = path.join(__dirname, '../../uploads');
    const realPath = path.resolve(filePath);
    if (!realPath.startsWith(uploadDir)) {
      return res.status(403).json({ error: 'Accès non autorisé' });
    }
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error('❌ File not found:', filePath);
      return res.status(404).json({ error: 'Fichier non trouvé' });
    }
    
    console.log('✅ Serving file:', filePath);
    res.sendFile(filePath);
  } catch (error) {
    console.error('❌ Error serving file:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Serve lesson cover images
router.get('/file-cover/:filename', (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '../../uploads/lesson-covers', filename);
    
    // Security: prevent directory traversal
    const uploadsDir = path.join(__dirname, '../../uploads/lesson-covers');
    const realPath = path.resolve(filePath);
    if (!realPath.startsWith(uploadsDir)) {
      return res.status(403).json({ error: 'Accès non autorisé' });
    }
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error('❌ Cover image not found:', filePath);
      return res.status(404).json({ error: 'Image non trouvée' });
    }
    
    console.log('✅ Serving cover image:', filePath);
    res.sendFile(filePath);
  } catch (error) {
    console.error('❌ Error serving cover image:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Sous-catégorie routes
router.get('/subcategories', subcategoryController.getAllSubcategories);
router.get('/subcategories/:id', subcategoryController.getSubcategoryById);
router.post('/subcategories', verifyToken, authorize(['administrateur']), subcategoryController.createSubcategory);
router.put('/subcategories/:id', verifyToken, authorize(['administrateur']), subcategoryController.updateSubcategory);
router.delete('/subcategories/:id', verifyToken, authorize(['administrateur']), subcategoryController.deleteSubcategory);

// Auth routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/auth/profile', verifyToken, authController.getProfile);

// Category routes (public)
router.get('/categories', categoryController.getAllCategories);
router.get('/categories/:id', categoryController.getCategoryById);
router.post('/categories', verifyToken, authorize(['administrateur']), categoryController.createCategory);
router.delete('/categories/:id', verifyToken, authorize(['administrateur']), categoryController.deleteCategory);

// Formation routes (public - list)
router.get('/formations/options', formationController.getFormationOptions);
router.get('/formations', verifyToken, formationController.getFormations);
router.get('/formations/:id', verifyToken, formationController.getFormationById);

// Formation routes (formateur only)
router.post('/formations', verifyToken, authorize(['formateur']), formationController.createFormation);
router.put('/formations/:id', verifyToken, authorize(['formateur', 'administrateur']), formationController.updateFormation);
router.delete('/formations/:id', verifyToken, authorize(['formateur', 'administrateur']), formationController.deleteFormation);

// Formation management routes
router.patch('/formations/:id/publish', verifyToken, authorize(['formateur']), formationController.publishFormation);
router.patch('/formations/:id/reject', verifyToken, authorize(['administrateur']), formationController.rejectFormation);
router.patch('/formations/:id/disable', verifyToken, authorize(['administrateur']), formationController.disableFormation);

// Formation Access routes (acheteur)
router.post('/formations-access/request', verifyToken, authorize(['acheteur']), formationAccessController.requestAccess);
router.get('/my-formations', verifyToken, authorize(['acheteur']), formationAccessController.getUserFormations);

// Formation Access routes (admin)
router.get('/formations-access/pending', verifyToken, authorize(['administrateur']), formationAccessController.getPendingRequests);
router.patch('/formations-access/:accessId/approve', verifyToken, authorize(['administrateur']), formationAccessController.approveAccess);
router.patch('/formations-access/:accessId/reject', verifyToken, authorize(['administrateur']), formationAccessController.rejectAccess);

// Module routes (formateur only)
router.post('/modules', verifyToken, authorize(['formateur']), moduleController.createModule);
router.get('/formations/:formationId/modules', moduleController.getModulesByFormation);
router.get('/modules/:id', moduleController.getModuleById);
router.put('/modules/:id', verifyToken, authorize(['formateur', 'administrateur']), moduleController.updateModule);
router.delete('/modules/:id', verifyToken, authorize(['formateur', 'administrateur']), moduleController.deleteModule);

// Lesson routes (formateur only)
router.post('/lessons', verifyToken, authorize(['formateur']), lessonController.createLesson);
router.get('/modules/:moduleId/lessons', lessonController.getLessonsByModule);
router.get('/lessons/:id', lessonController.getLessonById);
router.put('/lessons/:id', verifyToken, authorize(['formateur', 'administrateur']), lessonController.updateLesson);
router.delete('/lessons/:id', verifyToken, authorize(['formateur', 'administrateur']), lessonController.deleteLesson);

// Lesson cover image (formateur only)
router.post('/lesson-cover', verifyToken, authorize(['formateur']), upload.single('file'), lessonController.uploadCoverImage);

// Resource routes (formateur only)
router.post('/resources', verifyToken, authorize(['formateur']), upload.single('file'), resourceController.createResource);
router.get('/lessons/:lessonId/resources', resourceController.getResourcesByLesson);
router.get('/resources/:id', resourceController.getResourceById);
router.put('/resources/:id', verifyToken, authorize(['formateur', 'administrateur']), resourceController.updateResource);
router.delete('/resources/:id', verifyToken, authorize(['formateur', 'administrateur']), resourceController.deleteResource);

module.exports = router;
