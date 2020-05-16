// Global variables
let output = [];
let thisUser = 0;
let allUserIds = [];
let allUserTables = [];

// On load, initialise the tables
window.onload = function () {
    // Add the initial user table
    show(0);
    allUserIds.push('user0');
    allUserTables = document.getElementsByClassName('user');

    // Give the initial user a random name
    document.getElementById('user0-name').innerHTML = randomName();

    // Get the initial user table's cells
    let table = document.getElementById('user0');
    let cells = table.getElementsByTagName('td');    
    // Set each time slot cell to free and give it its onclick
    for (let i = 0; i < cells.length; i++) {
        let cell = cells[i];
        if (cell.classList.length === 0) {
            cell.classList.add('free');
            cell.innerHTML = '✔';
            cell.onclick = toggle;
        }
    }

    // Get the output table's cells
    output = document.getElementById('output-timetable');
    let outputCells = output.getElementsByTagName('td');  
    // Set each output cell's innerHTML and class if it has no class
    for (let i = 0; i < outputCells.length; i++) {
        let cell = outputCells[i];
        if (cell.classList.length === 0) {
            cell.innerHTML = 1;
            cell.classList = 'allFree';
            }
    }    

    // Enable all buttons, initially
    let prev = document.getElementById('prevUser');
    let next = document.getElementById('nextUser');
    let remv = document.getElementById('removeUser');
    disable(prev);
    disable(next);
    disable(remv);
}


// Toggle a cell between free and busy
function toggle() {
    // Toggle the cell's class
    this.classList.toggle('free');
    this.classList.toggle('busy');

    // Find the corresponding output cell
    let row = this.parentElement.rowIndex;
    let col = this.cellIndex;
    let out = output.rows[row].cells[col];

    // Set this cell's innerHTML and edit its corresponding output cell
    if (this.classList.contains('free')) {
        this.innerHTML = '✔';
        out.innerHTML++;
    } else {
        this.innerHTML = '✘';
        out.innerHTML--;
    }
    setClassOf(out);
}


// Set the class of an output cell
function setClassOf(cell) {
    let value = cell.innerHTML;
    let len = allUserTables.length;

    console.log(len + ' tables');
    if (value <= len/2) { cell.classList = 'mostBusy'; }
    else if (value == len) { cell.classList = 'allFree'; }
    else { cell.classList = 'mostFree'; }
}


// Add a new user
function add() {
    thisUser = allUserTables.length;

    // Give the user a random name
    let name = randomName();

    // Add user table HTML
    document.getElementById('user-wrapper').insertAdjacentHTML('beforeend', `
    <div class="user" id="user` + thisUser + `">
        <div class="table-header">
            <h1 class="placeholder" onclick="noClass()" contenteditable>` + name + `</h1>
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

    // Get the user table's cells
    let table = document.getElementById('user' + thisUser);
    let cells = table.getElementsByTagName('td');    
    // Set each time slot cell to free and give it its onclick
    for (let i = 0; i < cells.length; i++) {
        let cell = cells[i];
        if (cell.classList.length === 0) {
            cell.classList.add('free');
            cell.innerHTML = '✔';
            cell.onclick = toggle;
        }
    }

    // Add the table to the list
    allUserIds.push('user' + thisUser);

    // Show the new table
    show(allUserIds.length - 1);

    // Increase output cells by 1
    for (let row = 0; row < output.rows.length; row++) {
        for (let col = 0; col < output.rows[row].cells.length; col++) {
            let cell = output.rows[row].cells[col];
            if (!isNaN(cell.innerHTML) && cell.innerHTML != '') {
                cell.innerHTML++;
                setClassOf(cell);
            }
        }
    }
}


// Go to the previous user
function prev() { show(--thisUser); }
// Go to the next user
function next() { show(++thisUser); }


// Remove this user
function remove() {
    // Get all needed cells
    let table = allUserTables[thisUser];
    let cells = table.getElementsByTagName('td');
    let outTable = document.getElementById('output-timetable');
    let outCells = outTable.getElementsByTagName('td');
    
    // Remove this user from arrays
    allUserIds.splice(thisUser, 1);
    allUserTables[thisUser].remove();
    
    // Undo this table's output effect
    for (let i = 0; i < cells.length; i++) {
        let cell = cells[i];
        if (cell.innerHTML == '✔') outCells[i].innerHTML--;
        if (cell.innerHTML == '✔' || cell.innerHTML == '✘') setClassOf(outCells[i]);
    }
    
    // Show the previous user
    show(--thisUser);
}


// Show a particular user
function show(id) {
    // Get all users
    allUserTables = document.getElementsByClassName('user');

    // Only display the current user
    for (let u = 0; u < allUserTables.length; u++) allUserTables[u].style.display = 'none';
    allUserTables[id].style.display = 'inline';

    // Enable all buttons, initially
    let prev = document.getElementById('prevUser');
    let next = document.getElementById('nextUser');
    let remv = document.getElementById('removeUser');
    enable(prev);
    enable(next);
    enable(remv);

    // If this is the first user, disable prevUser and removeUser
    if (thisUser === 0) {
        disable(remv);
        disable(prev);
    }
    
    // If this is the last user, disable nextUser
    if (thisUser === (allUserTables.length - 1)) {
        disable(next);
    }
}


// Set a button's attributes
function setBtn(btn, opacity, disabled, pointer) {
    btn.style.opacity = opacity;
    btn.disabled = disabled;
}
// Enable a button
function enable(btn) { setBtn(btn, 1, false, 'pointer'); }
// Disable a button
function disable(btn) { setBtn(btn, 0.2, true, 'default'); }


// Make clicked usernames black
function noClass() { this.style.color = '#000'; }


// Generate a random name for a user
function randomName() {
    let first = ['Jacob', 'Emily', 'Michael', 'Madison', 'Joshua',
                 'Emma', 'Matthew', 'Olivia', 'Daniel', 'Hannah',
                 'Christopher', 'Abigail', 'Andrew', 'Isabella', 'Ethan',
                 'Samantha', 'Joseph', 'Elizabeth', 'William', 'Ashley',
                 'Antony', 'Alex', 'David', 'Sarah', 'Sophie',
                 'Nicholas', 'Ryan', 'Grace', 'Ava', 'James',
                 'Taylor', 'John', 'Lauren', 'Chloe', 'Natalie'];
    let last = 'QWERTYUIOPASDFGHJKLCVBNM';

    let name = '\'';
    name += first[Math.floor(Math.random() * first.length)];
    name += ' ';
    name += last.charAt(Math.floor(Math.random() * 24));
    name += '\'';

    return name;
}