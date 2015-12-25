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

// Transfer buffers
if(!ArrayBuffer.transfer) {
  throw 'transfer is unsupported';
}
console.log('Transfer:');

function testTransferExtend(size) {
  var total = 0;
  var size2 = size * 2;
  var keep = new Array(repeat);
  for(var i = 0; i < repeat; i++) {
    var buff = new ArrayBuffer(size);
    var view = new Int8Array(buff);
    for(var j = 0; j < size; j++) view[j] = ~~(-128 + 255 * Math.random());
    var time = now();
    keep[i] = ArrayBuffer.transfer(buff, size2);
    total += now() - time;
  }
  console.log('extend', size, ' '.repeat(10 - size.toString().length), total / repeat);
}

function testTransferCopy(size) {
  var total = 0;
  var keep = new Array(repeat);
  for(var i = 0; i < repeat; i++) {
    var buff = new ArrayBuffer(size);
    var view = new Int8Array(buff);
    for(var j = 0; j < size; j++) view[j] = ~~(-128 + 255 * Math.random());
    var time = now();
    keep[i] = ArrayBuffer.transfer(buff, size);
    total += now() - time;
  }
  console.log('copy  ', size, ' '.repeat(10 - size.toString().length), total / repeat);
}

function testTransferShrink(size) {
  var total = 0;
  var size2 = size / 2;
  var keep = new Array(repeat);
  for(var i = 0; i < repeat; i++) {
    var buff = new ArrayBuffer(size);
    var view = new Int8Array(buff);
    for(var j = 0; j < size; j++) view[j] = ~~(-128 + 255 * Math.random());
    var time = now();
    keep[i] = ArrayBuffer.transfer(buff, size);
    total += now() - time;
  }
  console.log('shrink', size, ' '.repeat(10 - size.toString().length), total / repeat);
}

var keys = Object.keys(sizes);
var n = 0;
var t = setInterval(function() {
  var name = keys[n];
  testTransferExtend(sizes[name]);
  testTransferCopy(sizes[name]);
  testTransferShrink(sizes[name]);
  n++;
  if(n === keys.length) clearInterval(t);
}, 3000);
