document.addEventListener('DOMContentLoaded', () => {
  fetch('/users')
    .then(response => response.json())
    .then(usuarios => {
      const container = document.getElementById('usuarios-container');
      container.innerHTML = '';
      usuarios.forEach(usuario => {
        const div = document.createElement('div');
        div.className = 'usuario-card';
        div.innerHTML = `
          <h3>${usuario.nome}</h3>
          <p>Email: ${usuario.email}</p>
          <p>Idade: ${usuario.idade || '-'}</p>
        `;
        container.appendChild(div);
      });
    })
    .catch(() => {
      document.getElementById('usuarios-container').innerHTML = '<p style="color:red">Erro ao carregar usuários</p>';
    });
}); 