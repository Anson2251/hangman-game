const canvas = document.getElementById('hangmanCanvas');
const ctx = canvas.getContext('2d');
const wordDiv = document.getElementById('word');
const lettersDiv = document.getElementById('letters');
const incorrectGuessNum = document.getElementById("incorrectNum");


let guessedLetters = [];
let incorrectGuesses = 0;
let win = false;

function drawBase(ctx) {
    ctx.beginPath();
    ctx.moveTo(50, 350);
    ctx.lineTo(350, 350);
    ctx.stroke();
}

function drawPole(ctx) {
    ctx.beginPath();
    ctx.moveTo(100, 350);
    ctx.lineTo(100, 50);
    ctx.lineTo(250, 50);
    ctx.lineTo(250, 100);
    ctx.stroke();
}

function drawHead(ctx) {
    ctx.beginPath();
    ctx.arc(250, 130, 30, 0, Math.PI * 2);
    ctx.stroke();
}

function drawBody(ctx) {
    ctx.beginPath();
    ctx.moveTo(250, 160);
    ctx.lineTo(250, 250);
    ctx.stroke();
}

function drawLeftArm(ctx) {
    ctx.beginPath();
    ctx.moveTo(250, 180);
    ctx.lineTo(200, 220);
    ctx.stroke();
}

function drawRightArm(ctx) {
    ctx.beginPath();
    ctx.moveTo(250, 180);
    ctx.lineTo(300, 220);
    ctx.stroke();
}

function drawLeftLeg(ctx) {
    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.lineTo(200, 300);
    ctx.stroke();
}

function drawRightLeg(ctx) {
    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.lineTo(300, 300);
    ctx.stroke();
}

const drawComponent = [
    drawBase,
    drawPole,
    drawHead,
    drawBody,
    drawLeftArm,
    drawRightArm,
    drawLeftLeg,
    drawRightLeg
]

function drawHangman() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < Math.min(incorrectGuesses, drawComponent.length); i++){
        drawComponent[i](ctx);
    }
}

function updateWordDisplay(word) {
    let displayWord = '';
    for (let letter of word) {
        if (guessedLetters.includes(letter)) {
            displayWord += letter + ' ';
        } else {
            displayWord += '_ ';
        }
    }
    wordDiv.textContent = displayWord.trim();
}

function updateLettersDisplay(word) {
    lettersDiv.innerHTML = '';
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toLocaleUpperCase();
    for (let letter of alphabet) {
        const letterButton = document.createElement('button');
        letterButton.textContent = letter;
        letterButton.disabled = (guessedLetters.includes(letter) || incorrectGuesses >= drawComponent.length) || win;
        letterButton.addEventListener('click', () => guessLetter(letter, word));
        lettersDiv.appendChild(letterButton);
    }
}

function guessLetter(letter, word) {
    guessedLetters.push(letter);

    if (word.includes(letter)) {
        if (word.split('').every(l => guessedLetters.includes(l))) {
            win = true;
            alert('You won!');
        }
    } else {
        incorrectGuesses++;
        incorrectGuessNum.innerHTML = incorrectGuesses;
        if (incorrectGuesses >= drawComponent.length) {
            alert(`You lost! The word was "${word}".`);
        }
    }

    drawHangman();
    updateWordDisplay(word);
    updateLettersDisplay(word);
}

function startGame(word) {
    guessedLetters = [];
    incorrectGuesses = 0;
    incorrectGuessNum.innerHTML = incorrectGuesses;
    drawHangman();
    updateWordDisplay(word);
    updateLettersDisplay(word);
}

startGame(prompt("A word to guess").toLocaleUpperCase());
