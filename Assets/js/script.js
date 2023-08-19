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

btn.addEventListener("click", quizGame);

function quizGame() {
  var quiz = document.getElementById("quiz");
  // var interval = setInterval(function () {
  //   timer.innerHTML = "Time: " + Math.floor((new Date() - start) / 1000) + " seconds";
  // }, 1000);

  homePage.style.display = "none";
  quiz.style.display = "flex";

  if (sequence < questions.length) {
    loadQuestion();
  }

  // position = questions[sequence].choices.indexOf(questions[sequence].answer);

  //add a class identifier to position
}

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

// either brute force it by creating a function for each question and cycling through,
//or create an array of arrays of the questions and cycle through that.

function loadQuestion() {
  problem.innerHTML = questions[sequence].question;

  firstChoice.innerHTML = questions[sequence].choices[0];
  firstChoice.addEventListener("click", checkAnswer, alert);
  secondChoice.innerHTML = questions[sequence].choices[1];
  secondChoice.addEventListener("click", checkAnswer, alert);
  thirdChoice.innerHTML = questions[sequence].choices[2];
  thirdChoice.addEventListener("click", checkAnswer, alert);
  fourthChoice.innerHTML = questions[sequence].choices[3];
  fourthChoice.addEventListener("click", checkAnswer);
}

function checkAnswer() {
  alert(event.target.id);
  sequence++;
  loadQuestion(sequence);
  alert(sequence);
}

function usersAnswerChoice(currentQuestion) {
  // currentQuestion.style.display = "flex";

  correct.addEventListener("click", function () {
    currentQuestion.style.display = "none";
    sequence = sequence + 1;
    score = score + 100;
  });

  wrong.addEventListener("click", function () {
    currentQuestion.style.display = "none";
    sequence = sequence + 1;
  });
  return sequence;
  //if time runs out, function stops and display: none currentQuestion
}
