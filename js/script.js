var mysteryNumber = Math.ceil(Math.random() * 100);
console.log(mysteryNumber);
var playersGuess = 0;
var guessesRemaining = 10;
var guessesMade = 0;
var gameState = "";
var gameWon = false;

var input = document.querySelector("#input");
var output = document.querySelector("#output");

var button = document.querySelector("button");
button.style.cursor = "pointer";
button.addEventListener("click", clickHandler, false); //false on tärkeä, tulee ongelmia ilman

window.addEventListener("keydown", keydownHandler, false);

function keydownHandler() {
    if(event.keyCode === 13) {
        validateInput();
    }
}

function clickHandler() {
    validateInput();
    //playGame();
}

function validateInput() {
    playersGuess = parseInt(input.value);
    if(isNaN(playersGuess)) {
        output.innerHTML = "Only numbers are allowed!";
    }
    if(playersGuess < 1 || playersGuess > 100) {
        output.innerHTML = "Give a number between 1 - 100!";
    }
    else {
        playGame();
    }
}

function playGame() {
    guessesMade++;
    guessesRemaining--;
    gameState = "This was guess nr. " + guessesMade + ". You have " + guessesRemaining + " guesses left."
    playersGuess = parseInt(input.value); //playersguessiin tallentuu string, mutta parseIntillä menee int
    document.getElementById("arrow").style.left = (playersGuess * 3) + "px";
    console.log(playersGuess);

    if (playersGuess > mysteryNumber) {
        output.innerHTML = "Your number was too high. " + gameState;

        //document.getElementById("arrow").style.left=playersGuess + "px";
        //myElement.style.left = playersGuess;

    if(guessesRemaining < 1) {
        endGame();
        }
    }
    else if (playersGuess < mysteryNumber) {
        output.innerHTML = "Your number was too low. " + gameState;

        //document.getElementById("arrow").style.left=playersGuess + "px";
        //let myElement = document.querySelector("#.arrow");
        //myElement.style.left = playersGuess;

        if(guessesRemaining < 1) {
            endGame();
            document.getElementById("lose").style.visibility = "visible";
        }
    }
    else {
        output.innerHTML = "YEET! Correct!";
        gameWon = true;
        endGame();
        document.getElementById("win").style.visibility = "visible";
    }
}

function endGame() {
    if (gameWon) {
        output.innerHTML = "You guessed correctly! I took you " + guessesMade + " guesses to get it right.";
    }
    else {
        output.innerHTML = "No more guesses left. The secret number was " + mysteryNumber;
    }
    button.removeEventListener("click", clickHandler, false);
    button.removeEventListener("keydown", keydownHandler, false);
    button.disabled = true;
    input.disabled = true;
}