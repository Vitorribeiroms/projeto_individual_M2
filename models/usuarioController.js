const usuarioService = require('../services/usuarioService');

const getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioService.getAllUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUsuarioById = async (req, res) => {
  try {
    const usuario = await usuarioService.getUsuarioById(req.params.id);
    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUsuario = async (req, res) => {
  try {
    const { nome, genero, idade, email, senha } = req.body;
    const novoUsuario = await usuarioService.createUsuario(nome, genero, idade, email, senha);
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUsuario = async (req, res) => {
  try {
    const { nome, genero, idade, email, senha } = req.body;
    const usuarioAtualizado = await usuarioService.updateUsuario(req.params.id, nome, genero, idade, email, senha);
    if (usuarioAtualizado) {
      res.status(200).json(usuarioAtualizado);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUsuario = async (req, res) => {
  try {
    const usuarioDeletado = await usuarioService.deleteUsuario(req.params.id);
    if (usuarioDeletado) {
      res.status(200).json(usuarioDeletado);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario
};
