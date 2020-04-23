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
        if (!all[i].classList.contains('label')) {
            var id = all[i].parentElement.parentElement.parentElement.id;
            if (id == 'output') {
                all[i].className = 'allFree';
            } else {
                all[i].onclick = inputClickHandler;
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
        console.log(half);

        if (outCell.innerHTML == 0) {
            outCell.className = 'allFree';
            outCell.innerHTML = 'all free';
        } else if (outCell.innerHTML < half) {
            outCell.className = 'mostFree';
        } else {
            outCell.className = 'mostBusy';
        }
    }
}