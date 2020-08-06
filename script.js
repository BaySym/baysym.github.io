var body = document.body;
var light = true;
var themeBtn = document.getElementById('theme-btn');
var social = document.getElementById('social');

function theme() {
    light = !light;
    if (light) {
        body.classList = 'light';
        themeBtn.innerHTML = '🌚';
        themeBtn.borderColor = '#000';
        social.style.filter = 'none';
    } else {
        body.classList = 'dark';
        themeBtn.innerHTML = '🌝';
        themeBtn.borderColor = '#fff';
        social.style.filter = 'invert()';
    }
}