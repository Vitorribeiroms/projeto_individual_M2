const Sala = require('../models/modelSalas');

class SalasController {
  // Get all rooms
  static async getAllSalas(req, res) {
    try {
      const salas = await Sala.getAll();
      res.json(salas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get a single room by ID
  static async getSalaById(req, res) {
    try {
      const sala = await Sala.getById(req.params.id);
      if (!sala) {
        return res.status(404).json({ message: 'Sala não encontrada' });
      }
      res.json(sala);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Create a new room
  static async createSala(req, res) {
    try {
      const sala = await Sala.create(req.body);
      res.status(201).json(sala);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update a room
  static async updateSala(req, res) {
    try {
      const sala = await Sala.update(req.params.id, req.body);
      if (!sala) {
        return res.status(404).json({ message: 'Sala não encontrada' });
      }
      res.json(sala);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Delete a room
  static async deleteSala(req, res) {
    try {
      const success = await Sala.delete(req.params.id);
      if (!success) {
        return res.status(404).json({ message: 'Sala não encontrada' });
      }
      res.json({ message: 'Sala removida com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Check room availability
  static async checkAvailability(req, res) {
    try {
      const { date, time } = req.query;
      const availableSalas = await Sala.checkAvailability(date, time);
      res.json(availableSalas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = SalasController;
