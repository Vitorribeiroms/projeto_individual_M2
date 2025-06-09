document.addEventListener('DOMContentLoaded', () => {
  fetch('/agendamentos')
    .then(response => response.json())
    .then(reservas => {
      const container = document.getElementById('reservas-container');
      container.innerHTML = '';
      reservas.forEach(reserva => {
        const div = document.createElement('div');
        div.className = 'reserva-card';
        div.innerHTML = `
          <h3>${reserva.nome_sala || reserva.id_sala}</h3>
          <p>Data: ${reserva.data}</p>
          <p>Hora: ${reserva.hora}</p>
        `;
        container.appendChild(div);
      });
    })
    .catch(() => {
      document.getElementById('reservas-container').innerHTML = '<p style="color:red">Erro ao carregar reservas</p>';
    });
}); 