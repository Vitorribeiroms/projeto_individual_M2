const db = require('../config/db');

// Função para obter todos os agendamentos
const getAllAgendamentos = async () => {
  try {
    const result = await db.query('SELECT * FROM Agendamentos');
    return result.rows;
  } catch (error) {
    throw new Error('Erro ao obter agendamentos: ' + error.message);
  }
};

// Função para obter um agendamento por ID
const getAgendamentoById = async (id) => {
  try {
    const result = await db.query('SELECT * FROM Agendamentos WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao obter agendamento: ' + error.message);
  }
};

// Função para criar um novo agendamento
const createAgendamento = async (Data, Hora, id_Salas, id_Usuarios) => {
  try {
    const result = await db.query(
      'INSERT INTO Agendamentos (Data, Hora, id_Salas, id_Usuarios) VALUES ($1, $2, $3, $4) RETURNING *',
      [Data, Hora, id_Salas, id_Usuarios]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao criar agendamento: ' + error.message);
  }
};

// Função para atualizar um agendamento por ID
const updateAgendamento = async (id, Data, Hora, id_Salas, id_Usuarios) => {
  try {
    const result = await db.query(
      'UPDATE Agendamentos SET Data = $1, Hora = $2, id_Salas = $3, id_Usuarios = $4 WHERE id = $5 RETURNING *',
      [Data, Hora, id_Salas, id_Usuarios, id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao atualizar agendamento: ' + error.message);
  }
};

// Função para deletar um agendamento por ID
const deleteAgendamento = async (id) => {
  try {
    const result = await db.query('DELETE FROM Agendamentos WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao deletar agendamento: ' + error.message);
  }
};

module.exports = {
  getAllAgendamentos,
  getAgendamentoById,
  createAgendamento,
  updateAgendamento,
  deleteAgendamento
};
