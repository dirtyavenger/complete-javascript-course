'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav__links');
const learnMore = document.querySelector('.btn--scroll-to');
const tabButtonsContainer = document.querySelector(
  '.operations__tab-container'
);

learnMore.addEventListener('click', function (e) {
  document.querySelector('#section--1').scrollIntoView({ behavior: 'smooth' });
});

nav.addEventListener('click', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    e.preventDefault();
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

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

const kokot = oc => {
  return oc;
};

tabButtonsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  this.querySelectorAll('.operations__tab').forEach(el =>
    el.classList.remove('operations__tab--active')
  );

  clicked.classList.add('operations__tab--active');

  const tabs = clicked.closest('.operations').children;

  [...tabs].forEach(el => el.classList.remove('operations__content--active'));

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

const mouseOver = function (e) {
  if (e.target.classList.contains('nav__link')) {
    e.target
      .closest('.nav')
      .querySelectorAll('.nav__link')
      .forEach(el => {
        console.log(el.textContent);
        if (el != e.target) {
          el.style.opacity = this;
        }
      });
    e.target.closest('.nav').querySelector('img').style.opacity = this;
  }
};

nav.addEventListener('mouseover', mouseOver.bind(0.5));

nav.addEventListener('mouseout', mouseOver.bind(1));

window.addEventListener('scroll', function (e) {
  this.window.scrollY >
  parseInt(this.document.querySelector('.header').style.bottom)
    ? nav.closest('.nav').classList.add('sticky')
    : nav.closest('.nav').classList.remove('sticky');
});
