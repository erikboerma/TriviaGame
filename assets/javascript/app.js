var counter = 30;
var currentQuestion = 0;
var score = 0;
var lost = 0;
var timer;


function nextQuestion() {
    var isQuestionOver = (quizQuestions.length - 1) === currentQuestion;
    if (isQuestionOver) {
        displayResults();
    } else {
        currentQuestion++;
        loadQuestion();
    }
}

function timeUp() {
    clearInterval(timer);
    lost++;
    nextQuestion();
}

function countDown() {
    counter--;

    $('#timer').html(counter);

    if (counter === 0) {
        timeUp();
    }
}


function loadQuestion() {
    counter = 30;
    timer = setInterval(countDown, 1000);
    
    const question = quizQuestions[currentQuestion].question;
    const choices = quizQuestions[currentQuestion].answers;
    
    $('#timer').html(counter);
    $('#game').html(`
        <h4>${question}</h4>
        ${loadChoices(choices)}
        `);

}

function loadChoices(choices) {
    let result = '';

    for (i = 0; i < choices.length; i++) { 
        result += `<p class='choice' data-answer='${choices[i]}'>${choices[i]}</p>`;
    }

    return result;
}

$(document).on('click','.choice', function(){
    clearInterval(timer);
    var selectedAnswer = $(this).attr('data-answer');
    var correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if (correctAnswer === selectedAnswer) {
        score++;
        nextQuestion();
    }
    else {
        lost++;
        nextQuestion();
    }

});

function displayResults() {
    var result = `
    <p>Correct answers: ${score}</p>
    <p>Incorrect answers: ${lost}</p>
    <p>Total questions: ${quizQuestions.length}</p>
    <button class="btn btn-primary" id="reset">Reset Game</button>
    `;
    $('#timer').remove();

    $('#game').html(result);

}

$(document).on('click', '#reset', function() {
    counter = 30;
    currentQuestion = 0;
    score = 0;
    lost = 0;
    timer = null;

    loadQuestion();
});


$('#startButton').click(function() {
    $('#startButton').remove();
    $('#timer').html(counter);
    loadQuestion();
    
});