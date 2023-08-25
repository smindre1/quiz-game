//Discovered an issue. When you go from the question page to the highscore page.

//Check if this is needed
var timer = document.querySelector(".timer");

//Page screen variables (HTML id's).
var homePage = document.getElementById("home");
var gameOverPage = document.getElementById("gameOverPage");
var viewHighscorePage = document.getElementById("highscorePage");
var form = document.getElementById("form");
var initials = document.getElementById("initials");
var submitInitials = document.getElementById("submitInitials");
//Button variables (HTML id's).
var btn = document.getElementById("startButton");
var highscoreTab = document.getElementById("viewHighscore");
var homepageButton1 = document.getElementById("homepageButton1");
var homepageButton2 = document.getElementById("homepageButton2");
var playAgain = document.getElementById("playAgainButton");
//Question variables (HTML id's).
var problem = document.getElementById("question");
var firstChoice = document.getElementById("firstChoice");
var secondChoice = document.getElementById("secondChoice");
var thirdChoice = document.getElementById("thirdChoice");
var fourthChoice = document.getElementById("fourthChoice");
var finalScore = document.getElementById("finalScore");
//Global variables, initializing values.
var sequence = 0;
var score = 0;
var scoreboard = [];
var timeDeducted = 0;
// var storedScoreboard = [];
// //add if statement.
// localStorage.setItem("user", JSON.stringify(scoreboard));
//Questions stored in nested array.
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

//Buttons having event listeners added.
btn.addEventListener("click", quizGame);
highscoreTab.addEventListener("click", highscorePage);
homepageButton1.addEventListener("click", homepageScreen);
homepageButton2.addEventListener("click", homepageScreen);
playAgain.addEventListener("click", quizGame);

function quizGame() {
  //These are here so that if a user wants to play again the game will reset.
  score = 0;
  sequence = 0;
  timeDeducted = 0;
  highscoreTab.style.display = "none";
  gameOverPage.style.display = "none";
  homePage.style.display = "flex"; //Test if this line is needed*
  var start = new Date();
  var quiz = document.getElementById("quiz");
  //This sets up the games timer.
  var interval = setInterval(function () {
    function clock() {
      var time = questions.length * 15 - Math.floor((new Date() - start) / 1000) - timeDeducted;
      if (time > 0) {
        timer.innerHTML = "Time: " + time + " seconds";
      }
      //When time runs out, end the game.
      if (time < 0) {
        endGame();
        clearInterval(interval);
      }
    }
    clock();
  }, 1000);

  homePage.style.display = "none";
  quiz.style.display = "flex";
  //Flips through the questions, and ends the game if there are no more questions.
  if (sequence < questions.length) {
    loadQuestion();
  } else {
    endGame();
  }
}

function loadQuestion() {
  if (sequence >= questions.length) {
    endGame();
  } //Is this line needed.*
  //This loads the question as an h2 HTML tag.
  problem.innerHTML = questions[sequence].question;
  //These load the answer choice buttons and makes them clickable (event listeners).
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
  //Correct answer
  if (event.target.textContent == questions[sequence].answer) {
    alert("correct");
    score = score + 100;
  }
  //Incorrect answer
  if (event.target.textContent !== questions[sequence].answer) {
    timeDeducted = timeDeducted + 10;
  }
  sequence++;
  loadQuestion(sequence);
}

function endGame() {
  //Ends quiz screen and switches to game over screen.
  quiz.style.display = "none";
  timer.innerHTML = "";
  gameOverPage.style.display = "flex";
  highscoreTab.style.display = "flex";
  form.style.display = "flex";
  //Displays final score on game over page.
  finalScore.innerHTML = "Score: " + score;
  //Resets values for next game.
  sequence = 0;
  timeDeducted = timeDeducted + 1000;
}

function highscorePage() {
  //Ends current page screen and displays highscore page screen.
  gameOverPage.style.display = "none";
  homePage.style.display = "none";
  viewHighscorePage.style.display = "flex";
  highscoreTab.style.display = "none";

  var highscoreTable = document.getElementById("highscoreTable");
  //Removes any prior list of highscores. Without this, every list generated from the user visiting the highscore page previously will stack.
  while (highscoreTable.lastChild) {
    highscoreTable.removeChild(highscoreTable.lastChild);
  }
  //Grabs the nested array of updated highscore list from local storage and lists it in HTML.
  var storedScoreboard = JSON.parse(localStorage.getItem("user"));
  for (i = 0; i < storedScoreboard.length; i++) {
    var lineOne = highscoreTable.appendChild(document.createElement("li"));
    lineOne.innerHTML = storedScoreboard[i][0] + ": " + storedScoreboard[i][1];
  }
}

function homepageScreen() {
  //Function to bring user to the homepage screen.
  gameOverPage.style.display = "none";
  viewHighscorePage.style.display = "none";
  homePage.style.display = "flex";
  highscoreTab.style.display = "flex";
}

//Takes the <input> initials from the game over screen, displays it, and stores it to a nested array in local storage.
submitInitials.addEventListener("click", function (event) {
  event.preventDefault();
  var nameInitials = initials.value.trim();
  if (nameInitials === "") {
    return;
  }
  var player = [nameInitials, score];
  form.style.display = "none";
  finalScore.innerHTML = nameInitials + ": " + score;
  //Checks if there is already a 'user' item in local storage. If not creates empty object.
  if (localStorage.getItem("user") === null) {
    localStorage.setItem("user", JSON.stringify(scoreboard));
  }
  //If there is already a 'user' item in local storage it is grabbed and updated.
  var storedScoreboard = JSON.parse(localStorage.getItem("user"));
  scoreboard = storedScoreboard;
  scoreboard.push(player);
  localStorage.setItem("user", JSON.stringify(scoreboard));
});
