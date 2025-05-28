const db = require('../config/db');

// Função para obter todos os usuários
const getAllUsuarios = async () => {
  try {
    const result = await db.query('SELECT * FROM Usuarios');
    return result.rows;
  } catch (error) {
    throw new Error('Erro ao obter usuários: ' + error.message);
  }
};

// Função para obter um usuário por ID
const getUsuarioById = async (id) => {
  try {
    const result = await db.query('SELECT * FROM Usuarios WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao obter usuário: ' + error.message);
  }
};

// Função para criar um novo usuário
const createUsuario = async (Nome, gênero, idade, email, senha) => {
  try {
    const result = await db.query(
      'INSERT INTO Usuarios (Nome, gênero, idade, email, senha) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [Nome, gênero, idade, email, senha]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao criar usuário: ' + error.message);
  }
};

// Função para atualizar um usuário por ID
const updateUsuario = async (id, Nome, gênero, idade, email, senha) => {
  try {
    const result = await db.query(
      'UPDATE Usuarios SET Nome = $1, gênero = $2, idade = $3, email = $4, senha = $5 WHERE id = $6 RETURNING *',
      [Nome, gênero, idade, email, senha, id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao atualizar usuário: ' + error.message);
  }
};

// Função para deletar um usuário por ID
const deleteUsuario = async (id) => {
  try {
    const result = await db.query('DELETE FROM Usuarios WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao deletar usuário: ' + error.message);
  }
};

module.exports = {
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario
};
