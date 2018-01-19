function generateWord() {
  var availableWords = ["dragonfruit", "papayas", "pear", "pineapple", "cranberries"];
  var randomIndex = Math.floor(Math.random() * availableWords.length);
  return availableWords[randomIndex].toLowerCase().split("");
}

var wordToSolveArr = generateWord();
console.log(wordToSolveArr);

function getUserInput() {
  return prompt("guess letter"); // event listerner
};

var alreadyGuessed = [],
    remainingGuesses = 6,
    displayArr = wordToSolveArr.map(function(letter) {
      return "-";
    });

function compareLetter() {
  var letterGuess = getUserInput().toLowerCase();

  if (wordToSolveArr.includes(letterGuess) && !alreadyGuessed.includes(letterGuess)) {
    var arrOfIndex = [];
    wordToSolveArr.forEach(function(letter, index) {
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
  if (displayArr === wordToSolveArr) {
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
