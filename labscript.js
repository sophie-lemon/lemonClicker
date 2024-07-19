//zurück gehen
back.src = 'labimg/goBack.png';


back.addEventListener('click', function() {
    window.location.href = 'index.html'; // Link to the new page
});


document.addEventListener("DOMContentLoaded", function() {
    let potion1 = document.getElementById('potion1');
    potion1.addEventListener("click", function() {
        alert('boo');
    });
});
