(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = function(array) {
  var maximum = array[0];

  for (var i = 1, l = array.length; i < l; i++) {
    var el = array[i];
    if (maximum < el) {
      maximum = el;
    }
  }

  return maximum;
};

},{}],2:[function(require,module,exports){
'use strict';

module.exports = function(stdlib, env, heap) {
  'use asm';

  var array = new stdlib.Int32Array(heap);

  function maxAsm(length) {
    length = length | 0;
    var maximum = 0;
    var i = 1;
    var el = 0;

    i = i | 0;
    el = el | 0;

    maximum = array[0] | 0;

    for (; (i | 0) < (length | 0); i = (i + 1) | 0) {
      el = array[i << 2 >> 2] | 0;
      if ((maximum | 0) < (el | 0)) {
        maximum = el;
      }
    }

    return maximum | 0;
  }

  return maxAsm;
};

},{}],3:[function(require,module,exports){
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

},{"./max":1,"./max_asm":2}]},{},[3]);
