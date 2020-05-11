var password = document.getElementById('password-input');
password.value = '';

password.addEventListener("keyup", function(event) {
    if (event.keyCode) {
        // Cancel the default action, if needed
        event.preventDefault();
        check();
    }
});

function check() {
    // Get values:
    // zxcvbn() output:
    var out = zxcvbn(password.value);
    // #crack-time
    var crack_time = document.getElementById('crack-time');

    // HTML elements:
    // Time to crack
    crack_time.innerHTML = out.crack_times_display.online_no_throttling_10_per_second + '.';

    switch (out.score) {
        case 0:
            password.style.backgroundColor = '#FFBFB8';
            break;
        case 1:
            password.style.backgroundColor = '#FFD5B8';
            break;
        case 2:
            password.style.backgroundColor = '#FFF4B8';
            break;
        case 3:
            password.style.backgroundColor = '#EAFFB8';
            break;
        default:
            password.style.backgroundColor = '#C0FDC0';
            break;
    }
}

function generate() {
    upp = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    low = 'abcdefghijklmnopqrstuvwxyz';
    num = '1234567890';
    sym = '!"£$%^&*()@?#<>~';

    pos = '';
    pwd = '';

    if (document.getElementById('include-upp').checked)
        pos += upp;
    if (document.getElementById('include-low').checked)
        pos += low;
    if (document.getElementById('include-num').checked)
        pos += num;
    if (document.getElementById('include-sym').checked)
        pos += sym;
    
    var len = document.getElementById('password-length').value;

    for (i = 0; i < len; i++)
        pwd += pos.charAt(Math.floor(Math.random() * pos.length));

    console.log(len, pwd);
    password.value = pwd;
    check();
}