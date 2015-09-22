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
      array[i >> 0] = ~~(min + (max - min + 1.0) * random());
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
