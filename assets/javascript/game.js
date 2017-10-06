const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const words = ["dog", "cat", "mouse", "cheese"];
const hangman = "HANGMAN"
let correctWord = '';
let guessedLetters = "";
let remainingCountOfPlayerGuesses = 8;
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
  document.getElementById("hangman").innerHTML = hangman.slice(0,incorrectGuesses);
}

document.onkeypress = function(key) {
  // tracks keys and letters selected by the user
  let keypress = key.key.toLowerCase();
  guessedLetters += keypress;
  processGuess(keypress);
  updateDOM();
  // endGame();
  setTimeout(endGame,100)
}

function processGuess(letter) {
  // this creates the word to be displayed.
  // it cycles through the whole word in case there are duplicate letters
  // look for ways to refactor and process only the new letter later.
  obfuscatedWord = '';
  for (i = 0; i < correctWord.length; i++) {
    if (guessedLetters.includes(correctWord[i])) {
        obfuscatedWord += correctWord[i];
    } else {
        obfuscatedWord += "_";
    }
  }

  // this increments the Hangman word to show a user how close they are to losing
  if (!correctWord.includes(letter)) {
    incorrectGuesses++;
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
  } else if (obfuscatedWord.includes("_") && incorrectGuesses == 8) {
    alert("You lose!  The word is " + correctWord + ".");
    numberLosses++;
    resetGame();
  } else if (obfuscatedWord.includes("_") && incorrectGuesses != 8) {
    // incorrectGuesses++;
  }
}
