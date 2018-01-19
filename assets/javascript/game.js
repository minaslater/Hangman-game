// var word here
//listen for any key
function generateWord() {
  var availableWords = ["dragonfruit", "papayas", "pear", "pineapple", "cranberries"];
  var randomIndex = Math.floor(Math.random() * availableWords.length);
  return availableWords[randomIndex].toLowerCase().split("");
}
// set word in fn
var wordToSolveArr = generateWord();
console.log(wordToSolveArr);
// change console.log's to getElement/querySelector + innerSomething

/* function getUserInput() { */
  /* window.addEventListener("keydown", function(event) { */
  /*   var keyPress; */
  /*   keyPress = event.key; */
  /* }); */
  /* return keyPress; */
/* }; */


var alreadyGuessed = [],
    remainingGuesses = 6,
    displayArr = wordToSolveArr.map(function(letter) {
      return "-";
    });

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

window.addEventListener("keydown", playGame);


function checkProgress() {
  if (displayArr.join("") === wordToSolveArr.join("")) {
    alert("You Win!");
    gameOver = true;
  } else if (remainingGuesses === 0) {
    alert("You lose!");
    gameOver = true;
  } else {
    /* compareLetter(); */ 
    return;
  }
}

function playGame(event) {
  compareLetter(event);
  var gameOver = false;
  checkProgress();
}

/* while (gameOver === false) { */
/*   checkProgress(); */
/* } */
