var body = document.body;
var themeBtn = document.getElementById('theme-btn');
var social = document.getElementById('social');

setTheme(window.localStorage.getItem('theme'));

function theme() {
    if (window.localStorage.getItem('theme') == 'dark') {
        setTheme('light');
    } else {
        setTheme('dark');
    }
}

function setTheme(theme) {
    if (theme == 'dark') {
        themeBtn.innerHTML = '🌝';
        themeBtn.borderColor = '#fff';
        if (social) social.style.filter = 'invert()';
        window.localStorage.setItem('theme', 'dark');
        body.classList = 'dark';
    } else {
        themeBtn.innerHTML = '🌚';
        themeBtn.borderColor = '#000';
        if (social) social.style.filter = 'none';
        window.localStorage.setItem('theme', 'light');
        body.classList = 'light';
    }
}