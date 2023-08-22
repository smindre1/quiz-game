//Check if this is needed
var start = new Date();
var timer = document.querySelector(".timer");

var score = 0;
var homePage = document.getElementById("home");
var gameOverPage = document.getElementById("gameOverPage");
var viewHighscorePage = document.getElementById("highscorePage");
var form = document.getElementById("form");
var initials = document.getElementById("initials");
var submitInitials = document.getElementById("submitInitials");

var btn = document.getElementById("startButton");
var highscoreTab = document.getElementById("viewHighscore");
var homepageButton1 = document.getElementById("homepageButton1");
var homepageButton2 = document.getElementById("homepageButton2");
var playAgain = document.getElementById("playAgainButton");
var problem = document.getElementById("question");
var firstChoice = document.getElementById("firstChoice");
var secondChoice = document.getElementById("secondChoice");
var thirdChoice = document.getElementById("thirdChoice");
var fourthChoice = document.getElementById("fourthChoice");
var finalScore = document.getElementById("finalScore");
var sequence = 0;
var score = 0;
var scoreboard = [];

var questions = [
  {
    question: "Question 1",
    choices: ["One", "Two", "Three", "Four"],
    answer: "Three",
  },
  {
    question: "Question 2",
    choices: ["One", "Two", "Three", "Four"],
    answer: "Three",
  },
  {
    question: "Question 3",
    choices: ["One", "Two", "Three", "Four"],
    answer: "Three",
  },
  {
    question: "Question 4",
    choices: ["One", "Two", "Three", "Four"],
    answer: "Three",
  },
  {
    question: "Question 5",
    choices: ["One", "Two", "Three", "Four"],
    answer: "Three",
  },
];
var timeDeducted = 0;

btn.addEventListener("click", quizGame);
highscoreTab.addEventListener("click", highscorePage);
homepageButton1.addEventListener("click", homepageScreen);
homepageButton2.addEventListener("click", homepageScreen);
playAgain.addEventListener("click", quizGame);

function quizGame() {
  // var quiz = document.getElementById("quiz");
  // var interval = setInterval(function () {
  //   timer.innerHTML = "Time: " + (questions.length * 15 - Math.floor((new Date() - start) / 1000) - timeDeducted) + " seconds";
  // }, 1000);

  //These are here so that if a user wants to play again the game will reset
  score = 0;
  sequence = 0;
  timeDeducted = 0;
  gameOverPage.style.display = "none";
  homePage.style.display = "flex";
  //There is and issue with trying to reset the timer, every game repeat 10 seconds is deducted from the counter.
  //I believe it has something to do with the checkAnswers function.
  var quiz = document.getElementById("quiz");
  var interval = setInterval(function () {
    function clock() {
      var time = questions.length * 15 - Math.floor((new Date() - start) / 1000) - timeDeducted;
      if (time > 0) {
        timer.innerHTML = "Time: " + time + " seconds";
      }
      if (time < 0) {
        // alert("Times Up!");
        endGame();
        clearInterval(interval);
      }
    }
    clock();
  }, 1000);

  homePage.style.display = "none";
  quiz.style.display = "flex";
  if (sequence < questions.length) {
    loadQuestion();
  } else {
    endGame();
  }
}

function loadQuestion() {
  if (sequence >= questions.length) {
    endGame();
  }
  problem.innerHTML = questions[sequence].question;

  firstChoice.innerHTML = questions[sequence].choices[0];
  firstChoice.addEventListener("click", checkAnswer);
  secondChoice.innerHTML = questions[sequence].choices[1];
  secondChoice.addEventListener("click", checkAnswer);
  thirdChoice.innerHTML = questions[sequence].choices[2];
  thirdChoice.addEventListener("click", checkAnswer);
  fourthChoice.innerHTML = questions[sequence].choices[3];
  fourthChoice.addEventListener("click", checkAnswer);
}

function checkAnswer(event) {
  if (event.target.textContent == questions[sequence].answer) {
    alert("correct");
    score = score + 100;
  }
  if (event.target.textContent !== questions[sequence].answer) {
    // alert("incorrect");
    timeDeducted = timeDeducted + 10;
  }
  sequence++;
  loadQuestion(sequence);
}
//if time runs out, function stops and display: none currentQuestion

function endGame() {
  quiz.style.display = "none";
  timer.innerHTML = "";
  gameOverPage.style.display = "flex";
  form.style.display = "flex";
  finalScore.innerHTML = "Score: " + score;
  sequence = 0;
  timeDeducted = timeDeducted + 1000;
}

function highscorePage() {
  gameOverPage.style.display = "none";
  homePage.style.display = "none";
  viewHighscorePage.style.display = "flex";
  var highscoreTable = document.getElementById("highscoreTable");
  while (highscoreTable.lastChild) {
    highscoreTable.removeChild(highscoreTable.lastChild);
  }
  var storedScoreboard = JSON.parse(localStorage.getItem("user"));
  // console.log(storedScoreboard);
  for (i = 0; i < storedScoreboard.length; i++) {
    var lineOne = highscoreTable.appendChild(document.createElement("li"));
    lineOne.innerHTML = storedScoreboard[i][0] + ": " + storedScoreboard[i][1];
  }
}

function homepageScreen() {
  gameOverPage.style.display = "none";
  viewHighscorePage.style.display = "none";
  homePage.style.display = "flex";
}

submitInitials.addEventListener("click", function (event) {
  event.preventDefault();
  var nameInitials = initials.value.trim();
  if (nameInitials === "") {
    return;
  }
  var player = [nameInitials, score];
  form.style.display = "none";
  finalScore.innerHTML = nameInitials + ": " + score;

  var storedScoreboard = JSON.parse(localStorage.getItem("user"));
  scoreboard = storedScoreboard;
  scoreboard.push(player);
  localStorage.setItem("user", JSON.stringify(scoreboard));
  // alert(scoreboard[1]);
});

// initials.addEventListener("submit", function () {
//   localStorage.setItem("");
// });

//Make a new function to get the local storage and fill in the scoreboard array
