const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.getElementById('loginBtn');
const iconClose = document.querySelector('.icon-close');
const audio = document.getElementById('background-music');

function handleLoginState() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const profileSection = document.getElementById('profile');  // Profile section
    const profileIcon = document.getElementById('profile-icon'); // Profile icon in the header

    if (isLoggedIn) {
        if (window.location.pathname.includes('login.html')) {
            window.location.href = 'index.html';
        } else {
            if (btnPopup) {
                btnPopup.textContent = 'Logout';
                btnPopup.removeEventListener('click', redirectToLogin);
                btnPopup.addEventListener('click', handleLogout);
            }
            // Show the profile section and profile icon
            if (profileSection) {
                profileSection.classList.remove('hidden');
            }
            if (profileIcon) {
                profileIcon.classList.remove('hidden');
            }
        }
    } else {
        if (btnPopup) {
            btnPopup.textContent = 'Login';
            btnPopup.removeEventListener('click', handleLogout);
            btnPopup.addEventListener('click', redirectToLogin);
        }
        // Hide the profile section and profile icon
        if (profileSection) {
            profileSection.classList.add('hidden');
        }
        if (profileIcon) {
            profileIcon.classList.add('hidden');
        }
    }
}


function handleLoginSuccess() {
    localStorage.setItem('isLoggedIn', 'true');
    // Tampilkan tab Profile setelah login
    const profileTab = document.getElementById('profile-tab');
    if (profileTab) {
        profileTab.style.display = 'block';
    }
    window.location.href = 'index.html';
}


function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.setItem('currentTab', 'News'); // Set tab 'News' sebagai landing page
    // Tidak perlu mengarahkan ke index.html, biarkan di main.html
    handleLoginState(); // Update tampilan button
}


function openPopup() {
    wrapper.classList.add('active-popup');
}

function closePopup() {
    wrapper.classList.remove('active-popup');
    window.location.href = 'index.html'; // Redirect to main.html
}


function redirectToLogin() {
    window.location.href = 'login.html?openLogin=true';
}

function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(tabId).style.display = 'block';
}

function handleTabNavigation() {
    const currentTab = localStorage.getItem('currentTab') || 'home';

    showTab(currentTab);

    document.querySelectorAll('.navigation a').forEach(tabLink => {
        tabLink.addEventListener('click', function(event) {
            event.preventDefault();
            const targetTab = this.getAttribute('data-tab');
            showTab(targetTab);
            localStorage.setItem('currentTab', targetTab);
        });
    });
}

function initNewsSlider() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.news-slide');
    const totalSlides = slides.length;
    const slideInterval = 3000; // Change slide every 3 seconds
    let autoSlide;

    function showSlide(index) {
        if (index >= totalSlides) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = index;
        }
        const offset = -currentSlide * 100;
        document.querySelector('.slider-container').style.transform = `translateX(${offset}%)`;
    }

    function moveSlide(n) {
        showSlide(currentSlide + n);
    }

    // Initialize first slide
    showSlide(currentSlide);

// Initialize first slide
showSlide(currentSlide);

document.querySelector('.prev').addEventListener('click', () => {
    moveSlide(-1);
    resetAutoSlide();
});

document.querySelector('.next').addEventListener('click', () => {
    moveSlide(1);
    resetAutoSlide();
});

// Start automatic slide change
function startAutoSlide() {
    autoSlide = setInterval(() => {
        moveSlide(1);
    }, slideInterval);
}

// Reset automatic slide on user interaction
function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
}

startAutoSlide(); // Begin auto sliding
}

function handleScrollEffects() {
    let prevScrollPos = window.pageYOffset;
    const header = document.querySelector("header");

    window.onscroll = function() {
        let currentScrollPos = window.pageYOffset;
        header.style.top = prevScrollPos > currentScrollPos ? "0" : "-100px";
        prevScrollPos = currentScrollPos;
    };

    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        const background = document.querySelector('.background-image');
        if (background) {
            background.style.transform = 'translateY(' + scrolled * 0.5 + 'px)';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    handleLoginState();

    if (window.location.pathname.includes('login.html')) {
        const params = new URLSearchParams(window.location.search);
        if (params.get('openLogin') === 'true') {
            openPopup();
            const newURL = window.location.href.split('?')[0];
            window.history.replaceState({}, document.title, newURL);
        }
    }

    if (window.location.pathname.includes('index.html')) {
        handleTabNavigation();
        initNewsSlider();
    }

    if (audio) {
        document.addEventListener('click', () => {
            if (audio.muted) {
                audio.muted = false;
                audio.play();
            }
        });
    }

    if (btnPopup) {
        btnPopup.addEventListener('click', () => {
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            if (isLoggedIn) {
                handleLogout();
            } else {
                redirectToLogin();
            }
        });
    }

    if (registerLink) {
        registerLink.addEventListener('click', () => wrapper.classList.add('active'));
    }

    if (loginLink) {
        loginLink.addEventListener('click', () => wrapper.classList.remove('active'));
    }

    if (iconClose) {
        iconClose.addEventListener('click', closePopup);
    }

    const loginForm = document.querySelector('.form-box.login form');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            handleLoginSuccess();
        });
    }

    handleScrollEffects();
});

window.addEventListener('load', function() {
    setTimeout(function() {
        document.querySelector('footer').classList.remove('hidden');
    }, 3000); 
});
