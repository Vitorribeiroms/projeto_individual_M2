const express = require('express');
const router = express.Router();
const agendamentosController = require('../controllers/agendamentosController');

router.get('/', agendamentosController.getAllAgendamentos);
router.get('/:id', agendamentosController.getAgendamentoById);
router.post('/', agendamentosController.createAgendamento);
router.put('/:id', agendamentosController.updateAgendamento);
router.delete('/:id', agendamentosController.deleteAgendamento);

module.exports = router;
