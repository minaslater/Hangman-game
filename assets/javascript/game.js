// var word here
//listen for any key
function generateWord() {
  var availableWords = ["dragonfruit", "papayas", "pear", "pineapple", "cranberries"];
  var randomIndex = Math.floor(Math.random() * availableWords.length);
  return availableWords[randomIndex].toLowerCase().split("");
}

var gameOver = true;
var wordToSolveArr;
var alreadyGuessed = [],
    remainingGuesses = 6,
    displayArr;

// set word in fn
function gameSetUp() {
  wordToSolveArr = generateWord();
  // change console.log's to getElement/querySelector + innerSomething
  displayArr = wordToSolveArr.map(function(letter) {
    return "-";
  });
  console.log(displayArr);
  gameOver = false;
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
  if (displayArr.join("") === wordToSolveArr.join("")) {
    alert("You Win!");
    gameOver = true;
  } else if (remainingGuesses === 0) {
    alert("You lose!");
    gameOver = true;
  } else {
    return;
  }
}

function playGame(event) {
  compareLetter(event);
  checkProgress();
}

if (gameOver) {
  window.addEventListener("keydown", gameSetUp);
  alert("Hi");
}
