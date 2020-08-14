var body = document.body;
var themeBtn = document.getElementById('theme-btn');
var social = document.getElementById('social');

// Set the theme to the most recently viewed theme
setTheme(window.localStorage.getItem('theme'));

// Handle the toggle button, toggling the theme based on local storage
function theme() {
    (window.localStorage.getItem('theme') == 'dark') ? setTheme('light') : setTheme('dark');
}

// Set the page's theme to the specified theme
function setTheme(theme) {
    if (theme == 'dark') {
        // Set the theme to dark
        themeBtn.innerHTML = '🌝';
        if (social) social.style.filter = 'invert()';
        body.classList = 'dark';
        // Store the theme
        window.localStorage.setItem('theme', 'dark');
    } else {
        // Set the theme to light (default)
        themeBtn.innerHTML = '🌚';
        if (social) social.style.filter = 'none';
        body.classList = 'light';
        // Store the theme
        window.localStorage.setItem('theme', 'light');
    }
}