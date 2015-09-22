var max = require('./max');
// var maxMath = require('./max_math');
var maxAsm = require('./max_asm');

var length = 100000000;
var minVal = -10 * length;
var maxVal = 10 * length;
var repeat = 1;

var i;
var time;

var buffer = new ArrayBuffer(8 * 1024 * 1024 * 100);
var array32 = new Int32Array(buffer);

for (i = 0; i < length; i++) {
  array32[i] = ~~(Math.random() * (maxVal - minVal) + minVal);
}

var asmMax = maxAsm({
  Int32Array: Int32Array
}, {
  length: length
}, buffer);

document.write('max');
time = Date.now();
console.time('max');
for (i = 0; i < repeat; i++) {
  console.log(max(array32));
}
console.timeEnd('max');
document.write(time - Date.now());

document.write('<br/>');

document.write('asm');
time = Date.now();
console.time('asm');
for (i = 0; i < repeat; i++) {
  console.log(asmMax(length));
}
console.timeEnd('asm');
document.write(time - Date.now());
