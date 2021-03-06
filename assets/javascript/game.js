function generateWord() {
  var availableWords = ["cybermen", "dalek", "tardis", "gallifrey", "companion", "exterminate", "silence", "allonsy", "geronimo", "whovian", "torchwood", "trenzalore", "sontaran", "silurian", "screwdriver", "master"];
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
  },

  resetStats: function() {
    this.wordToSolveArr = generateWord();
    this.lettersGuessed = [];
    this.remainingGuesses = 6;
    this.displayArr = this.wordToSolveArr.map(function(letter) {
      return "_";
    });
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
  },

  updateWinLoss: function() {
    this.wins.innerText = gameStats.wins;
    this.losses.innerText = gameStats.losses;
  },

  displayAlerts: function() {
    this.gameOver.style.display = "block";
    this.promptStart.style.display = "block"; 
  },

  displayAnswer: function() {
    function createAnswerHTML() {
      var answerHTML = "";
      gameStats.wordToSolveArr.forEach(function(space) {
        answerHTML += "<div class='letter-box correct-letter'>" + space.toUpperCase() + "</div>";
      });
      return answerHTML;
    }
    this.word.innerHTML = createAnswerHTML();
  }
}

function gameSetUp() {
  gameElements.promptStart.style.display = "none";
  gameElements.gameOver.style.display = "none";
  gameStats.resetStats();
  gameElements.resetWordHTML();
  window.removeEventListener("keyup", gameSetUp);
  window.addEventListener("keyup", playGame);
}

function processGuess(guess) {
  if (gameStats.wordToSolveArr.includes(guess) && !gameStats.lettersGuessed.includes(guess)) {
    var arrOfIndex = [];
    gameStats.wordToSolveArr.forEach(function(letter, index) {
      if(letter === guess) {
        arrOfIndex.push(index);
      }
    });
    arrOfIndex.forEach(function(i) {
      gameStats.displayArr[i] = guess;
    });
    gameStats.lettersGuessed.push(guess);
    gameElements.updateHTMLCorrect();
  } else {
    if (!gameStats.lettersGuessed.includes(guess)) {
      gameStats.remainingGuesses--;
      gameStats.lettersGuessed.push(guess);
      gameElements.updateHTMLIncorrect();
    } else {
      gameElements.incorrectEntry.innerText = guess.toUpperCase() + " has been guessed";
      gameElements.incorrectEntry.style.display = "block"; 
    }  
  }
} 
function compareLetter(event) {
  var alphaNumeric = /^[0-9a-zA-Z]+$/;
  var letterGuess = "";
  if (event.key.match(alphaNumeric) && event.key.length === 1) {
    letterGuess = event.key;
  } else {
    gameElements.incorrectEntry.innerText = event.key + " is not a valid entry";
    gameElements.incorrectEntry.style.display = "block"; 
    return;
  }
  gameElements.incorrectEntry.style.display = "none"; 

  processGuess(letterGuess);
}

function checkProgress() {
  if (gameStats.displayArr.join("") === gameStats.wordToSolveArr.join("")) {
    gameStats.wins++;
    gameElements.gameOver.innerText = "You Win!";
    gameElements.displayAlerts();
    gameElements.updateWinLoss();
    window.removeEventListener("keyup", playGame);
    startGame();
  } else if (gameStats.remainingGuesses === 0) {
    gameStats.losses++;
    gameElements.gameOver.innerText = "You Lose!";
    gameElements.displayAlerts();
    gameElements.displayAnswer();
    gameElements.updateWinLoss();
    window.removeEventListener("keyup", playGame);
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
  window.addEventListener("keyup", gameSetUp);
}

startGame();
