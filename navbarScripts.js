function highlightNavbar(path, highlightedElement) {
    if (window.location.pathname.includes(path)) {
        document.getElementById(highlightedElement).style.background = 'rgb(49, 91, 117)';
    }
}
