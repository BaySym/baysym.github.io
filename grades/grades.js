const data = JSON.parse(json);
const mod = document.getElementsByClassName('module');

// collate all weights into an array
let absWeights = [];
for (let i = 0; i < data.length; i++)
    for (let j = 0; j < data[i].assessments.length; j++)
        absWeights.push(data[i].weight * data[i].assessments[j].weight);


// populate module cards
for (let i = 0; i < data.length; i++) {

    let modID = data[i].id;
    let thisMod = data[i];

    for (let j = 0; j < thisMod.assessments.length; j++) {
        let a = thisMod.assessments[j];
        mod[i].children[0].children[0].children[0].innerHTML = `0%`;
        mod[i].children[1].innerHTML += `<div id="${modID}-${j+1}"><p class="eyebrow">worth ${a.weight*100}%</p><h2>${a.title}</h2><input placeholder="No grade yet.""></div>`;
    }
}


// toggle module
function toggleModule(id) {
    let module = document.getElementById(id);
    module.classList.toggle('hidden-module');

    if (module.classList.contains('hidden-module'))
        module.children[0].children[1].innerHTML = 'Show module';
    else
        module.children[0].children[1].innerHTML = 'Hide module';
}


// set module card's left border color
function borderCol(percentage) {
    if (Math.round(percentage) >= 70) return '#46bccb';
    else if (Math.round(percentage) >= 60) return '#a3b666';
    else if (Math.round(percentage) >= 50) return '#ffb000';
    else if (Math.round(percentage) >= 40) return '#eb7721';    
    return '#d73e41';
}


// update module's color and overall grade
function updateModule(x) {
    let total = 0;

    for (let i = 0; i < data[x].assessments.length; i++)
        total += data[x].assessments[i].weight * document.getElementById(`${data[x].id}-${i+1}`).children[2].value;

    document.getElementById(data[x].id).children[0].children[0].children[0].innerHTML = `${Math.round(total)}%`;

    document.getElementById(data[x].id).style.borderLeftColor = borderCol(total);
}


// calculate overall grade
function overall() {
    for (let i = 0; i < data.length; i++) updateModule(i);

    let assessmentGrades = []
    for (let i = 0; i < data.length; i++)
        for (let j = 0; j < data[i].assessments.length; j++)
            assessmentGrades.push(document.getElementById(`${data[i].id}-${j+1}`).children[2].value);

    // calculate percentage
    let percentage = 0;
    for (let i = 0; i < absWeights.length; i++)
        percentage += absWeights[i] * assessmentGrades[i];

    document.getElementById('tyt-percent').innerHTML = Math.round(percentage);

    // update grade text
    let grade = "Fail";
    if (Math.round(percentage) >= 70) grade = 'First';
    else if (Math.round(percentage) >= 60) grade = '2:1';
    else if (Math.round(percentage) >= 50) grade = '2:2';
    else if (Math.round(percentage) >= 40) grade = 'Pass';
    document.getElementById('tyt-grade').innerHTML = grade;
}

document.addEventListener('keyup', overall);