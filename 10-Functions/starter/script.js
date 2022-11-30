'use strict';

const greet = greeting => name => console.log(`${greeting} ${name}`);

greet('Nazdar')('Marek');

const addTax = priceWithoutVat => vat =>
  console.log(priceWithoutVat + priceWithoutVat * vat);

addTax(2000)(0.1);

const addTax2 = addTax(1000);
addTax2(0.5);
