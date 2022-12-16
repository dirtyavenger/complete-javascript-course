'use strict';

const Car = function (speed, make) {
  this.speed = speed;
  this.brand = make;
};

Car.prototype = {
  accelerate: function () {
    this.speed += 10;
    console.log(`${this.brand} is driving at ${this.speed} km/h`);
  },
  brake: function () {
    this.speed -= 20;
    console.log(`${this.brand} decelerated to  ${this.speed} km/h`);
  },
};

const BMW = new Car(120, 'BMW');
const Mercedes = new Car(95, 'Mercedes');

BMW.accelerate();
BMW.accelerate();
BMW.brake();
BMW.brake();
Mercedes.accelerate();
Mercedes.brake();
const compareSpeed = function () {
  console.log(`${BMW.speed > Mercedes.speed ? 'BMW' : 'Mercedes'}`);
};
compareSpeed();
console.log(BMW);
console.log(Car.prototype.isPrototypeOf(BMW));
console.log(Object.prototype.isPrototypeOf(BMW));
console.dir(BMW.__proto__);

const Ev = function (speed, make, bateryCharge) {
  this.bateryCharge = bateryCharge;
  Car.call(this, speed, make);
};
Ev.prototype = Object.create(Car.prototype);
Object.assign(Ev.prototype, {
  chargeBattery: function (chargeTo) {
    if (this.bateryCharge < chargeTo) {
      this.bateryCharge = chargeTo <= 100 ? chargeTo : 100;
    }
  },
  accelerate: function () {
    this.speed += 10;
    this.bateryCharge -= 1;
    console.log(
      `${this.brand} is driving at ${this.speed} km/h and the batery is at ${this.bateryCharge}`
    );
  },
});

const Tesla = new Ev(120, 'Tesla', 50);
console.dir(Tesla.__proto__);
console.log(Ev.prototype.isPrototypeOf(Tesla));
console.log(Car.prototype.isPrototypeOf(Tesla));
console.log(Object.prototype.isPrototypeOf(Tesla));
/* class CarCL {
  constructor(make, speed) {
    (this.make = make), (this._speed = speed);
  }

  accelerate() {
    this._speed += 10;
    console.log(`${this.make} is going at ${this._speed}`);
  }
  brake() {
    this._speed -= 5;
    console.log(`${this.make} is going at ${this._speed}`);
  }
  get speedUS() {
    return this._speed / 1.6;
  }
  set speedUS(speedInMiles) {
    this._speed = speedInMiles * 1.6;
    return;
  }
}

const bmw = new CarCL('BMW', 120);
bmw.accelerate();
bmw.accelerate();
bmw.accelerate();
bmw.accelerate();
console.log(bmw.speedUS);
bmw.speedUS = 50;
bmw.brake();
 */
