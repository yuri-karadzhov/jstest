(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = function(stdlib, env, heap) {
  'use asm';

  function nextPow2(n) {
    n = n|0;
    n = (n - 1)|0;
    n = (n >> 1 | n)|0;
    n = (n >> 2 | n)|0;
    n = (n >> 4 | n)|0;
    n = (n >> 8 | n)|0;
    n = (n >> 16 | n)|0;
    return (n + 1)|0;
  }

  return nextPow2;
};

},{}],2:[function(require,module,exports){
'use strict';

var data = new DataView(new ArrayBuffer(8));

module.exports = function(n) {
  data.setFloat32(0, n);
  var t = 1 << ((data.getUint32(0) >> 23) - 0x7f);
  return t << (t < n);
};

},{}],3:[function(require,module,exports){
'use strict';

module.exports = function(n) {
  return 1 << (32 - Math.clz32(n));
};

},{}],4:[function(require,module,exports){
'use strict';

module.exports = function(n) {
  return Math.pow(2, Math.ceil(Math.log2(n)));
};

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
'use strict';

function nextPow2(n) {
  var left = 0;
  var right = nextPow2.powers.length - 1;
  while(left < right) {
    var center = ~~((left + right) / 2);
    var pow = nextPow2.powers[center];
    var prev = nextPow2.powers[center - 1] || pow;
    if(center === 0) return nextPow2.powers[left];
    else if(center === left) return nextPow2.powers[right];
    else if(n > prev && n <= pow) return pow;
    else if(n > pow) left = center;
    else if(n <= prev) right = center;
  }
  return pow;
};

nextPow2.powers = [];

function initPowers() {
  var pow = 1;
  for(var i = 0; i < 30; i++) {
    pow <<= 1;
    nextPow2.powers.push(pow);
  }
  nextPow2.powers[i] = pow * 2;
}

initPowers();

module.exports = nextPow2;

},{}],7:[function(require,module,exports){
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

},{"./asm_shift":1,"./cast":2,"./clz32":3,"./log":4,"./shift":5,"./table":6,"./while":8}],8:[function(require,module,exports){
'use strict';

module.exports = function(n) {
  var pow = 2;

  while(pow < n) {
    pow <<= 1;
  }

  return pow;
};

},{}]},{},[7]);
