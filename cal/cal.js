const dlWeeks = [3, 8, 14, 15, 16, 30, 31, 33];
const dlTitles = ['FYP1', 'B1, M1', 'VR', 'B2', 'M2', 'FYP2', 'CPD', 'FYP3'];

const holWeeks = [10, 11, 24, 25];
const enhWeeks = [4, 9];
const exaWeeks = [16, 17, 32, 33, 34];

let grid = document.getElementById('grid');

const start = new Date(2020, 9, 12);


// change this manually
let thisWeek = 2;
// change this manually


for (let w = thisWeek; w < 35; w++) {
    
    let thisDate = new Date(start);
    thisDate.setDate(thisDate.getDate() + (w*7));

    let d = String(thisDate.getDate());
    let m = String(thisDate.getMonth() + 1);
    let date = `${d}<span style="opacity: 0.75; padding: 0 1px;">/</span>${m}`;
    grid.innerHTML += `<p class="date">${date}</p>`;
    
    for (let i = 0; i < 5; i++) {
        let divClass = 'day';
        let content = '';

        if (holWeeks.includes(w)) divClass = 'day hol';
        else if (exaWeeks.includes(w)) divClass = 'day exa';
        else if (enhWeeks.includes(w)) {
            divClass = 'day enh';
        }
        if ((i == 3) && (dlWeeks.includes(w))) {
            divClass = 'day dl';
            content = dlTitles.shift();
        }

        let thisCell = new Date(thisDate);
        thisCell.setDate(thisCell.getDate() + i);
        let thisCellDate = `${thisCell.getDate()}/${thisCell.getMonth() + 1}`;

        let today = new Date();
        let todaysDate = `${today.getDate()}/${today.getMonth() + 1}`;

        if (thisCell < today) divClass = 'day past';

        if (thisCellDate == todaysDate) divClass = 'day today';

        grid.innerHTML += `<div class="${divClass}">${content}</div>`;
    }

    thisDate = new Date(start);
    thisDate.setDate(thisDate.getDate() + (w*7) + 5);

    d = String(thisDate.getDate());
    m = String(thisDate.getMonth() + 1);
    date = `${d}<span style="opacity: 0.75; padding: 0 1px;">/</span>${m}`;
    grid.innerHTML += `<p class="date">${date}</p>`;

}



function grey() { document.getElementsByTagName('body')[0].classList.toggle('grey'); }
grey();