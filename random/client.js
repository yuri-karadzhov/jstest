(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = function(stdlib, foreign, heap) {
  'use asm';

  var random = foreign.random;
  var random2 = foreign.random2;
  var length = foreign.length|0;

  var array = new stdlib.Int8Array(heap);


  function fillRandom(min, max) {
    min = min|0;
    max = max|0;

    var i = 0, range = 0, rand = 0.0;

    for(i = 0; (i|0) < (length|0); i = (i + 1)|0) {
      range = (max - min + 1)|0;
      rand = +(range >> 0) * (+random());
      array[i >> 0] = (min + (~~rand))|0;
    }

    return;
  }

  function fillRandomDouble(min, max) {
    min = +min;
    max = +max;

    var i = 0;

    for(i = 0; (i|0) < (length|0); i = (i + 1)|0) {
      array[i >> 0] = ~~(min + (max - min + 1.0) * (+random()));
    }

    return;
  }

  function fillRandomForeign(min, max) {
    min = min|0;
    max = max|0;

    var i = 0;

    for(i = 0; (i|0) < (length|0); i = (i + 1)|0) {
      array[i >> 0] = random2(min|0, max|0)|0;
    }

    return;
  }

  return {
    fillRandom: fillRandom,
    fillRandomDouble: fillRandomDouble,
    fillRandomForeign: fillRandomForeign
  };
};

},{}],2:[function(require,module,exports){
'use strict';

module.exports = function(array, length, min, max) {
  for(var i = 0; i < length; i++) {
    array[i] = min + Math.random() * (max - min + 1);
  }
};

},{}],3:[function(require,module,exports){
var random = require('./random');
var randomAsm = require('./asm_random');

var length = 16777216;
var minVal = -1000;
var maxVal = 1000;
var repeat = 1;

var i;

var buffer = new ArrayBuffer(length);
var array8 = new Int8Array(buffer);

var asmRandom = randomAsm({
  Int8Array: Int8Array
}, {
  length: length,
  random: Math.random,
  random2: function(min, max) {
    return min + ~~(Math.random() * (max - min + 1));
  }
}, buffer);

console.time('random');
for (i = 0; i < repeat; i++) {
  random(array8, length, minVal, maxVal);
}
console.timeEnd('random');

console.time('asm');
for (i = 0; i < repeat; i++) {
  asmRandom.fillRandom(minVal, maxVal);
}
console.timeEnd('asm');

console.time('asmDouble');
for (i = 0; i < repeat; i++) {
  asmRandom.fillRandomDouble(minVal, maxVal);
}
console.timeEnd('asmDouble');

console.time('asmForeign');
for (i = 0; i < repeat; i++) {
  asmRandom.fillRandomForeign(minVal, maxVal);
}
console.timeEnd('asmForeign');

},{"./asm_random":1,"./random":2}]},{},[3]);
