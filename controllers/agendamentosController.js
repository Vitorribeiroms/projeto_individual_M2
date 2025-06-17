const Agendamento = require('../models/modelAgendamentos');

class AgendamentosController {
  
  static async getAllAgendamentos(req, res) {
    try {
      const agendamentos = await Agendamento.getAll();
      res.json(agendamentos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get a single schedule by ID
  static async getAgendamentoById(req, res) {
    try {
      const agendamento = await Agendamento.getById(req.params.id);
      if (!agendamento) {
        return res.status(404).json({ message: 'Agendamento não encontrado' });
      }
      res.json(agendamento);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Create a new schedule
  static async createAgendamento(req, res) {
    try {
      const agendamento = await Agendamento.create(req.body);
      res.status(201).json(agendamento);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update a schedule
  static async updateAgendamento(req, res) {
    try {
      const agendamento = await Agendamento.update(req.params.id, req.body);
      if (!agendamento) {
        return res.status(404).json({ message: 'Agendamento não encontrado' });
      }
      res.json(agendamento);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Delete a schedule
  static async deleteAgendamento(req, res) {
    try {
      const success = await Agendamento.delete(req.params.id);
      if (!success) {
        return res.status(404).json({ message: 'Agendamento não encontrado' });
      }
      res.json({ message: 'Agendamento removido com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = AgendamentosController;
