const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('../config/db');

// Roteamento para páginas dinâmicas
router.get('/', (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Página Inicial',
    content: path.join(__dirname, '../views/pages/page1')
  });
});

router.get('/about', (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Página Inicial',
    content: path.join(__dirname, '../views/pages/page2')
  });
});

router.get('/login', (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Login',
    content: path.join(__dirname, '../views/pages/login')
  });
});

router.get('/calendar', (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Calendário de Reservas',
    content: path.join(__dirname, '../views/pages/calendar')
  });
});

router.get('/minhas-reservas', async (req, res) => {
  try {
    // Aqui você deve implementar a lógica para buscar as reservas do usuário atual
    // Por enquanto, vamos usar dados de exemplo
    const reservas = [
      {
        id: 1,
        numero_sala: '101',
        data: '2025-06-20',
        hora: '14:00'
      },
      {
        id: 2,
        numero_sala: '202',
        data: '2025-06-25',
        hora: '10:00'
      }
    ];

    res.render('pages/minhas-reservas', {
      pageTitle: 'Minhas Reservas',
      reservas: reservas
    });
  } catch (error) {
    console.error('Erro ao buscar reservas:', error);
    res.status(500).render('pages/error', {
      message: 'Erro ao carregar suas reservas',
      error: error
    });
  }
});

module.exports = router;


