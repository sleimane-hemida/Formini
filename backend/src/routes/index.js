const express = require('express');
const authController = require('../controllers/authController');
const categoryController = require('../controllers/categoryController');
const formationController = require('../controllers/formationController');
const formationAccessController = require('../controllers/formationAccessController');
const { verifyToken, authorize } = require('../middleware/auth');
const router = express.Router();

// Auth routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.get('/auth/profile', verifyToken, authController.getProfile);

// Category routes (public)
router.get('/categories', categoryController.getAllCategories);
router.get('/categories/:id', categoryController.getCategoryById);
router.post('/categories', verifyToken, authorize(['administrateur']), categoryController.createCategory);

// Formation routes (public - list)
router.get('/formations', formationController.getFormations);
router.get('/formations/:id', formationController.getFormationById);

// Formation routes (formateur only)
router.post('/formations', verifyToken, authorize(['formateur']), formationController.createFormation);
router.put('/formations/:id', verifyToken, authorize(['formateur', 'administrateur']), formationController.updateFormation);
router.delete('/formations/:id', verifyToken, authorize(['formateur', 'administrateur']), formationController.deleteFormation);

// Formation disable (admin only)
router.patch('/formations/:id/disable', verifyToken, authorize(['administrateur']), formationController.disableFormation);

// Formation Access routes (acheteur)
router.post('/formations-access/request', verifyToken, authorize(['acheteur']), formationAccessController.requestAccess);
router.get('/my-formations', verifyToken, authorize(['acheteur']), formationAccessController.getUserFormations);

// Formation Access routes (admin)
router.get('/formations-access/pending', verifyToken, authorize(['administrateur']), formationAccessController.getPendingRequests);
router.patch('/formations-access/:accessId/approve', verifyToken, authorize(['administrateur']), formationAccessController.approveAccess);
router.patch('/formations-access/:accessId/reject', verifyToken, authorize(['administrateur']), formationAccessController.rejectAccess);

module.exports = router;
