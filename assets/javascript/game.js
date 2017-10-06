const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const words = ["dog", "cat", "mouse", "cheese"];
const hangman = "HANGMAN"
let correctWord = '';
let guessedLetters = "";
let remainingCountOfPlayerGuesses = 7;
let incorrectGuesses = 0;
let numberWins = 0;
let numberLosses = 0;
let obfuscatedWord = '';
commitWord();
updateDOM();

function commitWord() {
  // figures out the word to guess
  let randomNumber = Math.floor(Math.random() * words.length);
  correctWord = words[randomNumber];
  console.log(correctWord);
  return correctWord;
}

function obfuscateWord(word) {
  obfuscatedWord = '';
  for (var i = 0; i < word.length; i++) {
    obfuscatedWord += '_';
  }
  return obfuscatedWord;
}

function updateDOM() {
  // updates the DOM as the game progresses
  document.getElementById("guesses-remaining").innerHTML = incorrectGuesses;
  document.getElementById("number-wins").innerHTML = numberWins;
  document.getElementById("number-losses").innerHTML = numberLosses;
  document.getElementById("guessed-letters").innerHTML = guessedLetters;
  document.getElementById("current-word").innerHTML = obfuscatedWord.split("").join(" ");
}

document.onkeypress = function(key) {
  // tracks keys and letters selected by the user
  guessedLetters += key.key;
  processGuess();
  updateDOM();
  // endGame();
  setTimeout(endGame,100)
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
}

function resetGame() {
  // resets the game after a win or loss
  guessedLetters = '';
  obfuscatedWord = '';
  incorrectGuesses = 0;
  commitWord();
  updateDOM();
}

function endGame() {
  if (!obfuscatedWord.includes("_")) {
    alert("You win!  The word is " + obfuscatedWord + ".");
    numberWins++;
    resetGame();
  } else if (obfuscatedWord.includes("_") && incorrectGuesses == 7) {
    alert("You lose!  The word is " + correctWord + ".");
    numberLosses++;
    resetGame();
  } else if (obfuscatedWord.includes("_") && incorrectGuesses != 7) {
    incorrectGuesses++;
  }
}
