const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const words = ["dog", "cat", "mouse", "cheese"];
let correctWord = '';
let guessedLetters = "";
let remainingCountOfPlayerGuesses = 15;
let numberWins = 0;
let numberLosses = 0;
let obfuscatedWord = 'word';
commitWord();

function commitWord() {
  // figures out the word to guess
  let randomNumber = Math.floor(Math.random() * words.length);
  correctWord = words[randomNumber];
  document.getElementById("current-word").innerHTML = obfuscatedWord
  console.log(correctWord);
  return correctWord;
}

function updateDOM() {
  // updates the DOM as the game progresses
  document.getElementById("number-wins").innerHTML = numberWins;
  document.getElementById("number-losses").innerHTML = numberLosses;
  document.getElementById("guesses-remaining").innerHTML = remainingCountOfPlayerGuesses;
  document.getElementById("guessed-letters").innerHTML = guessedLetters;
  document.getElementById("current-word").innerHTML = obfuscatedWord;
}

document.onkeypress = function(key) {
  // tracks keys and letters selected by the user
  guessedLetters += key.key;
  processGuess();
  updateDOM();
}

function processGuess() {
  // this cycles through the whole word in case there are duplicate letters
  // look for ways to refactor and process only the new letter later.
  obfuscatedWord = '';
  for (i = 0; i < correctWord.length; i++) {
    if (guessedLetters.includes(correctWord[i])) {
        obfuscatedWord += correctWord[i];
    } else {
        obfuscatedWord += "_";
    }
  }
  endGame()
}

function resetGame() {
  // resets the game after a win or loss
  guessedLetters = '';
  obfuscatedWord = '';
  remainingCountOfPlayerGuesses = 15;
  commitWord();
}

function endGame() {
  if (!obfuscatedWord.includes("_")) {
    numberWins++;
    resetGame();
  } else if (obfuscatedWord.includes("_") && remainingCountOfPlayerGuesses != 0) {
    remainingCountOfPlayerGuesses--;
  } else if (obfuscatedWord.includes("_") && remainingCountOfPlayerGuesses == 0) {
    numberLosses++;
    resetGame();
  }
}
