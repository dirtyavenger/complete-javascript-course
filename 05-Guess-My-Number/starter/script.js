'use strict';

console.log(document.querySelector('.check').textContent);
let numberToBeGuessed = Math.trunc(Math.random() * 20) + 1;
let score = 20;
debugger;
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  if (!guess) {
    document.querySelector('.message').textContent = 'No value!';
  } else if (guess === numberToBeGuessed) {
    document.querySelector('.message').textContent = 'You got it right!';
    document.querySelector('#checkBtn').style.visibility = 'hidden';
    if (
      Number(document.querySelector('.score').textContent) >
      Number(document.querySelector('.highscore').textContent)
    ) {
      document.querySelector('.highscore').textContent =
        document.querySelector('.score').textContent;
    }
  } else {
    score--;
    document.querySelector('.score').textContent = score;
    if (guess > numberToBeGuessed)
      document.querySelector('.message').textContent = 'Too high!';
    else {
      document.querySelector('.message').textContent = 'Too low!';
    }
  }

  if (score === 0) {
    document.querySelector('body').style.backgroundColor = '#666';
    alert(`You lost. The number was ${numberToBeGuessed}. Try again!`);
    reset();
  }
});

document.querySelector('.again').addEventListener('click', function () {
  reset();
});

function reset() {
  score = 20;
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.score').textContent = score;
  document.querySelector('#checkBtn').style.visibility = 'visible';
  document.querySelector('.guess').value = '';
  numberToBeGuessed = Math.trunc(Math.random() * 20) + 1;
}
