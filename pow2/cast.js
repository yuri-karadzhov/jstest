'use strict';

var data = new DataView(new ArrayBuffer(8));

module.exports = function(n) {
  data.setFloat32(0, n);
  var t = 1 << ((data.getUint32(0) >> 23) - 0x7f);
  return t << (t < n);
};
