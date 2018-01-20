function generateWord() {
  var availableWords = ["apple", "kiwi", "pear", "grape", "bananas"];
  var randomIndex = Math.floor(Math.random() * availableWords.length);
  return availableWords[randomIndex].toLowerCase().split("");
}

var wordToSolveArr;
var alreadyGuessed = [],
    remainingGuesses = 6,
    wins = 0,
    displayArr;

// set word in fn
function gameSetUp() {
  wordToSolveArr = generateWord();
  alreadyGuessed = [];
  remainingGuesses = 6;
  // change console.log's to getElement/querySelector + innerSomething
  displayArr = wordToSolveArr.map(function(letter) {
    return "-";
  });
  console.log(displayArr);
  /* gameOver = false; */
  window.removeEventListener("keydown", gameSetUp);
  window.addEventListener("keydown", playGame);
}

function compareLetter(event) {
  var letterGuess = event.key;
  if (wordToSolveArr.includes(letterGuess) && !alreadyGuessed.includes(letterGuess)) {
    var arrOfIndex = [];
    wordToSolveArr.forEach(function(letter, index) {
      if(letter === letterGuess) {
        arrOfIndex.push(index);
      }
    });
    arrOfIndex.forEach(function(i) {
      displayArr[i] = letterGuess;
    });
    alreadyGuessed.push(letterGuess);
    console.log("your progress:", displayArr.join(""));
  } else {
    if (!alreadyGuessed.includes(letterGuess)) {
      remainingGuesses--;
      alreadyGuessed.push(letterGuess);
      console.log("incorrect. remaining guesses:", remainingGuesses);
    } else {
      console.log("You've already guessed ", letterGuess);
    }  
  }
}

function checkProgress() {
  /* var gameOver = false; */
  if (displayArr.join("") === wordToSolveArr.join("")) {
    wins++;
    alert("You Win!\nWins: " + wins);
    window.removeEventListener("keydown", playGame);
    startGame();
    /* gameOver = true; */
  } else if (remainingGuesses === 0) {
    alert("You lose!\nWins:" + wins);
    window.removeEventListener("keydown", playGame);
    startGame();
    /* gameOver = true; */
  } else {
    return;
  }
}

function playGame(event) {
  compareLetter(event);
  checkProgress();
}

/* if (gameOver) { */
function startGame() {
  window.addEventListener("keydown", gameSetUp);
  alert("Press any key to start game!");
}

startGame();
