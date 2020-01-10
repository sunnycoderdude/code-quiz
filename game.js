// main game pieces
var timerPlace = document.querySelector(".timer");
var gameStart = document.querySelector(".gameStart");

// q&a pieces
var gameQA = document.querySelector(".gameQA");
var questionPlace = document.querySelector(".question");
var a1Place = document.querySelector(".a1");
var a2Place = document.querySelector(".a2");
var a3Place = document.querySelector(".a3");
var a4Place = document.querySelector(".a4");
var response = document.querySelector(".response");

// end page
var endPage = document.querySelector(".endPage");

// enter initials
var initials = document.querySelector(".initials");
var yourScore = document.querySelector(".yourScore");

// get questions
var questionBank = questions;

// set score
var score = 0;

// tests
console.log(timerPlace);
console.log(questionBank);

// create Q&A
var i = 0;

function renderQs(i) {
questionPlace.textContent = questionBank[i].title;
a1Place.textContent = questionBank[i].choices[0];
a2Place.textContent = questionBank[i].choices[1];
a3Place.textContent = questionBank[i].choices[2];
a4Place.textContent = questionBank[i].choices[3];
}

// hide q&a

function hideQA() {
    questionPlace.remove();
    a1Place.remove();
    a2Place.remove();
    a3Place.remove();
    a4Place.remove();
    response.remove();
}

// play the game
function startGame() {
    console.log(questionBank[1]);
    gameQA.style.display = "block";
    renderQs(0);

    secondsLeft = 60;

    function setTime() {
        var timerInterval = setInterval(function() {
            timerPlace.textContent = `Seconds left: ${secondsLeft}`;
            secondsLeft--;
    
            if(secondsLeft <= 0) {
            clearInterval(timerInterval);
            timerPlace.textContent = "";
            
            hideQA();
            showScore();
            timerPlace.textContent = "";
            }

            if(secondsLeft === 0) {
                clearInterval(timerInterval);
                timerPlace.textContent = "";
                
                hideQA();
                showScore();
                timerPlace.textContent = "";
            }

            if(i === (questionBank.length -1)) {
                clearInterval(timerInterval);
                timerPlace.textContent = "";
                
                hideQA();
                showScore();
                timerPlace.textContent = "";
            }

            if(score === (questionBank.length)) {
                clearInterval(timerInterval);
                timerPlace.textContent = "";
                
                hideQA();
                showScore();
                timerPlace.textContent = "";
            }
    
        }, 1000);
    }
    setTime();    
    gameStart.remove();

}

gameQA.addEventListener("click", function(event) {
    response.textContent = "";
    var answer = event.target.textContent;
    console.log(answer);
    
    if (answer === questionBank[i].answer) {
        score++;
        console.log(score);
        response.textContent = "cooooorect!"
        if (score === questionBank.length) {
            hideQA();
            showScore();
            timerPlace.textContent = "";
        }
        i++;
        renderQs(i);
    } else {
        secondsLeft = secondsLeft - 15;
        response.textContent = "wrong!"
        if (i === (questionBank.length -1)) {
            hideQA();
            showScore();
            timerPlace.textContent = "";
        }
        i++;
        renderQs(i);
    }

});

function showScore() {
    timerPlace.textContent = "";
    initials.style.display = "block";
    yourScore.textContent = `Your score is: ${score}`;

    var yourInitials = document.querySelector(".yourInitials");
    var button = document.querySelector(".btn");
    button.addEventListener("click", function(event) {
        event.preventDefault();
        var initials = yourInitials.innerText;
        console.log(initials);
        var scoreSet = {"initials": "score"};

        scoreSet.initials = initials;
        scoreSet.score = score;

        var highScore = {initials: score};
        // highScore.push(scoreSet);
        // console.log(highScore);

        localStorage.setItem("highScore", JSON.stringify(scoreSet));

    });
};

