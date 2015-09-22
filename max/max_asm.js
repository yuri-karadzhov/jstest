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
