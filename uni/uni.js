const data = JSON.parse(json);
const mod = document.getElementsByClassName('module');

// populate module cards
for (let i = 0; i < data.length; i++) {

    let modID = data[i].id;
    
    // populate lecture notes
    let modL = data[i].lectures;
    let modLElement = document.getElementById(`${modID}-lectures`);

    if (modL.length > 0)
        for (let j = 0; j < modL.length; j++)
            modLElement.innerHTML += `<a href="${modL[j].link}" target="_blank">${modL[j].title}</a>`;
        else
            modLElement.innerHTML = '<p>No lecture notes yet.</p>';

    // populate reading list
    let modR = data[i].reading;
    let modRElement = document.getElementById(`${modID}-reading`);

    if (modR.length > 0)
        for (let j = 0; j < modR.length; j++)
            modRElement.innerHTML += `<a href="${modR[j].link}" rel="noreferrer noopener" target="_blank">${modR[j].title}</a>`;
        else
            modRElement.innerHTML = '<p>No reading material yet.</p>';

}