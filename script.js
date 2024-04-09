document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const menuBarContainer = document.getElementById('menu-bar-container');

    menuToggle.addEventListener('click', function() {
        menuBarContainer.classList.toggle('open');
    });
});
