// script.js

// Función para obtener el balance de puntos del usuario
function obtenerPuntos() {
    const userId = 'defaultUser';  // ID de usuario por defecto
    return parseInt(localStorage.getItem(userId) || 0);
  }
  
  // Función para actualizar el balance de puntos del usuario
  function actualizarPuntos(puntos, razon) {
    const userId = 'defaultUser';  // ID de usuario por defecto
    let userPoints = obtenerPuntos();
    userPoints += puntos;
    localStorage.setItem(userId, userPoints);
  
    // Guardar la transacción en el historial del usuario
    const transaction = { points: puntos, reason: razon, date: new Date() };
    const transactions = JSON.parse(localStorage.getItem(`${userId}_transactions`) || '[]');
    transactions.push(transaction);
    localStorage.setItem(`${userId}_transactions`, JSON.stringify(transactions));
  
    document.getElementById('points').innerText = userPoints;
  }
  
  // Función para generar una carta aleatoria (1-13)
  function generarCarta() {
    return Math.floor(Math.random() * 13) + 1;
  }
  
  // Función para obtener el número de juegos jugados hoy
  function obtenerJuegosHoy() {
    const today = new Date().toISOString().split('T')[0];
    const juegos = JSON.parse(localStorage.getItem(`games_${today}`) || '0');
    return juegos;
  }
  
  // Función para actualizar el número de juegos jugados hoy
  function actualizarJuegosHoy() {
    const today = new Date().toISOString().split('T')[0];
    const juegos = obtenerJuegosHoy() + 1;
    localStorage.setItem(`games_${today}`, juegos);
  }
  
  // Función para jugar el juego de Mayor o Menor
  function jugar(apuesta, opcion) {
    const apuestaValor = parseInt(apuesta.value);
    const userPoints = obtenerPuntos();
  
    // Validar la apuesta
    if (isNaN(apuestaValor) || apuestaValor < 1 || apuestaValor > 50) {
      alert('La apuesta debe ser un número entre 1 y 50 puntos.');
      return;
    }
    if (apuestaValor > userPoints) {
      alert('No tienes suficientes puntos para hacer esta apuesta.');
      return;
    }
  
    // Verificar el límite de juegos diarios
    if (obtenerJuegosHoy() >= 5) {
      alert('Has alcanzado el límite de 5 juegos por hoy.');
      return;
    }
  
    // Mostrar la carta del jugador
    const initialCard = generarCarta();
    document.getElementById('initial-card').innerText = initialCard;
    document.getElementById('initial-card').style.backgroundColor = "#d4e157"; // Verde para la carta del jugador
  
    // Actualizar el número de juegos jugados hoy
    actualizarJuegosHoy();
  
    // Esperar un momento antes de revelar la carta
    setTimeout(() => {
      const revealedCard = generarCarta();
      document.getElementById('revealed-card').innerText = revealedCard;
      document.getElementById('revealed-card').style.backgroundColor = "#e57373"; // Rojo para la carta revelada
  
      const resultadoDiv = document.getElementById('result');
  
      if ((opcion === 'mayor' && revealedCard > initialCard) || (opcion === 'menor' && revealedCard < initialCard)) {
        const ganancia = apuestaValor / 2;
        actualizarPuntos(ganancia, 'Ganaste en Mayor o Menor');
        resultadoDiv.innerText = `¡Ganaste! Recibes ${ganancia} puntos.`;
      } else {
        actualizarPuntos(-apuestaValor, 'Perdiste en Mayor o Menor');
        resultadoDiv.innerText = `Perdiste. Se te han restado ${apuestaValor} puntos.`;
      }
    }, 1000); // Retraso de 1 segundo para revelar la carta
  }
  
  // Inicializar el juego
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('points').innerText = obtenerPuntos();
  
    const apuesta = document.getElementById('bet-amount');
    document.getElementById('bet-higher').addEventListener('click', () => jugar(apuesta, 'mayor'));
    document.getElementById('bet-lower').addEventListener('click', () => jugar(apuesta, 'menor'));
  });
  