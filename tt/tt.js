let grid = document.getElementById('grid');


// for each working day
for (let d = 0; d < 5; d++) {

    let dayHTML = '';

    dayHTML += '<div class="day">';

    // for each half hour of the working day
    for (let h = 0; h < 16; h++) {
        dayHTML += `
            <div
                id="${d}-${h}" 
                class="cell" 
                onclick="handleCellToggle('${d}-${h}')">
            </div>
        `;
    }

    dayHTML += '</div>';

    grid.innerHTML += dayHTML;

}


// handle user clicking on cells
function handleCellToggle(id) {
    document.getElementById(id).classList.toggle('busy');
}