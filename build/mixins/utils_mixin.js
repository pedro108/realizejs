'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

// TODO: refatorar para módulo
exports.default = {
  // source: https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_.28random.29
  generateUUID: function generateUUID() {
    var d = new Date().getTime();

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
    });
  }
};