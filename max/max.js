'use strict';

module.exports = function(array) {
  var maximum = array[0];

  for (var i = 1, l = array.length; i < l; i++) {
    var el = array[i];
    if (maximum < el) {
      maximum = el;
    }
  }

  return maximum;
};
