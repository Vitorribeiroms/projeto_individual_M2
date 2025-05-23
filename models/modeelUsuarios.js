const db = require('../config/db');

class Usuario {
  static async getAll() {
    const result = await db.query('SELECT * FROM Usuarios');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM Usuarios WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data) {
    const result = await db.query(
      'INSERT INTO Usuarios (Nome, gênero, idade, email, senha) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [data.Nome, data.gênero, data.idade, data.email, data.senha]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const result = await db.query(
      'UPDATE Usuarios SET Nome = $1, gênero = $2, idade = $3, email = $4, senha = $5 WHERE id = $6 RETURNING *',
      [data.Nome, data.gênero, data.idade, data.email, data.senha, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM Usuarios WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = Usuario;
