'use strict';

module.exports = function(stdlib, env, heap) {
  'use asm';

  var imul = stdlib.Math.imul;
  var array = new stdlib.Int32Array(heap);

  function dotProduct(length) {
    length = length | 0;
    var product = 0;
    var i = 0;
    var el1 = 0;
    var el2 = 0;

    for (; (i | 0) < (length | 0); i = (i + 1) | 0) {
      el1 = array[i << 2 >> 2] | 0;
      el2 = array[(length + i) << 2 >> 2] | 0;
      product = (product + imul(el1, el2)) | 0;
    }

    return product | 0;
  }

  return dotProduct;
};
