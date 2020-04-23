window.onload = function(){
    var all = document.getElementsByTagName("td");
    for (var i = 0; i < all.length; i++) {
        if (!all[i].classList.contains("label")) {
            all[i].onclick = inputClickHandler;
            all[i].classList.add("free");
        }
    }
};

function inputClickHandler(e){
    e = e||window.event;
    var tdElm = e.target||e.srcElement;
    tdElm.classList.toggle("free");
    tdElm.classList.toggle("busy");
}