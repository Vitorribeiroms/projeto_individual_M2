const db = require('../config/db');

class Sala {
  static async getAll() {
    const result = await db.query('SELECT * FROM Salas');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM Salas WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data) {
    const result = await db.query(
      'INSERT INTO Salas (numero) VALUES ($1) RETURNING *',
      [data.numero]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const result = await db.query(
      'UPDATE Salas SET numero = $1 WHERE id = $2 RETURNING *',
      [data.numero, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM Salas WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = Sala;
