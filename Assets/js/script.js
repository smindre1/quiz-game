var start = new Date();
var timer = document.querySelector(".timer");

var score = 0;
var homePage = document.getElementById("home");
var btn = document.getElementById("startButton");
// var correct = document.getElementById("answer");
// var wrong = document.getElementById("wrong");

var problem = document.getElementById("question");
var firstChoice = document.getElementById("firstChoice");
var secondChoice = document.getElementById("secondChoice");
var thirdChoice = document.getElementById("thirdChoice");
var fourthChoice = document.getElementById("fourthChoice");
var sequence = 0;
var score = 0;

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

function quizGame() {
  // var quiz = document.getElementById("quiz");
  // var interval = setInterval(function () {
  //   timer.innerHTML = "Time: " + (questions.length * 15 - Math.floor((new Date() - start) / 1000) - timeDeducted) + " seconds";
  // }, 1000);

  var quiz = document.getElementById("quiz");
  var interval = setInterval(function () {
    function clock() {
      var time = questions.length * 15 - Math.floor((new Date() - start) / 1000) - timeDeducted;
      if (time > 0) {
        timer.innerHTML = "Time: " + time + " seconds";
      }
      if (time < 0) {
        // alert("TImes Up!");
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
  var gameOverPage = document.getElementById("gameOverPage");
  timer.innerHTML = "";
  gameOverPage.style.display = "flex";
  var finalScore = document.getElementById("finalScore");
  finalScore.innerHTML = "Score: " + score;
}
