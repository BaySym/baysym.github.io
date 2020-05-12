var allCells = [];

// Set user input table cells to free, give onclick
window.onload = function() {
    // Get the user input table
    var userTables = document.getElementsByClassName('user-timetable');
    // Get user cells into an array
    var theseCells = userTables[0].getElementsByTagName('td');
    allCells.push(theseCells);
    // If a cell has no class (it's a time slot), add 'free' and toggle
    for (var c = 0; c < theseCells.length; c++) {
        if (theseCells[c].classList.length == 0) {
            theseCells[c].classList.add('free');
            theseCells[c].onclick = this.toggleFreeBusy;
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

// Navigate between users
var currentUser = 0;
var userCount = 1;
// Previous user
function prevUser() {
    if (currentUser > 0) currentUser--;
    showUser();
}
// Next user
function nextUser() {
    if (currentUser < userCount) currentUser++;
    showUser();
}
// Show current user
function showUser() {
    var allUsers = document.getElementsByClassName('user');
    // Hide all users
    for (user in allUsers) user.style.display = 'none';
    // Show current user
    allUsers[currentUser].style.display = 'inline';
}

// Add a new user
function addUser() {
    var index = document.getElementsByClassName('user').length + 1;
    var wrapper = document.getElementById('user-wrapper');
    // Add user HTML
    wrapper.innerHTML += `
    <div class="user" id="user` + index + `">
        <div class="table-header">
            <button onclick="prevUser()">←</button>
            <h1>User ` + index + `</h1>
            <button onclick="nextUser()">→</button>
        </div>
        <table cellpadding="0" cellspacing="0" class="user-timetable">
            <tr>
                <td class="day"></td>
                <td class="day">MON</td>
                <td class="day">TUE</td>
                <td class="day">WED</td>
                <td class="day">THU</td>
                <td class="day">FRI</td>
            </tr>
                <tr><td class="time-cell-l"> 9:00</td><td></td><td></td><td></td><td></td><td></td><td class="time-cell-r"> 9:00</td></tr>
                <tr><td class="time-cell-l">10:00</td><td></td><td></td><td></td><td></td><td></td><td class="time-cell-r">10:00</td></tr>
                <tr><td class="time-cell-l">11:00</td><td></td><td></td><td></td><td></td><td></td><td class="time-cell-r">11:00</td></tr>
                <tr><td class="time-cell-l">12:00</td><td></td><td></td><td></td><td></td><td></td><td class="time-cell-r">12:00</td></tr>
                <tr><td class="time-cell-l">13:00</td><td></td><td></td><td></td><td></td><td></td><td class="time-cell-r">13:00</td></tr>
                <tr><td class="time-cell-l">14:00</td><td></td><td></td><td></td><td></td><td></td><td class="time-cell-r">14:00</td></tr>
                <tr><td class="time-cell-l">15:00</td><td></td><td></td><td></td><td></td><td></td><td class="time-cell-r">15:00</td></tr>
                <tr><td class="time-cell-l">16:00</td><td></td><td></td><td></td><td></td><td></td><td class="time-cell-r">16:00</td></tr>
                <tr><td class="time-cell-l">17:00</td><td></td><td></td><td></td><td></td><td></td><td class="time-cell-r">17:00</td></tr>
        </table>
    </div>
    `;
    // Set cells to free and toggleable
    var id = 'user' + index;
    // Get the user input table
    var newTable = document.getElementById(id);
    // Get user cells into an array
    var theseCells = newTable.getElementsByTagName('td');
    allCells.push(theseCells);
    // If a cell has no class (it's a time slot), add 'free' and toggle
    for (var c = 0; c < theseCells.length; c++) {
        if (theseCells[c].classList.length == 0) {
            theseCells[c].classList.add('free');
            theseCells[c].onclick = this.toggleFreeBusy;
        }
    }
    // Get the output table
    var outputTable = document.getElementById('output-timetable');
    // Set each cell's innerHTML to 1, if it has no class
    for (var r = 0; r < outputTable.rows.length; r++) {
        for (var c = 0; c < outputTable.rows[r].cells.length; c++) {
            var thisCell = outputTable.rows[r].cells[c];
            if (thisCell.classList.length == 0) {
                thisCell.innerHTML ++;
            }
        }
    }
}