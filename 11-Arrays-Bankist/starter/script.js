'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
let currentAccount;
//Event Handler pre login button
btnLogin.addEventListener('click', e => {
  currentAccount = accounts.find(
    acc => acc.username == inputLoginUsername.value
  );
  console.log(currentAccount);
  e.preventDefault();
  if (Number(inputLoginPin.value) === currentAccount?.pin) {
    console.log('Login successful');
    containerApp.style.opacity = 100;
    displayMovements(currentAccount);
    displaySummaries(currentAccount);
    displayMainInfo(currentAccount);
  } else {
    console.log('Login failed');
  }
});

//Event Handler pre sort button
btnSort.addEventListener('click', e => {
  console.log('bezi');
  const sortedMovements = [...currentAccount.movements].sort(
    (first, second) => first - second
  );
  console.log(sortedMovements);
  displayMovements(sortedMovements);
});

//Funkcia na kalculaciu username
const createUsernames = function () {
  accounts.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });

  console.log(accounts);
};

// Funkcia na naplnenie zoznamu obratov
const displayMovements = function (acc) {
  let html = '';

  acc.movements.map(movement => {
    let typeOfMovement =
      typeof movement === 'number' && movement > 0 ? 'deposit' : 'withdrawal';
    html += `<div class="movements__row">
    <div class="movements__type movements__type--${typeOfMovement}">8 ${typeOfMovement}</div>
    <div>${}</div>
    <div class="movements__value">${movement}€</div>
  </div>`;
  });
  containerMovements.insertAdjacentHTML('afterbegin', html);
};

// Volanie funckie na vytvorenie usernames
createUsernames();
//Funkcia na naplnenie aktualneho datumu a krstneho mena klienta
const displayMainInfo = function (acc) {
  labelDate.textContent = new Date().toLocaleDateString('sk-SK');
  labelWelcome.textContent = `Welcome back ${acc.owner.split(' ')[0]}`;
};

// Funkcia na naplnenie sumarizacnych policok
const displaySummaries = function (acc) {
  labelBalance.textContent = acc.movements.reduce(
    (total, movement) => (total += movement),
    0
  );
  labelSumIn.textContent = acc.movements
    .filter(movement => movement > 0)
    .reduce((total, movement) => (total += movement), 0);
  labelSumOut.textContent = acc.movements
    .filter(movement => movement < 0)
    .reduce((total, movement) => (total -= movement), 0);
};

const allMovementsSum = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, number) => acc + number, 0);

console.log(allMovementsSum);

const allDepositsSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, number) => acc + number, 0);

console.log(allDepositsSum);
const allWithdrawalsSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov < 0)
  .reduce((acc, number) => acc + number, 0);

console.log(allWithdrawalsSum);

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov >= 1000)
  .reduce((acc, number) => ++acc, 0);

console.log(numDeposits1000);

const numDeposits1000_2 = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov >= 1000).length;

console.log(numDeposits1000_2);

const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (accumulator, mov) => {
      mov > 0
        ? (accumulator.deposits += mov)
        : (accumulator.withdrawals += mov);
      return accumulator;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(deposits, withdrawals);
