let allTables = [];
let outputTable;


// Toggle cell free/busy on click
function toggleFreeBusy() {
    // Toggle this cell's class
    this.classList.toggle('free');
    this.classList.toggle('busy');

    // Adjust the corresponding output cell
    let thisRow = this.parentElement.rowIndex;
    let thisCol = this.cellIndex;
    let outputCell = outputTable.rows[thisRow].cells[thisCol];

    if(this.classList.contains('free')) {
        outputCell.innerHTML++;
    } else {
        outputCell.innerHTML--;
    }
}


class userTable {
    constructor(id) {
        this.table = document.getElementById(id);
        this.cells = this.table.getElementsByTagName('td');
        
        for (let i = 0; i < this.cells.length; i++) {
            let cell = this.cells[i];
            // See if cell is a time slot not a label
            if (cell.classList.length === 0) {
                cell.classList.add('free');
                cell.onclick = toggleFreeBusy;
            }
        }
    }
}


// Set user input table cells to free, give onclick
window.onload = function () {
    // Add the inital table to allTables
    allTables.push(new userTable('user1'));
    document.getElementById('user1').style.display = 'inline';

    outputTable = document.getElementById('output-timetable');

    // Get the output table
    // Set each cell's innerHTML to 1, if it has no class
    for (let r = 0; r < outputTable.rows.length; r++) {
        for (let c = 0; c < outputTable.rows[r].cells.length; c++) {
            let thisCell = outputTable.rows[r].cells[c];
            if (thisCell.classList.length == 0) {
                thisCell.innerHTML = 1;
            }
        }
    }
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
    if (currentUser < userCount - 1) currentUser++;
    showUser();
}
// Show current user
function showUser() {
    var allUsers = document.getElementsByClassName('user');
    // Hide all users
    for (let u = 0; u < allUsers.length; u++) {
        allUsers[u].style.display = 'none';
    }
    // Show current user
    allUsers[currentUser].style.display = 'inline';
}

// Add a new user
function addUser() {
    userCount++;
    let index = allTables.length + 1;
    let wrapper = document.getElementById('user-wrapper');
    // Add user HTML
    wrapper.insertAdjacentHTML('beforeend', `
    <div class="user" id="user` + index + `">
        <div class="table-header">
            <h1>User ` + index + `</h1>
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
    </div>`);

    allTables.push(new userTable(`user${index}`));

    // Increase output cells by 1
    for (let r = 0; r < outputTable.rows.length; r++) {
        for (let c = 0; c < outputTable.rows[r].cells.length; c++) {
            let thisCell = outputTable.rows[r].cells[c];
            if (thisCell.classList.length === 0) {
                thisCell.innerHTML++;
            }
        }
    }
}