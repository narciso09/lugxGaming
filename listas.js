const codes = [
    "CODIGO1",
    "CODIGO2",
    "CODIGO3",
    "CODIGO4",
    "CODIGO5",
    "CODIGO6",
    "CODIGO7",
    "CODIGO8",
    "CODIGO9",
    "CODIGO10",
    "CODIGO1",
    "CODIGO2",
    "CODIGO3",
    "CODIGO4",
    "CODIGO5",
    "CODIGO6",
    "CODIGO7",
    "CODIGO8",
    "CODIGO9",
    "CODIGO10",
    "CODIGO1",
    "CODIGO2",
    "CODIGO3",
    "CODIGO4",
    "CODIGO5",
    "CODIGO6",
    "CODIGO7",
    "CODIGO8",
    "CODIGO9",
    "CODIGO10"
];

let currentIndex = parseInt(localStorage.getItem('currentIndex')) || 0;
let nextAvailableTime = parseInt(localStorage.getItem('nextAvailableTime')) || 0;
let lastResetDate = localStorage.getItem('lastResetDate') || null;

function showCode() {
    const now = Math.floor(Date.now() / 1000);
    if (currentIndex < codes.length) {
        const currentCode = codes[currentIndex];
        document.getElementById("codeDisplay").textContent = currentCode;

        const li = document.createElement("li");
        li.textContent = currentCode;
        document.getElementById("codeList").appendChild(li);

        currentIndex++;
        localStorage.setItem('currentIndex', currentIndex.toString());
        
        nextAvailableTime = now + 1200; // Tiempo de espera en segundos
        localStorage.setItem('nextAvailableTime', nextAvailableTime.toString());

        disableButtonTemporarily(nextAvailableTime - now);
    } else {
        document.getElementById("codeDisplay").textContent = "No hay más códigos disponibles.";
        document.getElementById("showCodeButton").disabled = true;
    }
}

function disableButtonTemporarily(seconds) {
    const button = document.getElementById("showCodeButton");
    button.disabled = true;

    let countdown = seconds;
    button.textContent = `Espera ${countdown} segundos`;

    const interval = setInterval(() => {
        countdown--;
        if (countdown > 0) {
            button.textContent = `Espera ${countdown} segundos`;
        } else {
            button.textContent = "Mostrar Código";
            button.disabled = false;
            clearInterval(interval);
        }
    }, 1000); // Actualiza cada segundo (1000ms = 1 segundo)
}

function clearOldCodes() {
    const now = new Date();
    const today = now.toISOString().split('T')[0]; // Obtener la fecha actual en formato YYYY-MM-DD
    
    if (lastResetDate !== today) {
        localStorage.removeItem('currentIndex');
        localStorage.removeItem('nextAvailableTime');
        localStorage.setItem('lastResetDate', today);
        currentIndex = 0;
        nextAvailableTime = 0;
        document.getElementById("codeList").innerHTML = '';
    }
}

window.onload = function() {
    clearOldCodes();
    
    const button = document.getElementById("showCodeButton");
    const now = Math.floor(Date.now() / 1000);
    
    if (currentIndex >= codes.length) {
        document.getElementById("codeDisplay").textContent = "No hay más códigos disponibles.";
        button.disabled = true;
    } else {
        if (nextAvailableTime > now) {
            disableButtonTemporarily(nextAvailableTime - now);
        }
    }

    // Mostrar códigos ya vistos
    for (let i = 0; i < currentIndex; i++) {
        const li = document.createElement("li");
        li.textContent = codes[i];
        document.getElementById("codeList").appendChild(li);
    }
};
