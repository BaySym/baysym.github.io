let gantt = document.getElementById('gantt');
let options = document.getElementById('options');
let rows = 6;
let weeks = 16;

gantt.style.gridTemplateRows = `repeat(${rows}, ${100/rows}%)`;

// custom colours to come
let baseHue = 180;

// gantt setup
for (let i = 0; i < rows; i++) {
    let stageCol = `hsl(${baseHue + (i*(30/rows))}, 83%, 40%)`;
    
    inner = `<div id="r${i}" class="row" style="--stage-col: ${stageCol}; --stage-name: 'Stage'">\n`;

    for (let j = 0; j < weeks; j++) {
        let id = `r${i}-w${j}`;
        inner += `<div id="${id}" class="week"
                    style="z-index: ${weeks - j}" 
                    onclick="leftClick('${id}')"
                    oncontextmenu="rightClick('${id}')">
                        <p>${j+1}</p>
                    </div>`;
    }

    inner += '\n</div>';

    gantt.innerHTML += inner
}


function leftClick(id) {
    document.getElementById(id).classList.toggle('assigned');
}

function rightClick(id) {
    let rowId = id.split('-')[0];

    let newName = prompt('Change stage name:');
    if (newName) document.getElementById(rowId).style.setProperty('--stage-name', `'${newName}'`);

    let newCol = prompt('Change stage color (hex codes only):');
    if (newCol.length == 6) document.getElementById(rowId).style.setProperty('--stage-col', newCol);
}

function updateHue(newHue) {
    let rowElems = document.getElementsByClassName('row');
    for (let i = 0; i < rowElems.length; i++)
        rowElems[i].style.setProperty('--stage-col', `hsl(${newHue + (i*(90/rowElems.length))}, 50%, 50%)`);
}