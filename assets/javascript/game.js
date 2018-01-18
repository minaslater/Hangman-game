var generateWord = function() {
  var availableWords = ["dragonfruit", "papayas", "pear", "pineapple", "cranberries"];
  var randomIndex = Math.floor(Math.random() * availableWords.length);
  return availableWords[randomIndex];
}

var wordToSolve = generateWord();
console.log(wordToSolve);

var getUserInput = function() {
  var letterGuess = prompt("guess letter");
  return letterGuess;
};

console.log(getUserInput());
