// Función para cargar el perfil del usuario y mostrar el balance de puntos y historial de transacciones
function loadProfile() {
    const userId = 'defaultUser';  // ID de usuario por defecto
  
    // Obtener el balance de puntos del usuario desde localStorage
    const userPoints = localStorage.getItem(userId) || 0;
  
    // Mostrar el balance de puntos en la página
    const balanceDiv = document.getElementById('points');
    balanceDiv.innerText = userPoints;
  
    // Obtener y mostrar el historial de transacciones
    const transactionsDiv = document.getElementById('transactions');
    transactionsDiv.innerHTML = '';
    const transactions = JSON.parse(localStorage.getItem(`${userId}_transactions`) || '[]');
    transactions.forEach(transaction => {
      const transactionElement = document.createElement('div');
      transactionElement.classList.add('transaction');
      transactionElement.innerText = `Puntos: ${transaction.points}, Razón: ${transaction.reason}, Fecha: ${new Date(transaction.date).toLocaleString()}`;
      transactionsDiv.appendChild(transactionElement);
    });
  }
  
  // Función para actualizar el balance de puntos del usuario y guardar transacciones en localStorage
  function updatePoints(points, reason) {
    const userId = 'defaultUser';  // ID de usuario por defecto
    let userPoints = parseInt(localStorage.getItem(userId) || 0);
    userPoints += points;
    localStorage.setItem(userId, userPoints);
  
    // Guardar la transacción en el historial
    const transaction = { points, reason, date: new Date() };
    const transactions = JSON.parse(localStorage.getItem(`${userId}_transactions`) || '[]');
    transactions.push(transaction);
    localStorage.setItem(`${userId}_transactions`, JSON.stringify(transactions));
  
    // Recargar el perfil para reflejar los cambios
    loadProfile();
  }
  
  // Cargar el perfil cuando se carga la página
  document.addEventListener('DOMContentLoaded', loadProfile);
  