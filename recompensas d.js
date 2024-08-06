// Definir los segmentos y sus probabilidades
const segments = [
    { number: 1, points: 10, probability: 0.20 },
    { number: 2, points: 40, probability: 0.10 },
    { number: 3, points: 55, probability: 0.10 },
    { number: 4, points: 18, probability: 0.20 },
    { number: 5, points: 90, probability: 0.10 },
    { number: 6, points: 60, probability: 0.10 },
    { number: 7, points: 70, probability: 0.10 },
    { number: 8, points: 150, probability: 0.05 },
    { number: 9, points: 30, probability: 0.05 },
    { number: 10, points: 300, probability: 0.01 }
];

// Función para obtener un número basado en probabilidades
function getRandomNumber() {
    let random = Math.random();
    let cumulativeProbability = 0;

    for (let i = 0; i < segments.length; i++) {
        cumulativeProbability += segments[i].probability;
        if (random <= cumulativeProbability) {
            return segments[i];
        }
    }
}

// Función para actualizar el balance de puntos y guardar transacciones en localStorage
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

// Función para resaltar el número en la lista
function highlightNumber(number) {
    const listItems = document.querySelectorAll('#resultsList li');
    listItems.forEach(item => {
        item.classList.remove('highlighted');
        if (parseInt(item.getAttribute('data-number')) === number) {
            item.classList.add('highlighted');
        }
    });
}

// Función para jugar y verificar si el usuario puede jugar
function playNumber() {
    const lastPlayDate = localStorage.getItem('lastPlayDate');
    const now = new Date();
    const today = now.toISOString().split('T')[0]; // Solo la fecha (sin hora)

    if (lastPlayDate === today) {
        alert('Ya has jugado hoy. Puedes jugar nuevamente mañana.');
        return;
    }

    // Actualizar la fecha de la última jugada
    localStorage.setItem('lastPlayDate', today);

    const numberDisplay = document.getElementById('numberDisplay');
    const duration = 3000; // Duración del efecto en milisegundos
    const interval = 100; // Intervalo de actualización en milisegundos
    const endTime = Date.now() + duration;

    function updateNumber() {
        if (Date.now() < endTime) {
            const randomNumber = Math.floor(Math.random() * segments.length) + 1;
            numberDisplay.innerText = randomNumber;
            setTimeout(updateNumber, interval);
        } else {
            // Mostrar el número ganador después de la animación
            const winningSegment = getRandomNumber();
            numberDisplay.innerText = winningSegment.number;
            updatePoints(winningSegment.points, `Ganado con el número ${winningSegment.number}`);
            alert(`Has ganado ${winningSegment.points} puntos con el número ${winningSegment.number}`);
            highlightNumber(winningSegment.number); // Resaltar el número ganador
        }
    }

    updateNumber();
}

// Evento para generar un número cuando se hace clic en el botón
document.getElementById('playNumberButton').addEventListener('click', playNumber);
