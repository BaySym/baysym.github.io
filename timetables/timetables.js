let uTt = document.getElementById('u-tt');
let cTt = document.getElementById('c-tt');
let inner = '';
let dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']

for (let i = 0; i < 5; i++) {
    inner = `<div class="day" id="user${0}-day${i}"><div class="day-name">${dayNames[i]}</div>\n`;

    for (let j = 0; j < 18; j++) {
        let id = `user${0}-dayj${i}-time${j}`;
        
        let txt = Math.floor(9 + (j/2));
        if (j % 2 == 0) txt += ':00';
        else txt += ':30';
        
        inner += `<div class="time" id="${id}" onmousedown="userClick('${id}')"><p>${txt}<p></div>\n`;
    }

    inner += '\n</div>';

    uTt.innerHTML += inner;
    cTt.innerHTML += inner
}
encodeUser();


function userClick(id) {
    document.getElementById(id).classList.toggle('busy');
    encodeUser();
}


function encodeUser() {
    let days = document.getElementsByClassName('day');
    let userCode = '';
    
    for (let i = 0; i < 5; i++) {
        let today = days[i];
        let todayC = today.children;
        let out = '';

        for (let j = 0; j < todayC.length; j++) {
            if (todayC[j].classList.contains('busy')) out += '1';
            else out += '0';
        }

        let code = parseInt(out, 2).toString(36);
        userCode += `${code}-`;
    }

    userCode = userCode.slice(0, -1);

    document.getElementById('code-box').value = userCode;
    console.log(userCode.split(' '));
}