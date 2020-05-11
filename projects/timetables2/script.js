// Set user input table cells to free, give onclick
window.onload = function() {
    // Get the user input table
    var userTable = document.getElementById('user-timetable');
    // Get user cells into an array
    var allCells = userTable.getElementsByTagName('td');
    // If a cell has no class, give it the 'free' class
    for (var i = 0; i < allCells.length; i++) {
        if (allCells[i].classList.length == 0) {
            allCells[i].classList.add('free');
            allCells[i].onclick = toggleFreeBusy;
        }
    }

    // Get the output table
    var outputTable = document.getElementById('output-timetable');
    // Set each cell's innerHTML to 1, if it has no class
    for (var r = 0; r < outputTable.rows.length; r++) {
        for (var c = 0; c < outputTable.rows[r].cells.length; c++) {
            var thisCell = outputTable.rows[r].cells[c];
            if (thisCell.classList.length == 0) {
                thisCell.innerHTML = 1;
            }
        }
    }
}

// Toggle cell free/busy on click
function toggleFreeBusy() {
    // Toggle this cell's class
    this.classList.toggle('free');
    this.classList.toggle('busy');

    // Adjust the corresponding output cell
    var thisRow = this.parentElement.rowIndex;
    var thisCol = this.cellIndex;
    var outputTable = document.getElementById('output-timetable');
    var outputCell = outputTable.rows[thisRow].cells[thisCol];
    if (this.classList.contains('free'))
        outputCell.innerHTML++;
    else
        outputCell.innerHTML--;
}