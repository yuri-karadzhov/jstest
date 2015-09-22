var range = require('./range');
var rangeAsm = require('./asm_range');

var length = 16777216;
var start = -1000;
var end = 1000;
var step = 1;
var repeat = 1;

var i;

var buffer = new ArrayBuffer(length);
var array8 = new Int8Array(buffer);

var asmRange = rangeAsm({
  Int8Array: Int8Array
}, {
  length: length
}, buffer);

console.time('range');
for (i = 0; i < repeat; i++) {
  range(array8, start, end, step);
}
console.timeEnd('range');

console.time('asm');
for (i = 0; i < repeat; i++) {
  asmRange(start, end, step);
}
console.timeEnd('asm');
