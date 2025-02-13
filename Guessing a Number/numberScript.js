// Generate a random number between 1 and 100
let randomNumber = Math.floor(Math.random() * 100) + 1;

// Select elements
let guessField = document.getElementById('guessField');
let guessSubmit = document.getElementById('submit');
let guesses = document.querySelector('.guesses');
let lastResult = document.querySelector('.lastResult');
let lowOrHi = document.querySelector('.lowOrHi');

let guessCount = 1;
let remainingGuesses = 10;
let previousGuesses = [];

// Function to handle guess submission
function checkGuess(event) {
    event.preventDefault();

    let userGuess = Number(guessField.value);
    if (!userGuess || userGuess < 1 || userGuess > 100) {
        lowOrHi.textContent = 'Please enter a number between 1 and 100!';
        return;
    }

    previousGuesses.push(userGuess);
    guesses.textContent = previousGuesses.join(', ');
    remainingGuesses--;

    if (userGuess === randomNumber) {
        lastResult.textContent = 'Congratulations! You guessed it right!';
        lastResult.style.color = 'green';
        lowOrHi.textContent = '';
        gameOver();
    } else if (remainingGuesses === 0) {
        lastResult.textContent = 'Game Over! The correct number was ' + randomNumber;
        lastResult.style.color = 'red';
        gameOver();
    } else {
        lastResult.textContent = remainingGuesses;
        lastResult.style.color = 'yellow';

        if (userGuess < randomNumber) {
            lowOrHi.textContent = 'Too low! Try again.';
        } else {
            lowOrHi.textContent = 'Too high! Try again.';
        }
    }

    guessField.value = '';
    guessField.focus();
}

// Function to end the game
function gameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    lowOrHi.textContent = 'Refresh the page to play again!';
}

// Event listener for guess submission
guessSubmit.addEventListener('click', checkGuess);
