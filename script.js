function toggleTheme() {
    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');

    caption = (document.body.classList.contains('dark')) ? '☀️' : '🌑';
    document.getElementById('theme-toggle').innerHTML = caption;
}