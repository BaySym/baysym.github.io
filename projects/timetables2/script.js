let allTables = [];
let outputTable;
let tableId = 1;


// Toggle cell free/busy on click
function toggleFreeBusy() {
    // Toggle this cell's class
    this.classList.toggle('free');
    this.classList.toggle('busy');

    // Find the corresponding output cell
    let thisRow = this.parentElement.rowIndex;
    let thisCol = this.cellIndex;
    let outputCell = outputTable.rows[thisRow].cells[thisCol];

    // Check this cell's class, tick/cross and change the output cell accordingly
    if(this.classList.contains('free')) {
        this.innerHTML = '✔';
        outputCell.innerHTML++;
        classChange(outputCell);
    } else {
        this.innerHTML = '✘';
        outputCell.innerHTML--;
        classChange(outputCell);
    }
}


// change an output cell's colour depending on its value
function classChange(cell) {
    if (cell.innerHTML <= allTables.length/2) { cell.classList = 'mostBusy'; }
    else if (cell.innerHTML == allTables.length) { cell.classList = 'allFree'; }
    else { cell.classList = 'mostFree'; }
}


// User table class
class userTable {
    constructor(id) {
        this.table = document.getElementById(id);
        this.cells = this.table.getElementsByTagName('td');
        
        // Set each time slot cell to free and give it its onclick
        for (let i = 0; i < this.cells.length; i++) {
            let cell = this.cells[i];
            if (cell.classList.length === 0) {
                cell.classList.add('free');
                cell.innerHTML = '✔';
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
                thisCell.classList = 'allFree';
            }
        }
    }
}


// Navigate between users
var currentUser = 0;


// Previous user
function prevUser() {
    if (currentUser > 0) {
        currentUser--;
        showUser();
        document.getElementById('nextUser').style.opacity = 1;
        if (currentUser === 0) {
            document.getElementById('prevUser').style.opacity = 0.2;
            document.getElementById('removeUser').style.opacity = 0.2;
        } else {
            document.getElementById('prevUser').style.opacity = 1;
            document.getElementById('removeUser').style.opacity = 1;
        }
    }
}


// Next user
function nextUser() {
    if (currentUser < allTables.length - 1) {
        currentUser++;
        showUser();
        document.getElementById('removeUser').style.opacity = 1;
        document.getElementById('prevUser').style.opacity = 1;
        if (currentUser === allTables.length - 1) {
            document.getElementById('nextUser').style.opacity = 0.2;
        } else {
            document.getElementById('nextUser').style.opacity = 1;
        }
    }
}


// Show current user
function showUser() {
    var allUsers = document.getElementsByClassName('user');
    // Hide all users
    for (let u = 0; u < allUsers.length; u++) allUsers[u].style.display = 'none';
    // Show current user
    allUsers[currentUser].style.display = 'inline';
}


// Add a new user
function addUser() {
    tableId++;
    let wrapper = document.getElementById('user-wrapper');

    // Add user table HTML
    wrapper.insertAdjacentHTML('beforeend', `
    <div class="user" id="user` + tableId + `">
        <div class="table-header">
            <h1 contenteditable>User ` + tableId + `</h1>
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
        <p id="caption">
            Click a cell to toggle between free and busy.
            <br>
            Edit the user's name by clicking it and typing.
        </p>
    </div>`);

    // Add the table to the list
    allTables.push(new userTable(`user${tableId}`));

    // Show the next table
    updateCount();
    currentUser = allTables.length - 1;
    showUser()

    // Update button opacities
    document.getElementById('nextUser').style.opacity = 0.2;
    document.getElementById('prevUser').style.opacity = 1;
    document.getElementById('removeUser').style.opacity = 1;

    // Increase output cells by 1
    for (let r = 0; r < outputTable.rows.length; r++) {
        for (let c = 0; c < outputTable.rows[r].cells.length; c++) {
            let thisCell = outputTable.rows[r].cells[c];
            let inner = thisCell.innerHTML;
            if (!isNaN(inner) && inner != '') {
                thisCell.innerHTML++;
                classChange(thisCell);
            }
        }
    }

    console.log('added user' + tableId);
    console.log(allTables);
}


// Remove the current user
function removeUser() {
    console.log('removed user' + (currentUser + 1));
    console.log(allTables);
    // Can't delete the first table - TO CHANGE TO can't delete all tables
    if (currentUser > 0) {
        // Adjust global variables
        currentUser--;
        updateCount();

        // Set this user's cells to free, thus making its cells' effects on output all +1
        this.table = document.getElementById('user' + (currentUser + 1));
        this.cells = this.table.getElementsByTagName('td');

        let outTable = document.getElementById('output-timetable');
        let outCells = outTable.getElementsByTagName('td');

        // Delete this table from the list of tables
        allTables.splice(currentUser + 1, 1)
        document.getElementById('user' + (currentUser + 2)).remove();
        
        // For each cell
        for (let i = 0; i < this.cells.length; i++) {
            let cell = this.cells[i];
            // If it's free, negate its output effect
            if (cell.innerHTML == '✔') {
                outCells[i].innerHTML--;
                classChange(outCells[i]);
            }
        }

        // Show the previous table
        showUser()
    }
}


// Update count text
function updateCount() {
    console.log('updateCount()');
    /*let text = allTables.length + ' user';
    if (allTables.length > 1) text += 's';
    document.getElementById('user-count').innerHTML = text;*/
}