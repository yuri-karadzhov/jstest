'use strict';

module.exports = function(arr1, arr2) {
  var product = 0;

  for (var i = 0, l = arr1.length; i < l; i++) {
    product += arr1[i] * arr2[i];
  }

  return product;
};
