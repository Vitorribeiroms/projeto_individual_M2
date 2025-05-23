const agendamentoService = require('../services/agendamentoService');

const getAllAgendamentos = async (req, res) => {
  try {
    const agendamentos = await agendamentoService.getAllAgendamentos();
    res.status(200).json(agendamentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAgendamentoById = async (req, res) => {
  try {
    const agendamento = await agendamentoService.getAgendamentoById(req.params.id);
    if (agendamento) {
      res.status(200).json(agendamento);
    } else {
      res.status(404).json({ error: 'Agendamento não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createAgendamento = async (req, res) => {
  try {
    const { data, hora, id_Salas, id_Usuarios } = req.body;
    const novoAgendamento = await agendamentoService.createAgendamento(data, hora, id_Salas, id_Usuarios);
    res.status(201).json(novoAgendamento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAgendamento = async (req, res) => {
  try {
    const { data, hora, id_Salas, id_Usuarios } = req.body;
    const agendamentoAtualizado = await agendamentoService.updateAgendamento(req.params.id, data, hora, id_Salas, id_Usuarios);
    if (agendamentoAtualizado) {
      res.status(200).json(agendamentoAtualizado);
    } else {
      res.status(404).json({ error: 'Agendamento não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAgendamento = async (req, res) => {
  try {
    const agendamentoDeletado = await agendamentoService.deleteAgendamento(req.params.id);
    if (agendamentoDeletado) {
      res.status(200).json(agendamentoDeletado);
    } else {
      res.status(404).json({ error: 'Agendamento não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllAgendamentos,
  getAgendamentoById,
  createAgendamento,
  updateAgendamento,
  deleteAgendamento
};
