// Global variables
let progress = 0;
let score = 0;
var trivia;


// Onload function
window.onload = async function () {
    // Get elements
    loadingWrapper = document.getElementById('loading');
    questionWrapper = document.getElementById('wrapper');
    finalWrapper = document.getElementById('final');
    submitBtn = document.getElementById('submit-btn');
    nextBtn = document.getElementById('next-btn');
    scoreTxt = document.getElementById('score-txt');
    questionTxt = document.getElementById('question-txt');
    options = document.getElementsByClassName('option');
    progressBar = document.getElementById('progress');
    // Start the first round
    freshStart();
}


// Start a new round
async function freshStart() {
    progress = 0;
    score = 0;
    // Set loading wrapper visibility
    loadingWrapper.style.display = 'block';
    // Set question wrapper visibility
    questionWrapper.style.display = 'none';
    // Set final score wrapper visibility
    finalWrapper.style.display = 'none';
    // Get the trivia
    trivia = await getTrivia();
    // Disable the suibmit button
    submitBtn.disabled = true;
    // Hide the next button
    nextBtn.style.display = 'none';
    // Reset the score
    scoreTxt.innerHTML = 'Score: ' + score;
    // Get the question text
    // Make all options selectable
    for (let i = 0; i < 4; i++) options[i].onclick = select;
    // Load for three seconds
    await sleep();
    loadingWrapper.style.display = 'none';
    questionWrapper.style.display = 'block';
    // Start the first question
    next();
}


async function getTrivia() {
    fetch('https://opentdb.com/api.php?amount=10&category=9&type=multiple')
    .then(res => { return res.json() })
    .then(data => { trivia = data });
}


// Sleep for an amount of milliseconds
function sleep() {
    return new Promise(resolve => setTimeout(resolve, 3000));
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
    scoreTxt.innerHTML = 'Score: ' + score;
}


// Move on to the next question
async function next() {
    // Finish the quiz after 10 questions
    if (progress == 10) {
        questionWrapper.style.display = 'none';
        finalWrapper.style.display = 'block';
        let finalTxt = document.getElementById('final-txt');
        finalTxt.innerHTML = 'Your final score is ' + score + '/10!';
        await sleep();
    } else {
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
        // Get the question data
        let data = trivia.results[progress++];
        // Set the question text
        questionTxt.innerHTML = data.question;
        // Set the answers' texts
        let potentialAnswers = data.incorrect_answers;
        potentialAnswers.push(data.correct_answer);
        potentialAnswers = shuffle(potentialAnswers);
        for (let i = 0; i < 4; i++) options[i].innerHTML = potentialAnswers[i];
        // Identify the correct answer
        options[potentialAnswers.indexOf(data.correct_answer)].id = 'correct-answer';
        // Disable the submit button
        submitBtn.disabled = true;
    }
}
5

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
