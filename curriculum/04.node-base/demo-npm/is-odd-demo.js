// npm i is-odd-num
// npm uninstall is-odd-num

const isOdd = require('is-odd-num');

console.log(isOdd('1')); //=> true
console.log(isOdd('3')); //=> true

console.log(isOdd(0)); //=> false
console.log(isOdd(2)); //=> false