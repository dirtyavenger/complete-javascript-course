'use strict';

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    console.log(this);
    let output = 'What is your favourite programming language? \n';
    for (const string of this.options) {
      output += `${string}\n`;
    }
    const answer = Number(
      prompt(
        `What is your favourite programming language? \n${this.options.join(
          '\n'
        )}`
      )
    );
    console.log(answer);
    console.log(answer > -1 && answer < 4);
    if (answer > -1 && answer < 4) this.answers[answer]++;

    //console.log(this.answers);
    this.displayResults.call(poll);
    this.displayResults.call(poll, 'string');
  },
  displayResults(type = 'array') {
    if (type == 'array') {
      console.log(this.answers);
    } else {
      console.log(`Poll resulst are ${this.answers.join(', ')}`);
    }
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));
poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });
