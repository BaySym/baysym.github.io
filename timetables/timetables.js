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
    drop.innerHTML += `<p style="border-color: #${id}aa" id="user-${id}" class="user-name" onclick="dropSelect('${id}')">${name}</p>`;
    dropSelect(id);
}


// remove a user
function remove() {
    if (usedIDs.length > 1) {
        let rem = document.getElementById(`user-${usedIDs[userNames.indexOf(thisUser.innerHTML)]}`);
        rem.parentNode.removeChild(rem);
        
        usedIDs.splice(userNames.indexOf(thisUser.innerHTML), 1);
        userNames.splice(userNames.indexOf(thisUser.innerHTML), 1);

        dropSelect(usedIDs[0]);
    }
}


// select a user from the dropdown menu
function dropSelect(id) {
    thisUser.innerHTML = userNames[usedIDs.indexOf(id)];
    thisUser.style.borderColor = `#${id}aa`;
}


// hide or show the dropdown menu
function mMDrop(selected, dropID) {
    document.getElementById(selected).classList.toggle('open-drop');
    document.getElementById(selected).classList.toggle('closed-drop');

    if (document.getElementById(dropID).style.height == '0px') document.getElementById(dropID).style.height = 'min(110px, 100%)';
    else document.getElementById(dropID).style.height = '0px';
}


// on load
document.getElementById('user-drop-list').style.height = '0px';

for (let i = 0; i < 5; i++) add();

dropSelect(usedIDs[0]);