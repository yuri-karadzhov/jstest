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
