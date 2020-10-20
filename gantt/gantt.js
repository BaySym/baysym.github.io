let gantt = document.getElementById('gantt');
let options = document.getElementById('options');
let rows = 6;
let weeks = 16;
let baseCol = [180, 83, 40];
let deltaCol = 30;

gantt.style.gridTemplateRows = `repeat(${rows}, ${100/rows}%)`;

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

// gantt setup
for (let i = -1; i < rows; i++) {

    if (i == -1) {
        inner = `<div class="label">\n`;

        for (let j = 0; j < weeks; j++) {
            var today = new Date();
            let fullDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (j * 7));
            let d = fullDate.getDate();
            let m = fullDate.getMonth();

            inner += `<div class="label week" id="wl${j}"><p>${d} ${months[m]}</p></div>`;
        }
    
        inner += '\n</div>';
    }
    else {
        let stageCol = `hsl(${baseCol[0] + (i * (deltaCol / rows))}, ${baseCol[1]}%, ${baseCol[2]}%)`;
        
        inner = `<div id="r${i}" class="row" style="--stage-col: ${stageCol}; --stage-name: 'Stage'">\n`;

        for (let j = 0; j < weeks; j++) {
            let id = `r${i}-w${j}`;
            inner += `<div id="${id}" class="week"
                        style="z-index: ${weeks - j}" 
                        onclick="leftClick('${id}')"
                        oncontextmenu="rightClick('${id}')">
                        </div>`;
        }

        inner += '\n</div>';
    }

    gantt.innerHTML += inner;
}


function leftClick(id) {
    document.getElementById(id).classList.toggle('assigned');
}

function rightClick(id) {
    let rowId = id.split('-')[0];

    let newName = prompt('Change stage name:');
    if (newName) document.getElementById(rowId).style.setProperty('--stage-name', `'${newName}'`);
}

function updateHue() {
    let rowElems = document.getElementsByClassName('row');
    for (let i = 0; i < rowElems.length; i++) {
        let newCol = `hsl(${parseInt(baseCol[0]) + (i * (deltaCol / rowElems.length))}, ${baseCol[1]}%, ${baseCol[2]}%)`;
        console.log({newCol});
        rowElems[i].style.setProperty('--stage-col', newCol);
    }
}

function addStage() {
    let rowElems = document.getElementsByClassName('row');
    let thisRow = rowElems.length;

    let inner = `<div id="r${thisRow}" class="row" style="--stage-col: #000; --stage-name: 'Stage'">\n`;

    for (let j = 0; j < weeks; j++) {
        let id = `r${thisRow}-w${j}`;
        inner += `<div id="${id}" class="week"
                    style="z-index: ${weeks - j}" 
                    onclick="leftClick('${id}')"
                    oncontextmenu="rightClick('${id}')">
                    </div>`;
    }

    gantt.innerHTML += `${inner}</div>`;

    document.getElementById('remBtn').disabled = false;

    updateHue();
}

function removeStage() {
    let rowId = document.getElementsByClassName('row').length - 1;

    if (rowId > 0) document.getElementById(`r${rowId}`).remove();
    if (rowId == 1) document.getElementById('remBtn').disabled = true;

    updateHue();
}


let cols = document.getElementsByClassName('col');
for (let i = 0; i < cols.length; i++) {
    let c = cols[i].id.split('-');
    let h = c[0];
    let s = c[1];
    let l = c[2];
    cols[i].style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;

    cols[i].addEventListener('mouseup', event => {
        baseCol = c;
        updateHue();
    });
}