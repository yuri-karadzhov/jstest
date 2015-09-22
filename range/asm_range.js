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
