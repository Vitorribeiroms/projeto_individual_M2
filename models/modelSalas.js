const pool = require('../config/db');

class SalaModel {
    async create(salaData) {
        const { numero, capacidade, descricao } = salaData;
        const query = 'INSERT INTO salas (numero, capacidade, descricao) VALUES ($1, $2, $3) RETURNING *';
        const values = [numero, capacidade, descricao];
        
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    async findAll() {
        const query = 'SELECT * FROM salas';
        const result = await pool.query(query);
        return result.rows;
    }

    async findById(id) {
        const query = 'SELECT * FROM salas WHERE id = $1';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }

    async findByNumero(numero) {
        const query = 'SELECT * FROM salas WHERE numero = $1';
        const result = await pool.query(query, [numero]);
        return result.rows[0];
    }

    async update(id, salaData) {
        const { numero, capacidade, descricao, status } = salaData;
        const query = 'UPDATE salas SET numero = $1, capacidade = $2, descricao = $3, status = $4 WHERE id = $5 RETURNING *';
        const values = [numero, capacidade, descricao, status, id];
        
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    async delete(id) {
        const query = 'DELETE FROM salas WHERE id = $1 RETURNING *';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }

    async checkDisponibilidade(id, data, hora) {
        const query = `
            SELECT COUNT(*) as count 
            FROM agendamentos 
            WHERE id_sala = $1 
            AND data = $2 
            AND hora = $3 
            AND status = 'confirmado'`;
        const result = await pool.query(query, [id, data, hora]);
        return parseInt(result.rows[0].count) === 0;
    }
}

module.exports = new SalaModel();
