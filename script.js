var themeBtn = document.getElementById('theme-btn');
var body = document.body;
var light = true;

function theme() {
    light = !light;
    
    if (light) {
        themeBtn.innerHTML = '☼';
        body.classList = 'light';
    }
    else {
        themeBtn.innerHTML = '☾';
        body.classList = 'dark';
    }
}