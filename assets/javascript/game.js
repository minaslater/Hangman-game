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
function checkGuess() {
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
  } else {
    remainingGuesses--;
  }
  alreadyGuessed.push(letterGuess);
}

checkGuess();

/* console.log(alreadyGuessed); */
/* console.log(remainingGuesses); */
/* console.log(arrOfIndex); */
/* console.log(displayArr); */
