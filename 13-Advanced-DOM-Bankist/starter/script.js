'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
const header = document.querySelector('.header');
header.prepend(message);
const button = message.lastElementChild;
console.log(button);
button.addEventListener('click', function () {
  message.remove();
  console.log('kokot');
});

/* const buttons = document.getElementsByTagName('button');
console.log(buttons);
buttons.forEach(button => {
  console.log('button');
  addEventListener('click', () => console.log('Button pressed'));
}); */

const numbers = [1, 2, 3, 4, 5, 6];
const chars = ['a', 'b', 'c'];
let array = reverseLetters(chars);
function reverseLetters(chars) {
  return chars.sort();
}
console.log(array);
