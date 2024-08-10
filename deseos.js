const puntosPorDia = 300; // Cantidad de puntos a pagar cada día
const diasRequeridos = 3;
const userId = 'defaultUser';
const paymentKey = `${userId}_deseosPagos`;
const lastResetKey = `${userId}_lastReset`;

function obtenerPagos() {
    return parseInt(localStorage.getItem(paymentKey) || 0);
}

function actualizarPagos() {
    const pagos = obtenerPagos() + 1;
    localStorage.setItem(paymentKey, pagos);
    return pagos;
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

function reiniciarJuego() {
    localStorage.removeItem(paymentKey);
    localStorage.setItem(lastResetKey, Date.now());
    document.getElementById('payButton').disabled = false;
    document.getElementById('googleForm').style.display = 'none';
    actualizarEstado();
}

function debeReiniciar() {
    const lastReset = localStorage.getItem(lastResetKey);
    if (!lastReset) return false;
    
    const now = new Date();
    const lastResetDate = new Date(parseInt(lastReset));
    
    // Comprobar si es una nueva semana (empezando el lunes)
    return now.getDay() === 1 && now > lastResetDate;
}

document.getElementById('payButton').addEventListener('click', function() {
    const pagos = obtenerPagos();
    const puntos = obtenerPuntos();

    if (puntos < puntosPorDia) {
        alert('No tienes suficientes puntos.');
        return;
    }

    actualizarPuntos(-puntosPorDia);
    const nuevosPagos = actualizarPagos();

    if (nuevosPagos >= diasRequeridos) {
        document.getElementById('googleForm').style.display = 'block';
        document.getElementById('payButton').disabled = true;
    }

    actualizarEstado();
});

function actualizarEstado() {
    const pagos = obtenerPagos();
    const mensaje = pagos < diasRequeridos ? 
        `Has pagado ${pagos} de ${diasRequeridos}. ¡Haz tus tres pagos para pedir un deseo!` : 
        '¡Has completado los pagos!';

    document.getElementById('statusMessage').innerText = mensaje;
    if (pagos >= diasRequeridos) {
        document.getElementById('googleForm').style.display = 'block';
        document.getElementById('payButton').disabled = true;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (debeReiniciar()) {
        reiniciarJuego();
    } else {
        actualizarEstado();
        document.getElementById('userPoints').innerText = obtenerPuntos();
        document.getElementById('paymentPoints').innerText = puntosPorDia;
    }
});

// Reinicia automáticamente el juego después de enviar el formulario
document.querySelector('iframe').addEventListener('load', function() {
    const pagos = obtenerPagos();
    if (pagos >= diasRequeridos) {
        setTimeout(() => {
            alert('¡Gracias por participar! Puedes volver a jugar la próxima semana.');
            reiniciarJuego();
        }, 1000); // Esperar un segundo antes de reiniciar el juego
    }
});
