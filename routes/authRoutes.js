const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const { guestMiddleware, authMiddleware } = require('../middleware/auth');

// Rota de login (GET)
router.get('/login', guestMiddleware, (req, res) => {
  res.render('pages/login', {
    pageTitle: 'Login',
    error: req.query.error
  });
});

// Rota de login (POST)
router.post('/login', guestMiddleware, async (req, res) => {
  try {
    const { email, senha } = req.body;
    
    // Buscar usuário pelo email
    const user = await userModel.findByEmail(email);
    
    if (!user) {
      return res.redirect('/auth/login?error=Credenciais inválidas');
    }
    
    // Verificar senha
    const senhaValida = await bcrypt.compare(senha, user.senha);
    
    if (!senhaValida) {
      return res.redirect('/auth/login?error=Credenciais inválidas');
    }
    
    // Criar sessão
    req.session.userId = user.id;
    req.session.userName = user.nome;
    
    res.redirect('/home');
  } catch (error) {
    console.error('Erro no login:', error);
    res.redirect('/auth/login?error=Erro interno do servidor');
  }
});

// Rota de registro (GET)
router.get('/registro', guestMiddleware, (req, res) => {
  res.render('pages/registro', {
    pageTitle: 'Registro',
    error: req.query.error
  });
});

// Rota de registro (POST)
router.post('/registro', guestMiddleware, async (req, res) => {
  try {
    const { nome, genero, idade, email, senha } = req.body;
    
    // Verificar se o email já existe
    const existingUser = await userModel.findByEmail(email);
    if (existingUser) {
      return res.redirect('/auth/registro?error=Email já cadastrado');
    }
    
    // Criar usuário
    await userModel.createUsuario({ nome, genero, idade, email, senha });
    
    res.redirect('/auth/login?success=Usuário cadastrado com sucesso');
  } catch (error) {
    console.error('Erro no registro:', error);
    res.redirect('/auth/registro?error=Erro ao cadastrar usuário');
  }
});

// Rota de logout
router.post('/logout', authMiddleware, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Erro ao destruir sessão:', err);
    }
    res.redirect('/auth/login');
  });
});

module.exports = router; 