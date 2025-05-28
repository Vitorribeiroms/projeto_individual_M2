const db = require('../config/db');

// Função para obter todas as salas
const getAllSalas = async () => {
  try {
    const result = await db.query('SELECT * FROM Salas');
    return result.rows;
  } catch (error) {
    throw new Error('Erro ao obter salas: ' + error.message);
  }
};

// Função para obter uma sala por ID
const getSalaById = async (id) => {
  try {
    const result = await db.query('SELECT * FROM Salas WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao obter sala: ' + error.message);
  }
};

// Função para criar uma nova sala
const createSala = async (numero) => {
  try {
    const result = await db.query(
      'INSERT INTO Salas (numero) VALUES ($1) RETURNING *',
      [numero]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao criar sala: ' + error.message);
  }
};

// Função para atualizar uma sala por ID
const updateSala = async (id, numero) => {
  try {
    const result = await db.query(
      'UPDATE Salas SET numero = $1 WHERE id = $2 RETURNING *',
      [numero, id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao atualizar sala: ' + error.message);
  }
};

// Função para deletar uma sala por ID
const deleteSala = async (id) => {
  try {
    const result = await db.query('DELETE FROM Salas WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao deletar sala: ' + error.message);
  }
};

module.exports = {
  getAllSalas,
  getSalaById,
  createSala,
  updateSala,
  deleteSala
};
