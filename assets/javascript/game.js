function generateWord() {
  var availableWords = ["apple", "kiwi", "pear", "grape", "bananas"];
  var randomIndex = Math.floor(Math.random() * availableWords.length);
  return availableWords[randomIndex].toLowerCase().split("");
}

var gameStats = {
  wordToSolveArr: [],
  lettersGuessed: [],
  remainingGuesses: 6,
  wins: 0,
  losses: 0,
  displayArr: [],

  createDisplayHTML: function() {
    var displayArrHTML = "";
    this.displayArr.forEach(function(space) {
      if (space === "_") {
        displayArrHTML += "<div class='letter-box'><img class='blank-letter' src='assets/images/cg1.png' alt='circular gallifreyan' /></div>";
      } else {
        displayArrHTML += "<div class='letter-box correct-letter'>" + space.toUpperCase() + "</div>";
      }
    });
    return displayArrHTML;
  }
};

var gameElements = {
  word: document.querySelector("#word-to-guess"),
  wins: document.querySelector("#wins"),
  losses: document.querySelector("#losses"),
  remainingGuesses: document.querySelector("#remaining-guesses"),
  lettersGuessed: document.querySelector("#letters-guessed"),
  gameOver: document.querySelector("#game-over"),
  promptStart: document.querySelector("#prompt-to-start"),
  incorrectEntry: document.querySelector("#incorrect-entry"),

  resetWordHTML: function () {
    this.word.innerHTML = gameStats.createDisplayHTML();
    this.remainingGuesses.innerText = gameStats.remainingGuesses;
    this.lettersGuessed.innerText = gameStats.lettersGuessed;
  },
  updateHTMLCorrect: function() {
    this.word.innerHTML = gameStats.createDisplayHTML();
    this.lettersGuessed.innerText = gameStats.lettersGuessed.join(", ").toUpperCase();
  },
  updateHTMLIncorrect: function() {
    this.remainingGuesses.innerText = gameStats.remainingGuesses;
    this.lettersGuessed.innerText = gameStats.lettersGuessed.join(", ").toUpperCase();
  }
}

// put these fns in gameStats
function updateWinLoss() {
  gameElements.wins.innerText = gameStats.wins;
  gameElements.losses.innerText = gameStats.losses;
}

function resetStats() {
  gameStats.wordToSolveArr = generateWord();
  gameStats.lettersGuessed = [];
  gameStats.remainingGuesses = 6;
  gameStats.displayArr = gameStats.wordToSolveArr.map(function(letter) {
    return "_";
  });
}

function gameSetUp() {
  gameElements.promptStart.style.display = "none";
  gameElements.gameOver.style.display = "none";
  resetStats();
  gameElements.resetWordHTML();
  window.removeEventListener("keydown", gameSetUp);
  window.addEventListener("keydown", playGame);
}
// fns above here

function compareLetter(event) {
  var alphaNumeric = /^[0-9a-zA-Z]+$/;
  var letterGuess = "";
  if (event.key.match(alphaNumeric) && event.key.length === 1) {
    letterGuess = event.key;
  } else {
    // alert player
    gameElements.incorrectEntry.innerText = event.key + " is not a valid entry";
    gameElements.incorrectEntry.style.display = "block"; 
    /* console.log("not a letter/number"); */
    return;
  }
  gameElements.incorrectEntry.style.display = "none"; 
  
  if (gameStats.wordToSolveArr.includes(letterGuess) && !gameStats.lettersGuessed.includes(letterGuess)) {
    var arrOfIndex = [];
    gameStats.wordToSolveArr.forEach(function(letter, index) {
      if(letter === letterGuess) {
        arrOfIndex.push(index);
      }
    });
    arrOfIndex.forEach(function(i) {
      gameStats.displayArr[i] = letterGuess;
    });
    gameStats.lettersGuessed.push(letterGuess);
    gameElements.updateHTMLCorrect();
  } else {
    if (!gameStats.lettersGuessed.includes(letterGuess)) {
      gameStats.remainingGuesses--;
      gameStats.lettersGuessed.push(letterGuess);
      gameElements.updateHTMLIncorrect();
    } else {
      gameElements.incorrectEntry.innerText = letterGuess.toUpperCase() + " has been guessed";
      gameElements.incorrectEntry.style.display = "block"; 
    }  
  }
}

function checkProgress() {
  if (gameStats.displayArr.join("") === gameStats.wordToSolveArr.join("")) {
    gameStats.wins++;
    gameElements.gameOver.innerText = "You Win!";
    gameElements.gameOver.style.display = "block";
    gameElements.promptStart.style.display = "block";
    updateWinLoss();
    window.removeEventListener("keydown", playGame);
    startGame();
  } else if (gameStats.remainingGuesses === 0) {
    gameStats.losses++;
    /* alert("You lose!"); */
    gameElements.gameOver.innerText = "You Lose!";
    gameElements.gameOver.style.display = "block";
    gameElements.promptStart.style.display = "block";
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
