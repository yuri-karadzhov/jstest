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

// Array within
console.log('Transfer:');

function copyLeft(size) {
  var total = 0;
  var size2 = size * 2;
  var keep = new Array(repeat);
  for(var i = 0; i < repeat; i++) {
    var buff = new ArrayBuffer(size2);
    var view = new Int8Array(buff);
    for(var j = size; j < size2; j++) view[j] = ~~(-128 + 255 * Math.random());
    var time = now();
    view.copyWithin(0, size);
    keep[i] = view;
    total += now() - time;
  }
  console.log('left ', size, ' '.repeat(10 - size.toString().length), total / repeat);
}

function copyRight(size) {
  var total = 0;
  var size2 = size * 2;
  var keep = new Array(repeat);
  for(var i = 0; i < repeat; i++) {
    var buff = new ArrayBuffer(size2);
    var view = new Int8Array(buff);
    for(var j = 0; j < size; j++) view[j] = ~~(-128 + 255 * Math.random());
    var time = now();
    view.copyWithin(size, 0);
    keep[i] = view;
    total += now() - time;
  }
  console.log('right', size, ' '.repeat(10 - size.toString().length), total / repeat);
}

var keys = Object.keys(sizes);
var n = 0;
var t = setInterval(function() {
  var name = keys[n];
  copyRight(sizes[name]);
  copyLeft(sizes[name]);
  n++;
  if(n === keys.length) clearInterval(t);
}, 3000);
