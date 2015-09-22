'use strict';

module.exports = function(n) {
  return 1 << (32 - Math.clz32(n));
};
