'use strict';
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

const textAreaEl = document.getElementsByTagName('textarea');
const ButtonEl = document.getElementsByTagName('button');
console.log(textAreaEl);

//my shitty implementation
/* ButtonEl[0].addEventListener('click', () => {
    const strings = textAreaEl[0].value.split('\n');
    const fillerChar = '✅';
    let fillerString = '';
    //  console.log(strings);

    for (let string of strings) {
      string = string.trim().toLowerCase();
      fillerString += fillerChar;
      // console.log(string);
      let words = string.split('_');
      let outputString = '';
      // console.log(words);
      for (const word of words) {
        outputString +=
          word === words[0] ? word : word.replace(word[0], word[0].toUpperCase());
        // console.log(word);
      }
      console.log(outputString.padEnd(20, ' ') + fillerString);
    }
  });
  */

//propper impolementation
ButtonEl[0].addEventListener('click', () => {
  const rows = textAreaEl[0].value.split('\n');
  for (const [i, row] of rows.entries()) {
    const [first, second] = row.trim().toLowerCase().split('_');
    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    console.log(output.padEnd(20) + String('✅').repeat(i + 1));
  }
});
