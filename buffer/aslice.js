'use strict';

var now = typeof(window) !== 'undefined' ? window.performance.now.bind(window.performance) : require('performance-now');

var sizes = {
  tiny: 10,
  small: 100,
  big: 1000,
  large: 10000,
  asm: 65536,
  huge: 100000,
  enormous: 1000000,
};

var repeat = 100;

// Array slice
console.log('Slice:');

function copy(size) {
  var buff = new ArrayBuffer(size);
  var view = new Int8Array(buff);
  for(var j = 0; j < size; j++) view[j] = ~~(-128 + 255 * Math.random());
  var keep = new Array(repeat);
  var time = now();
  for(var i = 0; i < repeat; i++) {
    keep[i] = view.slice(0);
  }
  console.log('copy ', size, ' '.repeat(10 - size.toString().length), (now() - time) / repeat);
}

function shrinkLeft(size) {
  var buff = new ArrayBuffer(size);
  var view = new Int8Array(buff);
  var size2 = size / 2;
  for(var j = 0; j < size; j++) view[j] = ~~(-128 + 255 * Math.random());
  var keep = new Array(repeat);
  var time = now();
  for(var i = 0; i < repeat; i++) {
    keep[i] = view.slice(0, size2);
  }
  console.log('left ', size, ' '.repeat(10 - size.toString().length), (now() - time) / repeat);
}

function shrinkRight(size) {
  var buff = new ArrayBuffer(size);
  var view = new Int8Array(buff);
  var size2 = size / 2;
  for(var j = 0; j < size; j++) view[j] = ~~(-128 + 255 * Math.random());
  var keep = new Array(repeat);
  var time = now();
  for(var i = 0; i < repeat; i++) {
    keep[i] = view.slice(size2);
  }
  console.log('right', size, ' '.repeat(10 - size.toString().length), (now() - time) / repeat);
}

var keys = Object.keys(sizes);
var n = 0;
var t = setInterval(function() {
  var name = keys[n];
  copy(sizes[name]);
  shrinkLeft(sizes[name]);
  shrinkRight(sizes[name]);
  n++;
  if(n === keys.length) clearInterval(t);
}, 3000);
