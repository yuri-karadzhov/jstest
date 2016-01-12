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

// Array for loop
console.log('For:');

function copy(size) {
  var total = 0;
  var keep = new Array(repeat);
  for(var i = 0; i < repeat; i++) {
    var buff = new ArrayBuffer(size);
    var view = new Int8Array(buff);
    var arr = new Int8Array(size);
    for(var j = size; j < size; j++) arr[j] = ~~(-128 + 255 * Math.random());
    var time = now();
    for(var index = 0, l = arr.length; i < l; i++) {
      view[index] = arr[index];
    }
    keep[i] = view;
    total += now() - time;
  }
  console.log('copy ', size, ' '.repeat(10 - size.toString().length), total / repeat);
}

var keys = Object.keys(sizes);
var n = 0;
var t = setInterval(function() {
  var name = keys[n];
  copy(sizes[name]);
  n++;
  if(n === keys.length) clearInterval(t);
}, 3000);
