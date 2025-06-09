document.addEventListener('DOMContentLoaded', () => {
  fetch('/agendamentos')
    .then(response => response.json())
    .then(agendamentos => {
      const container = document.getElementById('agendamentos-container');
      container.innerHTML = '';
      agendamentos.forEach(agendamento => {
        const div = document.createElement('div');
        div.className = 'agendamento-card';
        div.innerHTML = `
          <h3>${agendamento.nome_sala || agendamento.id_sala}</h3>
          <p>Data: ${agendamento.data}</p>
          <p>Hora: ${agendamento.hora}</p>
        `;
        container.appendChild(div);
      });
    })
    .catch(() => {
      document.getElementById('agendamentos-container').innerHTML = '<p style=\"color:red\">Erro ao carregar agendamentos</p>';
    });
}); 