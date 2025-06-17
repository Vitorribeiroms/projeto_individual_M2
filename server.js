require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();
const db = require('./config/db');
const path = require('path');

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configuração dos arquivos estáticos
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Middleware para parsing de JSON e formulários
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração de sessões
app.use(session({
  secret: process.env.SESSION_SECRET || 'sua-chave-secreta-aqui',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // set to true if using https
    maxAge: 24 * 60 * 60 * 1000 // 24 horas
  }
}));

db.connect()
  .then(() => {
    console.log('Conectado ao banco de dados PostgreSQL');

    // Rotas de Autenticação
    const authRoutes = require('./routes/authRoutes');
    app.use('/auth', authRoutes);

    // Rotas da API
    const userRoutes = require('./routes/userRoutes');
    app.use('/api/users', userRoutes);

    const salasRoutes = require('./routes/salasRoutes');
    app.use('/api/salas', salasRoutes);

    const agendamentosRoutes = require('./routes/agendamentosRoutes');
    app.use('/api/agendamentos', agendamentosRoutes);

    // Rotas do Frontend
    const frontendRoutes = require('./routes/frontRoutes');
    app.use('/', frontendRoutes);

    // Middleware para lidar com erros de rota não encontrada
    app.use((req, res, next) => {
      res.status(404).render('pages/error', { 
        message: 'Página não encontrada',
        error: { status: 404 }
      });
    });

    // Middleware para lidar com erros internos do servidor
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).render('pages/error', { 
        message: 'Erro interno do servidor',
        error: err
      });
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });
