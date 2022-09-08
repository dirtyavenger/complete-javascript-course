'use strict';

const buttons = document.querySelectorAll('.show-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeButton = document.querySelector('.close-modal');

console.log(buttons);
console.log(buttons.length);

buttons.forEach(function (item, index) {
  item.addEventListener('click', function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  });
});

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
overlay.addEventListener('click', closeModal);
closeButton.addEventListener('click', closeModal);
