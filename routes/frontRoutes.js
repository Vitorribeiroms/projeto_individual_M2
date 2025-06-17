const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../config/db');
const { authMiddleware } = require('../middleware/auth');

// Rota inicial - redireciona para login
router.get('/', (req, res) => {
  if (req.session && req.session.userId) {
    res.redirect('/home');
  } else {
    res.redirect('/auth/login');
  }
});

// Rota de login - redireciona para auth/login
router.get('/login', (req, res) => {
  res.redirect('/auth/login');
});

// Rota de registro - redireciona para auth/registro
router.get('/registro', (req, res) => {
  res.redirect('/auth/registro');
});

// Rota home - requer autenticação
router.get('/home', authMiddleware, (req, res) => {
  res.render('pages/home', {
    pageTitle: 'Home',
    userName: req.session.userName
  });
});

// Rota de seleção de salas - requer autenticação
router.get('/room-carousel', authMiddleware, (req, res) => {
  res.render('pages/room-carousel', {
    pageTitle: 'Selecionar Sala'
  });
});

// Rota do calendário - requer autenticação
router.get('/calendar', authMiddleware, (req, res) => {
  const sala = req.query.sala;
  res.render('pages/calendar', {
    pageTitle: 'Calendário de Reservas',
    sala: sala
  });
});

// Rota de minhas reservas - requer autenticação
router.get('/minhas-reservas', authMiddleware, async (req, res) => {
  try {
    // Buscar reservas do usuário logado
    const query = `
      SELECT a.id, a.data, a.hora, s.numero 
      FROM agendamentos a 
      JOIN salas s ON a.id_sala = s.id 
      WHERE a.id_usuario = $1 
      ORDER BY a.data DESC, a.hora ASC
    `;
    const result = await db.query(query, [req.session.userId]);

    res.render('pages/minhas-reservas', {
      pageTitle: 'Minhas Reservas',
      reservas: result.rows,
      userName: req.session.userName
    });
  } catch (error) {
    console.error('Erro ao buscar reservas:', error);
    res.status(500).render('pages/error', {
      message: 'Erro ao carregar suas reservas',
      error: error
    });
  }
});

// Rota para criar reserva - requer autenticação
router.post('/criar-reserva', authMiddleware, async (req, res) => {
  try {
    const { sala_id, data, hora } = req.body;
    const usuario_id = req.session.userId;

    // Buscar o UUID da sala pelo número
    const salaNumero = String(sala_id);
    const salaResult = await db.query('SELECT id FROM salas WHERE numero = $1', [salaNumero]);
    if (salaResult.rows.length === 0) {
      return res.status(400).json({ error: 'Sala não encontrada' });
    }
    const uuidSala = salaResult.rows[0].id;

    // Verificar se a sala está disponível
    const checkQuery = `
      SELECT id FROM agendamentos 
      WHERE id_sala = $1 AND data = $2 AND hora = $3
    `;
    const checkResult = await db.query(checkQuery, [uuidSala, data, hora]);

    if (checkResult.rows.length > 0) {
      return res.status(400).json({ error: 'Sala já reservada para este horário' });
    }

    // Criar a reserva
    const insertQuery = `
      INSERT INTO agendamentos (id_usuario, id_sala, data, hora) 
      VALUES ($1, $2, $3, $4) 
      RETURNING id
    `;
    await db.query(insertQuery, [usuario_id, uuidSala, data, hora]);

    res.json({ success: true, message: 'Reserva criada com sucesso!' });
  } catch (error) {
    console.error('Erro ao criar reserva:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;


