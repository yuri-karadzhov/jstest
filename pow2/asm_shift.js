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
