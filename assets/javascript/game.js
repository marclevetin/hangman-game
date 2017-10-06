const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const words = ["dog", "cat", "mouse", "cheese"];
let correctWord = '';
let guessedLetters = "";
let remainingCountOfPlayerGuesses = 15;
let numberWins = 0;
let numberLosses = 0;
let obfuscatedWord = 'word'
commitWord()

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
  remainingCountOfPlayerGuesses -= 1;
  processGuess()
  updateDOM()
}

function processGuess() {
  // this can probably be improved to only check the 1 letter that's been pressed.
  obfuscatedWord = '';
  for (i = 0; i < correctWord.length; i++) {
    if (guessedLetters.includes(correctWord[i])) {
        obfuscatedWord += correctWord[i]
    } else {
        obfuscatedWord += "_"
    }
  }
}

function resetGame() {
  // resets the game after a win or loss
  guessedLetters = '';
  obfuscatedWord = '';
  remainingCountOfPlayerGuesses = 15;
  commitWord();
}
