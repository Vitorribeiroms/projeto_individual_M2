const authMiddleware = (req, res, next) => {
  // Verifica se o usuário está logado através da sessão
  if (req.session && req.session.userId) {
    next();
  } else {
    // Se não estiver logado, redireciona para login
    res.redirect('/login');
  }
};

const guestMiddleware = (req, res, next) => {
  // Verifica se o usuário NÃO está logado (para páginas de login/registro)
  if (req.session && req.session.userId) {
    // Se estiver logado, redireciona para home
    res.redirect('/home');
  } else {
    next();
  }
};

module.exports = {
  authMiddleware,
  guestMiddleware
}; 