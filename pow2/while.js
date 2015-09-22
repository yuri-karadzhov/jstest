'use strict';

module.exports = function(n) {
  var pow = 2;

  while(pow < n) {
    pow <<= 1;
  }

  return pow;
};
