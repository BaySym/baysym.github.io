var content = document.getElementById('content');
var modules = document.getElementById('modules-list');


// populate the content div
function populate() {
    var data = JSON.parse(json)

    for (var i = 0; i < 5; i++) {
        var inner = '';
        var id = data[i].id;
        var tList = data[i].topics;
        var rList = data[i].reading;

        inner += '<h3>lecture notes</h3>\n';
        // if the topic list is empty, show a placeholder message
        if (tList.length == 0) inner += '<h2 class="placeholder">No notes yet.</h2><br>\n';
        // if there are topics available, generate markup and populate the content div
        else for (var j = 0; j < tList.length; j++) inner += topicMarkup(id, j+1, tList[j]);

        inner += '<br>\n<h3>reading list</h3>\n';
        // if the reading list is empty, show a placeholder message
        if (rList.length == 0) inner += '<h2 class="placeholder">No reading yet.</h2><br>\n';
        // if there is reading material available, generate markup and populate the content div
        else for (var j = 0; j < rList.length; j++) inner += readingMarkup(id, j+1, rList[j]);

        // add the content to the HTML
        content.children[i].innerHTML = inner;
    }
}


// generate topic list markup
function topicMarkup (id, itemID, item) {
    return `<a href="pdf/${id}/topic${itemID}.pdf"><h2 class="topic">${item}</h2></a><br>\n`;
}


// generate reading list markup
function readingMarkup (id, itemID, item) {
    return `<a href="pdf/${id}/reading${itemID}.pdf"><h2>${item.title}<span class="author"> (${item.author})</span></h2></a><br>\n`;
}


// show one module and hide all others
function showModule(index) {
    // items in the module list div which are module links
    var  x = [1, 2, 3, 6, 7];

    // hide all modules' content
    for (var i = 0; i < 5; i++) {
        modules.children[x[i]].classList = "";
        content.children[i].style.display = "none";
    }

    // show relevant module's content
    modules.children[x[index]].classList = "selected";
    content.children[index].style.display = "block";

    // store this module in local storage
    localStorage.setItem('lastViewed', index);
}


// show the user's last-viewed module
function restoreLastViewed() {
    var lastViewed = localStorage.getItem('lastViewed');
    showModule(lastViewed ? lastViewed : 0);
}


// run on load
populate();
restoreLastViewed();