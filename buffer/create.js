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

// Create buffers
console.log('Create:');

function create(size) {
  var keep = new Array(repeat);
  var time = now();
  for(var i = 0; i < repeat; i++) {
    keep[i] = new ArrayBuffer(size);
  }
  console.log(size, ' '.repeat(10 - size.toString().length), (now() - time) / repeat);
}

var keys = Object.keys(sizes);
var n = 0;
var t = setInterval(function() {
  var name = keys[n];
  create(sizes[name]);
  n++;
  if(n === keys.length) clearInterval(t);
}, 3000);
