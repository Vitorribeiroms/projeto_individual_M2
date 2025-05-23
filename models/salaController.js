const salaService = require('../services/salaService');

const getAllSalas = async (req, res) => {
  try {
    const salas = await salaService.getAllSalas();
    res.status(200).json(salas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSalaById = async (req, res) => {
  try {
    const sala = await salaService.getSalaById(req.params.id);
    if (sala) {
      res.status(200).json(sala);
    } else {
      res.status(404).json({ error: 'Sala não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createSala = async (req, res) => {
  try {
    const { numero } = req.body;
    const novaSala = await salaService.createSala(numero);
    res.status(201).json(novaSala);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSala = async (req, res) => {
  try {
    const { numero } = req.body;
    const salaAtualizada = await salaService.updateSala(req.params.id, numero);
    if (salaAtualizada) {
      res.status(200).json(salaAtualizada);
    } else {
      res.status(404).json({ error: 'Sala não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSala = async (req, res) => {
  try {
    const salaDeletada = await salaService.deleteSala(req.params.id);
    if (salaDeletada) {
      res.status(200).json(salaDeletada);
    } else {
      res.status(404).json({ error: 'Sala não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllSalas,
  getSalaById,
  createSala,
  updateSala,
  deleteSala
};
