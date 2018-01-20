function generateWord() {
  var availableWords = ["apple", "kiwi", "pear", "grape", "bananas"];
  var randomIndex = Math.floor(Math.random() * availableWords.length);
  return availableWords[randomIndex].toLowerCase().split("");
}

var gameStats ={
  wordToSolveArr: [],
  alreadyGuessed: [],
  remainingGuesses: 6,
  wins: 0,
  losses: 0,
  displayArr: []
};

function resetStats() {
  gameStats.wordToSolveArr = generateWord();
  gameStats.alreadyGuessed = [];
  gameStats.remainingGuesses = 6;
  gameStats.displayArr = gameStats.wordToSolveArr.map(function(letter) {
    return "_";
  });
}

function gameSetUp() {
  resetStats();
  console.log(gameStats.displayArr);
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
    console.log("your progress:", gameStats.displayArr.join(""));
  } else {
    if (!gameStats.alreadyGuessed.includes(letterGuess)) {
      gameStats.remainingGuesses--;
      gameStats.alreadyGuessed.push(letterGuess);
      console.log("incorrect. remaining guesses:",gameStats.remainingGuesses);
    } else {
      console.log("You've already guessed ", letterGuess);
    }  
  }
}

function checkProgress() {
  if (gameStats.displayArr.join("") === gameStats.wordToSolveArr.join("")) {
    gameStats.wins++;
    alert("You win!\nWins: " + gameStats.wins + "\nLosses: " + gameStats.losses);
    window.removeEventListener("keydown", playGame);
    startGame();
  } else if (gameStats.remainingGuesses === 0) {
    gameStats.losses++;
    alert("You lose!\nWins: " + gameStats.wins + "\nLosses: " + gameStats.losses);
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
  alert("Press any key to start game!");
}

startGame();
