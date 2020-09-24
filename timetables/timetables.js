let drop = document.getElementById('user-drop-list');
let thisUser = document.getElementById('this-user-name');

// user IDS
let usedIDs = [];
let userNames = [];

// random default names
let names = ['John', 'Paul', 'George', 'Ringo', 'Brian', 'Yoko', 'Linda'];
let initials = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';


// generate user ID
function generateID () {
    let id = Math.floor(Math.random() * 16777215).toString(16);

    // make all ids 6 chars long
    for (let i = id.length; i < 6; i++) id = `0${id}`;

    return validateID(id);
}


// validate a given user ID
function validateID (id) {
    if (id in usedIDs) {
        id = generateID();
    }
    else {
        usedIDs.push(id);
        userNames.push(`User ${id}`);
    }
    return id;
}


// rename user
function rename() {
    let newName = prompt('Enter a new name:');

    if (newName != "") {
        document.getElementById(`user-${usedIDs[userNames.indexOf(thisUser.innerHTML)]}`).innerHTML = newName;
        userNames[userNames.indexOf(thisUser.innerHTML)] = newName;
        thisUser.innerHTML = newName;
    }
    else alert('Names can\'t be empty!');
}


// add a user
function add() {
    let id = generateID();
    let name = userNames[usedIDs.indexOf(id)];
    drop.innerHTML += `<p style="border-color: #${id}" id="user-${id}" class="user-name" onclick="dropSelect('${id}')">${name}</p>`;

    document.getElementById('user-timetables').innerHTML += `
        <div id="table-${id}" class="timetable-wrapper hidden">
            <div class="weekday">
                <h1>Monday</h1>
                <div class="timeslots">
                </div>
            </div>

            <div class="weekday">
                <h1>Tuesday</h1>
                <div class="timeslots"></div>
            </div>

            <div class="weekday">
                <h1>Wednesday</h1>
                <div class="timeslots"></div>
            </div>

            <div class="weekday">
                <h1>Thursday</h1>
                <div class="timeslots"></div>
            </div>

            <div class="weekday">
                <h1>Friday</h1>
                <div class="timeslots"></div>
            </div>
        </div>
    `;

    populateTimeslots(`table-${id}`);

    dropSelect(id);
}


// remove a user
function remove() {
    if (usedIDs.length > 1) {
        let rem = document.getElementById(`user-${usedIDs[userNames.indexOf(thisUser.innerHTML)]}`);
        rem.parentNode.removeChild(rem);

        rem = document.getElementById(`table-${usedIDs[userNames.indexOf(thisUser.innerHTML)]}`);
        rem.parentNode.removeChild(rem);
        
        usedIDs.splice(userNames.indexOf(thisUser.innerHTML), 1);
        userNames.splice(userNames.indexOf(thisUser.innerHTML), 1);

        dropSelect(usedIDs[0]);
    }
}


// select a user from the dropdown menu
function dropSelect(id) {
    thisUser.innerHTML = userNames[usedIDs.indexOf(id)];
    thisUser.style.borderColor = `#${id}`;

    for (let i = 0; i < usedIDs.length; i++) {
        document.getElementById(`table-${usedIDs[i]}`).classList = 'timetable-wrapper hidden';
    }

    document.getElementById(`table-${id}`).classList.toggle('hidden');

    closeDrop('this-user-drop-arrow', 'user-drop-list');
}


// hide or show the dropdown menu
function mMDrop(selected, dropID) {
    document.getElementById(selected).classList.toggle('open-drop');
    document.getElementById(selected).classList.toggle('closed-drop');

    let drop = document.getElementById(dropID);

    drop.style.borderTop = 'none';
    drop.style.marginTop = '-1px';

    if (drop.style.height == '0px') {
        drop.style.height = '110px';
        drop.style.visibility = 'visible';
    }
    else {
        drop.style.height = '0px';
        drop.style.visibility = 'hidden';
    }
}


// open dropdown
function openDrop(selected, dropID) {
    document.getElementById(selected).classList.toggle('open-drop');
    document.getElementById(selected).classList.toggle('closed-drop');

    let drop = document.getElementById(dropID);

    drop.style.borderTop = 'none';
    drop.style.marginTop = '-1px';

    drop.style.height = '110px';
    drop.style.visibility = 'visible';
}


// close dropdown
function closeDrop(selected, dropID) {
    document.getElementById(selected).classList.toggle('open-drop');
    document.getElementById(selected).classList.toggle('closed-drop');

    let drop = document.getElementById(dropID);

    drop.style.borderTop = 'none';
    drop.style.marginTop = '-1px';

    drop.style.height = '0px';
    drop.style.visibility = 'hidden';
}


// populate timeslots
function populateTimeslots(id) {
    let thisWrapper = document.getElementById(id);

    for (let i = 0; i < 5; i++) {
        let hour = 7;

        for (let j = 0; j < 20; j++) {
            let inner = "";

            if (j % 2 == 0) {
                hour++;
                inner = `${hour}:00 - ${hour}:30`;
            }
            else inner = `${hour}:30 - ${hour + 1}:00`;

            let timeslotID = `${id}-${i}-${j}`;

            thisWrapper.children[i].children[1].innerHTML += `<div id=${timeslotID} class="userFree" onclick="toggleFree('${timeslotID}')">${inner}</div>`;
        }
    }
}


// toggle between free and busy
function toggleFree(id) {
    document.getElementById(id).classList.toggle('userFree');
    document.getElementById(id).classList.toggle('userBusy');
}


// generate comparison
function generateComparison() {
    let comparison = document.getElementById('comparison');
    
    comparison.innerHTML = `
        <div class="timetable-wrapper">
            <div class="weekday">
                <h1>Monday</h1>
                <div class="bordered timeslots">
                </div>
            </div>

            <div class="weekday">
                <h1>Tuesday</h1>
                <div class="bordered timeslots"></div>
            </div>

            <div class="weekday">
                <h1>Wednesday</h1>
                <div class="bordered timeslots"></div>
            </div>

            <div class="weekday">
                <h1>Thursday</h1>
                <div class="bordered timeslots"></div>
            </div>

            <div class="weekday">
                <h1>Friday</h1>
                <div class="bordered timeslots"></div>
            </div>
        </div>
    `;
    
    for (let i = 0; i < 5; i++) {
        let hour = 7;

        for (let j = 0; j < 20; j++) {
            let inner = "";

            if (j % 2 == 0) {
                hour++;
                inner = `${hour}:00 - ${hour}:30`;
            }
            else inner = `${hour}:30 - ${hour + 1}:00`;

            let color = '#fff';
            let count = 0;

            for (let k = 0; k < usedIDs.length; k++) 
                if (document.getElementById(`table-${usedIDs[k]}-${i}-${j}`).classList == 'userFree')
                    count++;

            let thisClass = 'compSomeBusy';
            if (count <= Math.floor(usedIDs.length / 2)) thisClass = 'compMostBusy';
            if (count == usedIDs.length) thisClass = 'compFree';
            
            comparison.children[0].children[i].children[1].innerHTML += `<div class="${thisClass}">${inner}</div>`;
        }
    }
}


// toggle comparison
function toggleComparison() {
    document.getElementById('show-comp-btn').classList.toggle('hidden');
    document.getElementById('hide-comp-btn').classList.toggle('hidden');

    document.getElementById('user-timetables').classList.toggle('hidden');
    document.getElementById('comparison').classList.toggle('hidden');
}


// show comparison
function showComparison() {
    document.getElementById('buttons').style.opacity = 0.33;
    document.getElementById('buttons').style.pointerEvents = 'none';

    toggleComparison();

    generateComparison();
}


// show users
function hideComparison() {
    document.getElementById('buttons').style.opacity = 1;
    document.getElementById('buttons').style.pointerEvents = 'auto';
    
    toggleComparison();
}


// on load
document.getElementById('user-drop-list').style.height = '0px';

for (let i = 0; i < 3; i++) add();

dropSelect(usedIDs[0]);