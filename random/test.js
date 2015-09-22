var random = require('./random');
var randomAsm = require('./asm_random');

var length = 16777216;
var minVal = -1000;
var maxVal = 1000;
var repeat = 1;

var i;

var buffer = new ArrayBuffer(length);
var array8 = new Int8Array(buffer);

var asmRandom = randomAsm({
  Int8Array: Int8Array
}, {
  length: length,
  random: Math.random,
  random2: function(min, max) {
    return min + ~~(Math.random() * (max - min + 1));
  }
}, buffer);

console.time('random');
for (i = 0; i < repeat; i++) {
  random(array8, length, minVal, maxVal);
}
console.timeEnd('random');

console.time('asm');
for (i = 0; i < repeat; i++) {
  asmRandom.fillRandom(minVal, maxVal);
}
console.timeEnd('asm');

console.time('asmDouble');
for (i = 0; i < repeat; i++) {
  asmRandom.fillRandomDouble(minVal, maxVal);
}
console.timeEnd('asmDouble');

console.time('asmForeign');
for (i = 0; i < repeat; i++) {
  asmRandom.fillRandomForeign(minVal, maxVal);
}
console.timeEnd('asmForeign');
