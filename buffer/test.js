'use strict';

var now = typeof(window) !== 'undefined' ? window.performance.now.bind(window.performance) : require('performance-now');

var tiny = 10;
var small = 100;
var big = 1000;
var large = 10000;
var asm = 65536;
var huge = 100000;
var enormous = 1000000;

var i, time;
var repeat = 10000;

// Create buffers
console.log('Create:');

var keepTiny = new Array(repeat);
time = now();
for(i = 0; i < repeat; i++) {
  keepTiny[i] = new ArrayBuffer(tiny);
}
console.log('tiny', (now() - time) / repeat);

var keepSmall = new Array(repeat);
time = now();
for(i = 0; i < repeat; i++) {
  keepSmall[i] = new ArrayBuffer(small);
}
console.log('small', (now() - time) / repeat);

var keepBig = new Array(repeat);
time = now();
for(i = 0; i < repeat; i++) {
  keepBig[i] = new ArrayBuffer(big);
}
console.log('big', (now() - time) / repeat);

var keepLarge = new Array(repeat);
time = now();
for(i = 0; i < repeat; i++) {
  keepLarge[i] = new ArrayBuffer(large);
}
console.log('large', (now() - time) / repeat);

var keepAsm = new Array(repeat);
time = now();
for(i = 0; i < repeat; i++) {
  keepAsm[i] = new ArrayBuffer(asm);
}
console.log('asm', (now() - time) / repeat);

var keepHuge = new Array(repeat);
time = now();
for(i = 0; i < repeat; i++) {
  keepHuge[i] = new ArrayBuffer(huge);
}
console.log('huge', (now() - time) / repeat);

var keepEnormous = new Array(repeat);
time = now();
for(i = 0; i < repeat / 10; i++) {
  keepEnormous[i] = new ArrayBuffer(enormous);
}
console.log('enormous', (now() - time) / repeat * 10);

// Transfer buffers
if(ArrayBuffer.transfer) console.log('hello from ff');

// Slice buffers

// Array within

// Array from

// Array set

// Array slice

// Array subarray

// Array iterator

// Array for of

// Array for loop
