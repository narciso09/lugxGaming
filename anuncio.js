document.addEventListener("DOMContentLoaded", function() {
    let boton = document.getElementById("play-button");

    if (boton) {
        boton.addEventListener("click", function(event) {
            event.preventDefault(); // Evita la navegación predeterminada
            
            let s = document.createElement('script');
            s.src = 'https://groleegni.net/401/9128734';
            
            try {
                (document.body || document.documentElement).appendChild(s);
            } catch(e) {
                console.error("Error al cargar el script de anuncios:", e);
            }

            // Redirigir después de que el script se ejecute
            setTimeout(() => {
                window.location.href = "https://whoushex.top/4/9128717";
            }, 1000); // Ajusta el tiempo según sea necesario
        });
    }
});
