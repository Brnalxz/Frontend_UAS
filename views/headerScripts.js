function headerTitleController(title) {
    const headerTitle = document.createElement('div');
    headerTitle.classList.add('header-title');
    headerTitle.innerHTML = `<h2>${title}</h2>`;
    document.querySelector('.header').appendChild(headerTitle);
}

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navbar = document.getElementById('nav-bar');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navbar.classList.toggle('active');
    });

    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target) && !hamburger.contains(e.target)) {
            navbar.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});
