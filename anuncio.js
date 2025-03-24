document.addEventListener("DOMContentLoaded", function () {
    let boton = document.getElementById("play-button");

    if (boton) {
        boton.addEventListener("click", function (event) {
            event.preventDefault(); // Evita la navegación predeterminada
            
            let s = document.createElement('script');
            s.src = 'https://groleegni.net/401/9128734';

            s.onload = function () {
                console.log("Anuncio cargado correctamente.");
            };

            s.onerror = function () {
                console.error("Error al cargar el script de anuncios.");
            };

            try {
                (document.body || document.documentElement).appendChild(s);
            } catch (e) {
                console.error("Error al adjuntar el script de anuncios:", e);
            }
        });
    }
});
