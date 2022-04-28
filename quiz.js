const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const pointsBarFull = document.getElementById("pointsBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
    {
        question: "We asked 100 people, name a house you never want to be in. Choose the top answer.",
        choice1: "Haunted House",
        choice2: "Jail",
        choice3: "Small House",
        choice4: "Doghouse",
        answer: 1,
    },
    {
        question:
            "We asked 100 married men, name something in a bakery a baker might call his wife. Choose the top answer.",
        choice1: "Sugar",
        choice2: "Cupcake",
        choice3: "Honey",
        choice4: "Muffin",
        answer: 3,
    },
    {
        question: "We asked 100 women, name an occasion for which you might wear lingerie. Choose the top answer.",
        choice1: "Anniversary",
        choice2: "Party/Night",
        choice3: "Valentine's Day",
        choice4: "Date",
        answer: 4,
    },
    {
        question: "We asked 100 women, what word can be used instead of “woman”. Choose the top answer.",
        choice1: "Girl",
        choice2: "Female",
        choice3: "Lady",
        choice4: "Chick",
        answer: 3,
    },
    {
        question: "We asked 100 men, what is something you’d do to your armpit. Choose the top answer.",
        choice1: "Wash",
        choice2: "Shave/Wax",
        choice3: "Deodorant",
        choice4: "Scratch",
        choice5: "Smell",
        answer: 2,
    },
    {
        question: "We asked 100 people, name something that’s served both hot and cold. Choose the top answer.",
        choice1: "Tea",
        choice2: "Milk",
        choice3: "Coffee",
        answer: 1,
    },
    {
        question: "We asked 100 people, name something people take out. Choose the top answer.",
        choice1: "Trash/Garbage",
        choice2: "Money/Loan",
        choice3: "Dog/Pet",
        choice4: "Food",
        answer: 4,
    },
    {
        question: "We asked 100 men, name something a football fan would wear to the stadium. Choose the top answer.",
        choice1: "Foam Finger",
        choice2: "Paint",
        choice3: "Jersey",
        choice4: "Hat",
        answer: 3,
    },
    {
        question: "We asked 100 kids, name a Marvel Avenger. Choose the top answer.",
        choice1: "Iron Man",
        choice2: "Captain America",
        choice3: "Thor",
        choice4: "Black Panther",
        choice5: "Spider-man",
        choice6: "Dr. Strange",
        answer: 2,
    },
];


var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
setInterval(setTime, 1000);

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}


//CONSTANTS
const pointsPerQuestion = 100;
const questionCount = 9;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= questionCount) {
    localStorage.setItem("mostRecentScore", score);
    localStorage.setItem("mostRecentTimeTaken", totalSeconds);
    //go to the end page
    return window.location.assign("results.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${questionCount}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / questionCount) * 100}%`;
  pointsBarFull.style.width = `${(score / (pointsPerQuestion * questionCount)) * 100}%`;


  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;

};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "right" : "wrong";

    if (classToApply === "right") {
      var ding = new Audio('ding.mp3');
      ding.play();
      incrementScore(pointsPerQuestion);
    } else if (classToApply === "wrong") {
      var buzzer = new Audio('buzzer.wav');
      buzzer.volume=0.5;
      buzzer.play();
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();
