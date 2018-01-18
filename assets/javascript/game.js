var generateWord = function() {
  var availableWords = ["dragonfruit", "papayas", "pear", "pineapple", "cranberries"];
  var randomIndex = Math.floor(Math.random() * availableWords.length);
  return availableWords[randomIndex];
}

var wordToSolve = generateWord();
/* console.log(wordToSolve); */

function getUserInput() {
  return prompt("guess letter"); // event listerner
};

var letterGuess = getUserInput();
console.log(letterGuess);
