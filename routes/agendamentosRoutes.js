const express = require('express');
const router = express.Router();
const agendamentosController = require('../controllers/agendamentosController');
const { authMiddleware } = require('../middleware/auth');

router.get('/', authMiddleware, agendamentosController.getAllAgendamentos);
router.get('/:id', authMiddleware, agendamentosController.getAgendamentoById);
router.post('/', authMiddleware, agendamentosController.createAgendamento);
router.put('/:id', authMiddleware, agendamentosController.updateAgendamento);
router.delete('/:id', authMiddleware, agendamentosController.deleteAgendamento);

module.exports = router;
