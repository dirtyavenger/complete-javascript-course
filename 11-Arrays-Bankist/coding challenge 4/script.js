'use strict';

// Data
const dogs = [
  { weight: 22, curFood: 284, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];
// 1.
dogs.forEach(
  dog => (dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28))
);
console.log(dogs);

// 2.
const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(sarahDog);
console.log(
  `Sarah's dog eats ${
    sarahDog.curFood > sarahDog.recommendedFood ? 'too much.' : 'too litle'
  }`
);

//3.
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recommendedFood)
  .flatMap(dog => dog.owners);

console.log(ownersEatTooMuch);
const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recommendedFood)
  .flatMap(dog => dog.owners);

console.log(ownersEatTooLittle);

console.log(`${ownersEatTooMuch.join(' and ')}'s eat too much.`);
console.log(`${ownersEatTooLittle.join(' and ')}'s eat too little.`);

const checkEatOk = dog =>
  dog.curFood < dog.recommendedFood * 1.1 &&
  dog.curFood > dog.recommendedFood * 0.9;
console.log(dogs.some(checkEatOk));
console.log(dogs.filter(checkEatOk));

const dogsCopy = dogs.slice();
//dogsCopy[0].owners = [];
console.log(dogsCopy.sort((a, b) => a.recommendedFood - b.recommendedFood));
console.log(dogs);
