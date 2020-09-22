const data = JSON.parse(json);
const mod = document.getElementsByClassName('module');

//mM('big-data');
mM('machine-learning');
mM('parallel-programming');
mM('virtual-reality');
mM('cross-platform');

for (let i = 0; i < 5; i++) {
    let out = "";

    // add lecture notes
    for (let j = 0; j < data[i].lectures.length; j++)
        out += `<a href="${data[i].lectures[j].link}" target="_blank">${data[i].lectures[j].title}</a>`;

    if (data[i].lectures.length == 0) out = "<p>nothing here yet</p>";

    mod[i].children[1].children[0].children[1].innerHTML = out;

    out = "";

    // add reading list
    for (let j = 0; j < data[i].reading.length; j++) {
        out += `<a href="${data[i].reading[j].link}" target="_blank">${data[i].reading[j].title}`;
        out += `<span style="opacity: 0.66"> (${data[i].reading[j].author})</span></a>`;
    }

    if (data[i].reading.length == 0) out = "<p>nothing here yet</p>";

    mod[i].children[1].children[1].children[1].innerHTML = out;
}