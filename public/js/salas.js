document.addEventListener('DOMContentLoaded', () => {
  fetch('/salas')
    .then(response => response.json())
    .then(salas => {
      const container = document.getElementById('salas-container');
      container.innerHTML = '';
      salas.forEach(sala => {
        const salaDiv = document.createElement('div');
        salaDiv.className = 'sala-card';
        salaDiv.innerHTML = `
          <h3>${sala.numero}</h3>
          <p>${sala.descricao || ''}</p>
          <span>Capacidade: ${sala.capacidade || '-'}</span>
        `;
        container.appendChild(salaDiv);
      });
    })
    .catch(err => {
      const container = document.getElementById('salas-container');
      container.innerHTML = '<p style="color:red">Erro ao carregar salas</p>';
    });
}); 