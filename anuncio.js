document.addEventListener("DOMContentLoaded", function () {
    const botonVerAnuncio = document.getElementById("ver-anuncio");

    if (botonVerAnuncio) {
        botonVerAnuncio.addEventListener("click", async function () {
            // Abre el anuncio en una nueva pestaña
            window.open("https://whoushex.top/4/9128594", "_blank");

            try {
                // Petición al backend para agregar puntos
                let response = await fetch("/api/agregar-puntos", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ puntos: 10 }) // Cantidad de puntos a sumar
                });

                let data = await response.json();

                if (data.success) {
                    alert("¡Has ganado 10 puntos!");
                } else {
                    alert("Hubo un problema al agregar los puntos.");
                }
            } catch (error) {
                console.error("Error al agregar puntos:", error);
                alert("No se pudieron agregar los puntos.");
            }
        });
    }
});
