const db = require('../config/db');

class Agendamento {
  static async getAll() {
    const result = await db.query('SELECT * FROM Agendamentos');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM Agendamentos WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data) {
    const result = await db.query(
      'INSERT INTO Agendamentos (Data, Hora, id_Salas, id_Usuarios) VALUES ($1, $2, $3, $4) RETURNING *',
      [data.Data, data.Hora, data.id_Salas, data.id_Usuarios]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const result = await db.query(
      'UPDATE Agendamentos SET Data = $1, Hora = $2, id_Salas = $3, id_Usuarios = $4 WHERE id = $5 RETURNING *',
      [data.Data, data.Hora, data.id_Salas, data.id_Usuarios, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM Agendamentos WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = Agendamento;
