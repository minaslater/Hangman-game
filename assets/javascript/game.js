function generateWord() {
  var availableWords = ["dragonfruit", "papayas", "pear", "pineapple", "cranberries"];
  var randomIndex = Math.floor(Math.random() * availableWords.length);
  return availableWords[randomIndex];
}

var wordToSolve = generateWord();
console.log(wordToSolve);

function getUserInput() {
  return prompt("guess letter"); // event listerner
};

var alreadyGuessed = [],
    remainingGuesses = 6,
    wordArr = wordToSolve.split("");
    displayArr = [];

for (var i = 0; i < wordToSolve.length; i++) {
	displayArr.push("-");
};

/* console.log(displayArr); */
function compareLetter() {
  var letterGuess = getUserInput();

  if (wordToSolve.includes(letterGuess)) {
    var arrOfIndex = [];
    wordArr.forEach(function(letter, index) {
      if(letter === letterGuess) {
        arrOfIndex.push(index);
      }
    })
    arrOfIndex.forEach(function(i) {
      displayArr[i] = letterGuess;
    })
    console.log("your progress:", displayArr.join(""));
  } else {
    remainingGuesses--;
    console.log("remaining guesses:", remainingGuesses);
  }
  alreadyGuessed.push(letterGuess);
}

compareLetter();

var gameOver = false;

function checkProgress() {
  if (displayArr.join("") === wordToSolve) {
    alert("You Win!");
    gameOver = true;
  } else if (remainingGuesses === 0) {
    alert("You lose!");
    gameOver = true;
  } else {
    compareLetter(); 
  }
}

while (gameOver === false) {
  checkProgress();
}
/* console.log(alreadyGuessed); */
/* console.log(remainingGuesses); */
/* console.log(arrOfIndex); */
/* console.log(displayArr); */
