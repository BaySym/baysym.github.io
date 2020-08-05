var body = document.body;
var light = true;

function theme() {
    light = !light;
    body.classList = light ? 'light' : 'dark';
}