var items = document.getElementsByClassName('fade-in');

loadItems();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function loadItems() {
    for (var i  = 0; i < items.length; i++) {
        items[i].style.opacity = 1;
        await sleep(50);
    }
}