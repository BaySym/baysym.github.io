// Global variables
let chosen = false;
let progress = 1;
let data = 0;
let score = 0;


// Onload function
window.onload = function () {
    // Disable the suibmit button
    submitBtn = document.getElementById('submit-btn');
    submitBtn.disabled = true;
    // Hide the next button
    nextBtn = document.getElementById('next-btn');
    nextBtn.style.display = 'none';
    // Get the question number text
    questionNum = document.getElementById('question-num');
    questionTxt = document.getElementById('question-txt');
    // Make all options selectable
    options = document.getElementsByClassName('option');
    for (let i = 0; i < 4; i++) options[i].onclick = select;
    // Get a new question and answers
    getTrivia();
}


// Get the trivia
function getTrivia() {
    fetch('https://opentdb.com/api.php?amount=1&category=9&type=multiple')
    .then(response => { return response.json() })
    .then(jsonData => {
        let data = jsonData.results[0];
        questionTxt.innerHTML = data.question;
        let potentialAnswers = data.incorrect_answers;
        potentialAnswers.push(data.correct_answer);
        potentialAnswers = shuffle(potentialAnswers);
        for (let i = 0; i < 4; i++) options[i].innerHTML = potentialAnswers[i];
        options[potentialAnswers.indexOf(data.correct_answer)].id = 'correct-answer';
    });
}


// Submit the currently selected answer
function submit() {
    // Colour the incorrect options
    for (let i = 0; i < 4; i++)
        if (options[i].classList.contains('selected'))
            options[i].classList.add('incorrect');
    // Colour the correct option
    for (let i = 0; i < 4; i++)
        if (options[i].id == 'correct-answer') {
            options[i].classList.add('correct');
            if (options[i].classList.contains('selected')) score++;
        }
    // Hide the submit button and reveal the next button
    submitBtn.style.display = 'none';
    nextBtn.style.display = 'inline';
    // Disable pointer events on answers
    for (let i = 0; i < 4; i++) options[i].style.pointerEvents = 'none';
    // Update the score
    questionNum.innerHTML = 'Score: ' + score + '/' + progress;
}


// Move on to the next question
function next() {
    progress++;
    // Reset options
    for (let i = 0; i < 4; i++) {
        // Reset options
        options[i].classList = 'option';
        options[i].id = '';
        // Enable pointer events on answers
        options[i].style.pointerEvents = 'auto';
    }
    // Hide the submit button and reveal the next button
    submitBtn.style.display = 'inline';
    nextBtn.style.display = 'none';
    // Get a new question and answers
    getTrivia();
    // Disable the submit button
    submitBtn.disabled = true;
}


// Toggle selected answer
function select() {
    // If the user hasn't already submitted their answer
    if (!(submitBtn.style.display == 'none')) {
        // Deselect all options
        for (let i = 0; i < options.length; i++) options[i].classList = 'option';
        // Select this option
        if (!this.classList.contains('selected')) this.classList.add('selected');
        // Enable the submit button
        submitBtn.disabled = false;
    }
}


// Shuffle an array
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
