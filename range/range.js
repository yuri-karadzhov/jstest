'use strict';

module.exports = function(array, start, end, step) {
  for(var i = 0, el = start; el < end; i++, el += step) {
    array[i] = el;
  }
};
