'use strict';

const score1display = document.querySelector('#score--0');
const score2display = document.querySelector('#score--1');
const turnScore1Display = document.querySelector('#current--0');
const turnScore2Display = document.querySelector('#current--1');
const rollButton = document.querySelector('.btn--roll');
const endTurnButton = document.querySelector('.btn--hold');
const newGameButton = document.querySelector('.btn--new');
const dicePicture = document.querySelector('.dice');
const sections = document.querySelectorAll('section');

console.log(sections);

let turnScore1 = 0;
let turnScore2 = 0;
let score1;
let score2;
let currentRoll;
let player1acite = true;

function initialzeGame() {
  score1 = 0;
  score2 = 0;
  score1display.textContent = score1;
  score2display.textContent = score2;
  dicePicture.src = '';
  initialzeTurn();
}

function initialzeTurn() {
  turnScore1 = 0;
  turnScore2 = 0;
  turnScore1Display.textContent = turnScore1;
  turnScore2Display.textContent = turnScore2;
}
initialzeGame();

const rollDice = function () {
  currentRoll = Math.trunc(Math.random() * 6) + 1;
  dicePicture.src = `dice-${currentRoll}.png`;
  //player1acite ?
  if (currentRoll === 1) {
    player1acite ? (turnScore1 = 0) : (turnScore2 = 0);
    updateTurnScoreDisplay();
    endTurn();
  } else {
    player1acite
      ? (turnScore1 = turnScore1 + currentRoll)
      : (turnScore2 = turnScore2 + currentRoll);
    updateTurnScoreDisplay();
  }
};

function endTurn() {
  if (player1acite) {
    score1 = score1 + turnScore1;
    score1display.textContent = score1;
  } else {
    score2 = score2 + turnScore2;
    score2display.textContent = score2;
  }

  sections.forEach(function (section, index) {
    section.classList.toggle('player--active');
  });
  initialzeTurn();
  if (score1 >= 100 || score2 >= 100) {
    alert('Niekto vyhral!');
    score1 = 0;
    score2 = 0;
    initialzeGame();
  }
  player1acite = !player1acite;
}

function updateTurnScoreDisplay() {
  if (player1acite) {
    turnScore1Display.textContent = turnScore1;
  } else {
    turnScore2Display.textContent = turnScore2;
  }
}
rollButton.addEventListener('click', rollDice);
endTurnButton.addEventListener('click', endTurn);
newGameButton.addEventListener('click', initialzeGame);
