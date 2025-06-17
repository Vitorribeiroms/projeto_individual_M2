// controllers/userController.js

const userModel = require('../models/userModel');

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Para API REST
const createUser = async (req, res) => {
  try {
    const { nome, genero, idade, email, senha } = req.body;
    const newUser = await userModel.createUsuario({ nome, genero, idade, email, senha });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Para formulário (página)
const createUserForm = async (req, res) => {
  try {
    console.log('Dados recebidos no registro:', req.body);
    const { nome, genero, idade, email, senha } = req.body;
    await userModel.createUsuario({ nome, genero, idade, email, senha });
    res.redirect('/login');
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).send('Erro ao registrar usuário');
  }
};

const updateUser = async (req, res) => {
  try {
    const { nome, genero, idade, email } = req.body;
    const updatedUser = await userModel.update(req.params.id, { nome, genero, idade, email });
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await userModel.delete(req.params.id);
    if (deletedUser) {
      res.status(200).json(deletedUser);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  createUserForm,
  updateUser,
  deleteUser
};
