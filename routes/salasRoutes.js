const express = require('express');
const router = express.Router();
const salaController = require('../controllers/salasController');
const { authMiddleware } = require('../middleware/auth');

router.get('/', authMiddleware, salaController.getAllSalas);
router.get('/:id', authMiddleware, salaController.getSalaById);
router.post('/', authMiddleware, salaController.createSala);
router.put('/:id', authMiddleware, salaController.updateSala);
router.delete('/:id', authMiddleware, salaController.deleteSala);

module.exports = router;
