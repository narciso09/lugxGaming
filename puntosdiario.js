const puntosPorDia = [10, 22, 55, 30, 25, 60, 100]; // Cantidad de puntos por cada día
const diasRequeridos = puntosPorDia.length;
const userId = 'defaultUser';
const dailyPointsKey = `${userId}_puntosDiarios`;
const lastClaimDateKey = `${userId}_ultimaFecha`;

function obtenerDias() {
    return parseInt(localStorage.getItem(dailyPointsKey) || 0);
}

function actualizarDias() {
    const dias = obtenerDias() + 1;
    localStorage.setItem(dailyPointsKey, dias);
    return dias;
}

function obtenerPuntos() {
    return parseInt(localStorage.getItem(userId) || 0);
}

function actualizarPuntos(puntos) {
    let userPoints = obtenerPuntos();
    userPoints += puntos;
    localStorage.setItem(userId, userPoints);
    document.getElementById('userPoints').innerText = userPoints;
}

function obtenerUltimaFecha() {
    return localStorage.getItem(lastClaimDateKey);
}

function actualizarUltimaFecha() {
    const fechaHoy = new Date().toISOString().split('T')[0];
    localStorage.setItem(lastClaimDateKey, fechaHoy);
}

function resetearJuego() {
    localStorage.removeItem(dailyPointsKey);
    localStorage.removeItem(lastClaimDateKey);
}

document.getElementById('claimButton').addEventListener('click', function() {
    const dias = obtenerDias();
    const ultimaFecha = obtenerUltimaFecha();
    const fechaHoy = new Date().toISOString().split('T')[0];

    if (ultimaFecha === fechaHoy) {
        alert('Ya has reclamado tus puntos hoy.');
        return;
    }

    const puntosHoy = puntosPorDia[dias];
    actualizarPuntos(puntosHoy);
    const nuevosDias = actualizarDias();
    actualizarUltimaFecha();

    if (nuevosDias >= diasRequeridos) {
        alert('¡Has completado los 7 días! El juego se reiniciará.');
        resetearJuego();
    }

    actualizarEstado();
});

function actualizarEstado() {
    const dias = obtenerDias();
    const mensaje = dias < diasRequeridos ? 
        `Has reclamado puntos por ${dias} de ${diasRequeridos} días. Hoy recibirás ${puntosPorDia[dias]} puntos.` : 
        '¡Has completado los 7 días!';
    document.getElementById('statusMessage').innerText = mensaje;
    document.getElementById('userPoints').innerText = obtenerPuntos();
}

document.addEventListener('DOMContentLoaded', function() {
    actualizarEstado();
});
