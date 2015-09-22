(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = function(stdlib, foreign, heap) {
  'use asm';

  var length = foreign.length|0;

  var array = new stdlib.Int8Array(heap);


  function range(start, end, step) {
    start = start|0;
    end = end|0;
    step = step|0;

    var i = 0, el = 0;

    el = start;

    for(i = 0; (i|0) < (length|0); i = (i + 1)|0) {
      array[i >> 0] = el;
      el = (el + step)|0;
    }

    return;
  }

  return range;
};

},{}],2:[function(require,module,exports){
'use strict';

module.exports = function(array, start, end, step) {
  for(var i = 0, el = start; el < end; i++, el += step) {
    array[i] = el;
  }
};

},{}],3:[function(require,module,exports){
var range = require('./range');
var rangeAsm = require('./asm_range');

var length = 16777216;
var start = -1000;
var end = 1000;
var step = 1;
var repeat = 1;

var i;

var buffer = new ArrayBuffer(length);
var array8 = new Int8Array(buffer);

var asmRange = rangeAsm({
  Int8Array: Int8Array
}, {
  length: length
}, buffer);

console.time('range');
for (i = 0; i < repeat; i++) {
  range(array8, start, end, step);
}
console.timeEnd('range');

console.time('asm');
for (i = 0; i < repeat; i++) {
  asmRange(start, end, step);
}
console.timeEnd('asm');

},{"./asm_range":1,"./range":2}]},{},[3]);
