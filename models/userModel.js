const pool = require('../config/db');

class UserModel {
    async create(userData) {
        const { nome, genero, idade, email, senha } = userData;
        const query = 'INSERT INTO usuarios (nome, genero, idade, email, senha) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [nome, genero, idade, email, senha];
        
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    async findAll() {
        const query = 'SELECT id, nome, genero, idade, email, created_at FROM usuarios';
        const result = await pool.query(query);
        return result.rows;
    }

    async findById(id) {
        const query = 'SELECT id, nome, genero, idade, email, created_at FROM usuarios WHERE id = $1';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }

    async findByEmail(email) {
        const query = 'SELECT id, nome, genero, idade, email, created_at FROM usuarios WHERE email = $1';
        const result = await pool.query(query, [email]);
        return result.rows[0];
    }

    async update(id, userData) {
        const { nome, genero, idade, email } = userData;
        const query = 'UPDATE usuarios SET nome = $1, genero = $2, idade = $3, email = $4 WHERE id = $5 RETURNING *';
        const values = [nome, genero, idade, email, id];
        
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    async delete(id) {
        const query = 'DELETE FROM usuarios WHERE id = $1 RETURNING *';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }
}

module.exports = new UserModel();
