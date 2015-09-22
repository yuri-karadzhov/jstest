(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = function(arr1, arr2) {
  var product = 0;

  for (var i = 0, l = arr1.length; i < l; i++) {
    product += arr1[i] * arr2[i];
  }

  return product;
};

},{}],2:[function(require,module,exports){
'use strict';

module.exports = function(stdlib, env, heap) {
  'use asm';

  var imul = stdlib.Math.imul;
  var array = new stdlib.Int32Array(heap);

  function dotProduct(length) {
    length = length | 0;
    var product = 0;
    var i = 0;
    var el1 = 0;
    var el2 = 0;

    for (; (i | 0) < (length | 0); i = (i + 1) | 0) {
      el1 = array[i << 2 >> 2] | 0;
      el2 = array[(length + i) << 2 >> 2] | 0;
      product = (product + imul(el1, el2)) | 0;
    }

    return product | 0;
  }

  return dotProduct;
};

},{}],3:[function(require,module,exports){
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

},{"../pow2/shift":4,"./dot":1,"./dot_asm":2}],4:[function(require,module,exports){
'use strict';

module.exports = function(n) {
  n--;
  n |= n >> 1;
  n |= n >> 2;
  n |= n >> 4;
  n |= n >> 8;
  n |= n >> 16;
  return n + 1;
};

},{}]},{},[3]);
