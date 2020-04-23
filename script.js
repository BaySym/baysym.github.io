window.onload = function() {
    var all = document.getElementsByTagName('td');
    for (var i = 0; i < all.length; i++) {
        if (!all[i].classList.contains('label')) {
            var id = all[i].parentElement.parentElement.parentElement.id;
            if (id == 'output') {
                all[i].className = 'allFree';
            } else {
                all[i].onclick = inputClickHandler;
                all[i].classList.add('free');
            }
        }
    }
    
    var out = document.getElementById('output');
    for (var i = 0, row; row = out.rows[i]; i++) {
        for (var j = 0, col; col = row.cells[j]; j++) {
            var tdElm = out.rows[i].cells[j];
            if (!tdElm.classList.contains('label')) {
                tdElm.innerHTML = 0;
            }
        }  
    }
};

function reset () {
    var all = document.getElementsByTagName('td');
    for (var i = 0; i < all.length; i++) {
        if (!all[i].classList.contains('label') &&
            !all[i].classList.contains('key')) {
            var id = all[i].parentElement.parentElement.parentElement.id;
            if (id == 'output') {
                all[i].className = 'allFree';
            } else {
                all[i].className = 'free';
            }
        }
    }
    
    var out = document.getElementById('output');
    for (var i = 0, row; row = out.rows[i]; i++) {
        for (var j = 0, col; col = row.cells[j]; j++) {
            var tdElm = out.rows[i].cells[j];
            if (!tdElm.classList.contains('label')) {
                tdElm.innerHTML = 0;
            }
        }  
    }
}

function addUser() {
    var index = document.getElementsByClassName('user').length + 1;
    $('#tablePanel').append(
        `<div class="tableWrapper" id="user` + index + `">
            <h5 contenteditable="true">User ` + index + `</h5>
            <table cellpadding="0" cellspacing="0" class="timetable user">
                <tr>
                    <td class="label">Mon</td>
                    <td class="label">Tue</td>
                    <td class="label">Wed</td>
                    <td class="label">Thu</td>
                    <td class="label">Fri</td>
                </tr>
                <tr><td></td><td></td><td></td><td></td><td></td></tr>
                <tr><td></td><td></td><td></td><td></td><td></td></tr>
                <tr><td></td><td></td><td></td><td></td><td></td></tr>
                <tr><td></td><td></td><td></td><td></td><td></td></tr>
                <tr><td></td><td></td><td></td><td></td><td></td></tr>
                <tr><td></td><td></td><td></td><td></td><td></td></tr>
                <tr><td></td><td></td><td></td><td></td><td></td></tr>
                <tr><td></td><td></td><td></td><td></td><td></td></tr>
                <tr><td></td><td></td><td></td><td></td><td></td></tr>
            </table>
        </div>`
    );
    var all = document.getElementById('user' + index).getElementsByTagName('td');
    for (var i = 0; i < all.length; i++) {
        if (!all[i].classList.contains('label')) {
            var id = all[i].parentElement.parentElement.parentElement.id;
            if (id == 'output') {
                all[i].className = 'allFree';
            } else {
                all[i].onclick = inputClickHandler;
                all[i].classList.add('free');
            }
        }
    }

    updateOutput();
}

function removeUser() {
    var index = document.getElementsByClassName('user').length;
    if (index > 1) {
        var element = document.getElementById('user' + index);
        element.parentNode.removeChild(element);
    }
    updateOutput();
}

function updateOutput() {
    // update output
    var half = document.getElementsByClassName('user').length / 2;
    var out = document.getElementById('output');
    for (var i = 0, row; row = out.rows[i]; i++) {
        for (var j = 0, col; col = row.cells[j]; j++) {
            var tdElm = out.rows[i].cells[j];
            if (!tdElm.classList.contains('label')) {
                if (tdElm.innerHTML == 0) {
                    tdElm.className = 'allFree';
                } else if (tdElm.innerHTML < half) {
                    tdElm.className = 'mostFree';
                } else {
                    tdElm.className = 'mostBusy';
                }
            }
        }  
    }
}

function inputClickHandler(e){
    e = e||window.event;
    var tdElm = e.target||e.srcElement;
    var id = tdElm.parentElement.parentElement.parentElement.id;
    if (id != 'output') {
        tdElm.classList.toggle('free');
        tdElm.classList.toggle('busy');
        var row = tdElm.parentElement.rowIndex;
        var col = tdElm.cellIndex;
        var out = document.getElementById('output');
        var outCell = out.rows[row].cells[col];
        if (tdElm.classList.contains('free')) {
            outCell.innerHTML--;
        } else {        
            outCell.innerHTML++;
        }

        var half = document.getElementsByClassName('user').length / 2;

        if (outCell.innerHTML == 0) {
            outCell.className = 'allFree';
        } else if (outCell.innerHTML < half) {
            outCell.className = 'mostFree';
        } else {
            outCell.className = 'mostBusy';
        }
    }
}