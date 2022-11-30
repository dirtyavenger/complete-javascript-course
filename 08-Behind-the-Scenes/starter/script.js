'use strict';
let jeba = 'jeba z globalneho kontextu';
const kokot = {
  jeba: 'predsa',
  kokot: function kokot() {
    console.log(`Ide to ${this.jeba}`);
    let jeba = 'jeba z kontextu funkcie';
    let self = this;
    function kokot2() {
      console.log(`Ide to ${self.jeba}`);
    }
    kokot2();

    const kokot3 = () => {
      console.log(`Ide to ${this.jeba}`);
    };
    kokot3();
  },
};

kokot.kokot();

const kokot4 = function (a, b) {
  console.log(arguments);
};
kokot4(2, 'dsd', 'sdsdsd');
