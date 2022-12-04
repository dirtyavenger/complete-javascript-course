'use strict';

////////////////////////////////////
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
const section1 = document.querySelector('#section--1');
const header = document.querySelector('.header');
const slides = document.querySelectorAll('.slide');
const sliderBtnRight = document.querySelector('.slider__btn--right');
const sliderBtnLeft = document.querySelector('.slider__btn--left');
learnMore.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});
const dotContainer = document.querySelector('.dots');
const featureImages = document.querySelectorAll('img[data-src]');

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

/* const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
header.prepend(message);
const button = message.lastElementChild;
console.log(button);
button.addEventListener('click', function () {
  message.remove();
  console.log('kokot');
}); */

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

/* window.addEventListener('scroll', function (e) {
  console.log(document.querySelector('.header').offsetHeight);
  window.scrollY > document.querySelector('.header').offsetHeight
    ? nav.closest('.nav').classList.add('sticky')
    : nav.closest('.nav').classList.remove('sticky');
}); */
console.log(nav.getBoundingClientRect().height);
const observer = new IntersectionObserver(
  function (enries, observer) {
    enries.forEach(entry => {
      entry.isIntersecting
        ? nav.closest('.nav').classList.remove('sticky')
        : nav.closest('.nav').classList.add('sticky');
    });
  },
  {
    root: null,
    threshold: 0,
    rootMargin: `-${nav.getBoundingClientRect().height}px`,
  }
);
observer.observe(header);

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

document.querySelectorAll('.section').forEach(function (section) {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

// lazy loading pictures

const loadPicutre = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', el =>
    el.target.classList.remove('lazy-img')
  );
  observer.unobserve(entry.target);
};

const pictureObserver = new IntersectionObserver(loadPicutre, {
  root: null,
  threshold: 0,
  rootMargin: ' 200px',
});

featureImages.forEach(function (image) {
  console.log(image);
  pictureObserver.observe(image);
});
let curSlide = 0;
const maxSlide = slides.length - 1;
const createDots = function () {
  slides.forEach((_, i) =>
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot dots__dot--active" data-slide="${i}"></button>`
    )
  );
};

const activateDot = function () {
  [...dotContainer.children].forEach(function (dot) {
    console.log(dot);
    dot.classList.remove('dots__dot--active');
  });
  dotContainer
    .querySelector(`.dots__dot[data-slide="${curSlide}"]`)
    .classList.add('dots__dot--active');
};

const slideMover = function () {
  if (this == 'right') curSlide++;
  else if (this == 'left') curSlide--;
  if (curSlide > maxSlide) curSlide = 0;
  else if (curSlide < 0) curSlide = maxSlide;
  console.log(this);
  slides.forEach(
    (slide, i) =>
      (slide.style.transform = `translateX(${(i - curSlide) * 100}%)`)
  );
  activateDot();
};
const init = function () {
  createDots();
  slideMover();
};

sliderBtnRight.addEventListener('click', slideMover.bind('right'));
sliderBtnLeft.addEventListener('click', slideMover.bind('left'));

document.addEventListener('keydown', function (e) {
  console.log(e);
  e.key === 'ArrowRight' && slideMover.call('right');
  e.key === 'ArrowLeft' && slideMover.call('left');
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    curSlide = e.target.dataset.slide;
    slideMover();
  }
});

nav.addEventListener('click', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    e.preventDefault();
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

init();
