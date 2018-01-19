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

function compareLetter() {
  var letterGuess = getUserInput();

  if (wordToSolve.includes(letterGuess) && !alreadyGuessed.includes(letterGuess)) {
    var arrOfIndex = [];
    wordArr.forEach(function(letter, index) {
      if(letter === letterGuess) {
        arrOfIndex.push(index);
      }
    })
    arrOfIndex.forEach(function(i) {
      displayArr[i] = letterGuess;
    })
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
