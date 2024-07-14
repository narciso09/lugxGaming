let points = parseInt(localStorage.getItem('seconds')) || 0;
let intervalId;

document.getElementById('points').textContent = points;

document.getElementById('startButton').addEventListener('click', () => {
  if (!intervalId) {
    intervalId = setInterval(incrementPoints, 1000); // Incrementar puntos cada segundo
    document.getElementById('startButton').disabled = true;
  }
});

document.getElementById('stopButton').addEventListener('click', stopCounter);

function incrementPoints() {
  points++;
  document.getElementById('points').textContent = points;
  localStorage.setItem('seconds', points);

  if (points % 60 === 0) { // Cada 60 segundos, sumar un punto al total de puntos
    updateTotalPoints(1, 'Tiempo jugado');
  }
}

function stopCounter() {
  clearInterval(intervalId);
  intervalId = null;
  document.getElementById('startButton').disabled = false;
}

function updateTotalPoints(points, reason) {
  const userId = 'defaultUser';
  let userPoints = parseInt(localStorage.getItem(userId) || 0);
  userPoints += points;
  localStorage.setItem(userId, userPoints);

  const transaction = { points, reason, date: new Date() };
  const transactions = JSON.parse(localStorage.getItem(`${userId}_transactions`) || '[]');
  transactions.push(transaction);
  localStorage.setItem(`${userId}_transactions`, JSON.stringify(transactions));
}

// Detectar pérdida de foco en la ventana principal
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    stopCounter();
  } else if (document.getElementById('startButton').disabled && !intervalId) {
    intervalId = setInterval(incrementPoints, 1000);
  }
});
