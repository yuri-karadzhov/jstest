var logNextPow2 = require('./log');
var castNextPow2 = require('./cast');
var shiftNextPow2 = require('./shift');
var whileNextPow2 = require('./while');
var tableNextPow2 = require('./table');
var clz32NextPow2 = require('./clz32');

var asmShiftNextPow2 = require('./asm_shift')();

var repeat = Math.pow(2, 24);//Math.pow(2, 25); // Up to 2^30

var i;

//console.time('log');
//for (i = 0; i < repeat; i++) {
//  logNextPow2(i);
//}
//console.timeEnd('log');
//
//console.time('cast');
//for (i = 0; i < repeat; i++) {
//  castNextPow2(i);
//}
//console.timeEnd('cast');

console.time('shift');
for (i = 0; i < repeat; i++) {
  shiftNextPow2(i);
}
console.timeEnd('shift');

//console.time('while');
//for (i = 0; i < repeat; i++) {
//  whileNextPow2(i);
//}
//console.timeEnd('while');
//
//console.time('table');
//for (i = 0; i < repeat; i++) {
//  tableNextPow2(i);
//}
//console.timeEnd('table');

console.time('asm_shift');
for (i = 0; i < repeat; i++) {
  asmShiftNextPow2(i);
}
console.timeEnd('asm_shift');

console.time('clz32');
for (i = 0; i < repeat; i++) {
  clz32NextPow2(i);
}
console.timeEnd('clz32');
