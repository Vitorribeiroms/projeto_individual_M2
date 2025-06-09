const pool = require('../config/db');

class AgendamentoModel {
    async create(agendamentoData) {
        const { data, hora, id_usuario, id_sala } = agendamentoData;
        const query = 'INSERT INTO agendamentos (data, hora, id_usuario, id_sala) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [data, hora, id_usuario, id_sala];
        
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    async findAll() {
        const query = `
            SELECT a.*, u.nome as nome_usuario, s.numero as numero_sala 
            FROM agendamentos a
            JOIN usuarios u ON a.id_usuario = u.id
            JOIN salas s ON a.id_sala = s.id
        `;
        const result = await pool.query(query);
        return result.rows;
    }

    async findById(id) {
        const query = `
            SELECT a.*, u.nome as nome_usuario, s.numero as numero_sala 
            FROM agendamentos a
            JOIN usuarios u ON a.id_usuario = u.id
            JOIN salas s ON a.id_sala = s.id
            WHERE a.id = $1
        `;
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }

    async findByUsuario(usuarioId) {
        const query = `
            SELECT a.*, s.numero as numero_sala, s.descricao as descricao_sala
            FROM agendamentos a
            JOIN salas s ON a.id_sala = s.id
            WHERE a.id_usuario = $1
            ORDER BY a.data, a.hora
        `;
        const result = await pool.query(query, [usuarioId]);
        return result.rows;
    }

    async update(id, agendamentoData) {
        const { data, hora, status } = agendamentoData;
        const query = 'UPDATE agendamentos SET data = $1, hora = $2, status = $3 WHERE id = $4 RETURNING *';
        const values = [data, hora, status, id];
        
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    async delete(id) {
        const query = 'DELETE FROM agendamentos WHERE id = $1 RETURNING *';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }

    async verificarConflito(id_sala, data, hora, id_excluir = null) {
        let query = `
            SELECT COUNT(*) as count 
            FROM agendamentos 
            WHERE id_sala = $1 
            AND data = $2 
            AND hora = $3 
            AND status = 'confirmado'
        `;
        const values = [id_sala, data, hora];
        
        if (id_excluir) {
            query += ' AND id != $4';
            values.push(id_excluir);
        }
        
        const result = await pool.query(query, values);
        return parseInt(result.rows[0].count) > 0;
    }
}

module.exports = new AgendamentoModel();
