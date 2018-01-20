function generateWord() {
  var availableWords = ["apple", "kiwi", "pear", "grape", "bananas"];
  var randomIndex = Math.floor(Math.random() * availableWords.length);
  return availableWords[randomIndex].toLowerCase().split("");
}

var gameStats = {
  wordToSolveArr: [],
  alreadyGuessed: [],
  remainingGuesses: 6,
  wins: 0,
  losses: 0,
  displayArr: []
};

var gameElements = {
  word: document.querySelector("#word-to-guess"),
  wins: document.querySelector("#wins"),
  losses: document.querySelector("#losses"),
  remainingGuesses: document.querySelector("#remaining-guesses"),
  alreadyGuessed: document.querySelector("#letters-guessed"),
  gameOver: document.querySelector("#game-over"),
  promptStart: document.querySelector("#prompt-to-start")
}

function resetWordHTML() {
  gameElements.word.innerText = gameStats.displayArr.join(" ");
  gameElements.remainingGuesses.innerText = gameStats.remainingGuesses;
  gameElements.alreadyGuessed.innerText = gameStats.alreadyGuessed;
}

function updateHTMLCorrect() {
  gameElements.word.innerText = gameStats.displayArr.join(" ");
  gameElements.alreadyGuessed.innerText = gameStats.alreadyGuessed.join(", ");
}

function updateHTMLIncorrect() {
  gameElements.remainingGuesses.innerText = gameStats.remainingGuesses;
  gameElements.alreadyGuessed.innerText = gameStats.alreadyGuessed.join(", ");
}

function updateWinLoss() {
  gameElements.wins.innerText = gameStats.wins;
  gameElements.losses.innerText = gameStats.losses;
}

function resetStats() {
  gameStats.wordToSolveArr = generateWord();
  gameStats.alreadyGuessed = [];
  gameStats.remainingGuesses = 6;
  gameStats.displayArr = gameStats.wordToSolveArr.map(function(letter) {
    return "_";
  });
}

function gameSetUp() {
  gameElements.promptStart.style.display = "none";
  resetStats();
  /* console.log(gameStats.displayArr); */
  resetWordHTML();
  window.removeEventListener("keydown", gameSetUp);
  window.addEventListener("keydown", playGame);
}

function compareLetter(event) {
  var letterGuess = event.key;
  if (gameStats.wordToSolveArr.includes(letterGuess) && !gameStats.alreadyGuessed.includes(letterGuess)) {
    var arrOfIndex = [];
    gameStats.wordToSolveArr.forEach(function(letter, index) {
      if(letter === letterGuess) {
        arrOfIndex.push(index);
      }
    });
    arrOfIndex.forEach(function(i) {
      gameStats.displayArr[i] = letterGuess;
    });
    gameStats.alreadyGuessed.push(letterGuess);
    /* console.log("your progress:", gameStats.displayArr.join("")); */
    updateHTMLCorrect();
  } else {
    if (!gameStats.alreadyGuessed.includes(letterGuess)) {
      gameStats.remainingGuesses--;
      gameStats.alreadyGuessed.push(letterGuess);
      /* console.log("incorrect. remaining guesses:",gameStats.remainingGuesses); */
      updateHTMLIncorrect();
    } else {
      console.log("You've already guessed ", letterGuess);
    }  
  }
}

function checkProgress() {
  if (gameStats.displayArr.join("") === gameStats.wordToSolveArr.join("")) {
    gameStats.wins++;
    /* alert("You win!"); */
    gameElements.gameOver.innerText = "You Win!";
    gameElements.gameOver.style.display = "block";
    updateWinLoss();
    window.removeEventListener("keydown", playGame);
    startGame();
  } else if (gameStats.remainingGuesses === 0) {
    gameStats.losses++;
    alert("You lose!");
    updateWinLoss();
    window.removeEventListener("keydown", playGame);
    startGame();
  } else {
    return;
  }
}

function playGame(event) {
  compareLetter(event);
  checkProgress();
}

function startGame() {
  window.addEventListener("keydown", gameSetUp);
  /* alert("Press any key to start game!"); */
}

startGame();
