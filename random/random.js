'use strict';

module.exports = function(array, length, min, max) {
  for(var i = 0; i < length; i++) {
    array[i] = min + Math.random() * (max - min + 1);
  }
};
