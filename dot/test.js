var dot = require('./dot');
var dotAsm = require('./dot_asm');

var nextPow2 = require('../pow2/shift');

var length = 2;
var minVal = -Math.pow(2, 10);
var maxVal = -minVal;
var repeat = 1;

var i;
var time;

//var buffer = new ArrayBuffer(32 * nextPow2(length * 2)); //Number of bytes
var array32 = new Int32Array(Math.max(nextPow2(length * 2), 0x10000));

for (i = 0; i < length; i++) {
  array32[i] = ~~(Math.random() * (maxVal - minVal) + minVal);
  array32[length + i] = ~~(Math.random() * (maxVal - minVal) + minVal);
}

var array1 = array32.slice(0, length);
var array2 = array32.slice(length, 2 * length);

var asmDot = dotAsm({
  Math: Math,
  Int32Array: Int32Array
}, {
  length: length
}, array32.buffer);

time = Date.now();
console.time('dot');
for (i = 0; i < repeat; i++) {
  console.log(dot(array1, array2));
}
console.timeEnd('dot');

time = Date.now();
console.time('asm');
for (i = 0; i < repeat; i++) {
  console.log(asmDot(length));
}
console.timeEnd('asm');
