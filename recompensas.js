document.addEventListener('DOMContentLoaded', function() {
    const pointsLink = document.getElementById('points-link');

    pointsLink.addEventListener('click', function(event) {
        event.preventDefault();
        alert('Aún no tienes los puntos necesarios');
    });
});
